import React, {useCallback, useMemo, useState} from "react";
import LeftSideMenu from "./SarginApi/UI/LeftSideMenu";
import {Canvas} from "react-three-fiber";
import {Scene} from "./SarginApi/Scene/Scene";
import * as Three from "three";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import TestData from "./SarginApi/TextData/test.json";
import DataParser from "./SarginApi/DataParser/DataParser";
import FindMinPoints from "./SarginApi/Utils/FindMinPoints";
import FindMaxPoints from "./SarginApi/Utils/FindMaxPoints";
import {IMeshsInTheScene} from "./declation";
import "./DrawEngine.css";
import {Button} from "semantic-ui-react";
import DetailModulPanelController from "./SarginApi/UI/DetailModulPanel/DetailModulPanelController";

export default function Sargin3dDrawEngine(props: any) {
    const [scene, setScene] = useState<Three.Scene>();
    const [cizim] = useState<any>(DataParser(props.cizim || TestData));
    const [selectedItems, setSelectedItems] = useState<Array<IMeshsInTheScene>>();
    const [meshInTheScene, setMeshInTheScene] = useState<Array<Array<IMeshsInTheScene>>>();

    const updateMeshItems = useCallback(
        (value: Array<IMeshsInTheScene>) => {
            setMeshInTheScene((state) => {
                let lastState = state || [];

                lastState.push(value);

                return lastState;
            });
        },
        [meshInTheScene]
    );

    const updateSelectedItems = useCallback(
        (updatedData: IMeshsInTheScene[][]) => {
            if (updatedData) {
                let lastData: IMeshsInTheScene[] = [];

                updatedData.map((el: Array<IMeshsInTheScene>) => {
                    el.map((item) => {
                        if (item.isSelected) {
                            lastData.push(item);
                        }
                    });
                });

                setSelectedItems(lastData);
            }
        },
        [setSelectedItems]
    );

    function save(blob: any, filename: string) {
        var link = document.createElement("a");
        link.style.display = "none";

        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        // URL.revokeObjectURL( url ); breaks Firefox...
    }

    function saveString(text: any, filename: string) {
        save(new Blob([text], {type: "text/plain"}), filename);
    }

    function gltfExportScene() {
        const exporter = new GLTFExporter();
        if (scene && scene.children.length > 2) {
            const meshes: any = scene.children.filter((item) => item.type === "Group");

            exporter.parse(
                meshes,
                function (gltf) {
                    if (gltf instanceof ArrayBuffer) {
                        saveArrayBuffer(gltf, "scene.glb");
                    } else {
                        const output = JSON.stringify(gltf, null, 2);

                        saveString(output, "scene.gltf");
                    }
                },
                {}
            );
        }
    }

    function saveArrayBuffer(buffer: any, filename: string) {
        save(new Blob([buffer], {type: "application/octet-stream"}), filename);
    }

    const setMeshTextureOnClick = (imgItem: any, id: string) => {
        if (imgItem && id !== "") {
            let meshItem = meshInTheScene;

            if (meshItem) {
                meshItem = meshItem.map((el: IMeshsInTheScene[]) => {
                    return el.map((mesh: IMeshsInTheScene) => {
                        if (mesh.modulAdi === id) {
                            mesh.materialTexture = imgItem;
                            mesh.shouldUpdate = true;
                        } else {
                            mesh.shouldUpdate = false;
                        }

                        return mesh;
                    });
                });

                setMeshInTheScene(meshItem);
            }
        }
    };

    const handleGroupPointerDownToMeshes = (e: PointerEvent | any, duvarNo?: number) => {
        e.stopPropagation();
        const groupName = e.eventObject.name || "";
        if (meshInTheScene) {
            const updatedData: Array<Array<IMeshsInTheScene>> | any = meshInTheScene.map((item) => {
                return item.map((el: IMeshsInTheScene) => {
                    if (el.duvarNo === (duvarNo || 0)) {
                        if (el.modulAdi === groupName) {
                            el.isSelected = true;
                            el.shouldUpdate = true;
                            return el;
                        }
                    }

                    el.isSelected = false;
                    el.shouldUpdate = false;
                    return el;
                });
            });

            const item = updatedData.filter((item: IMeshsInTheScene[]) => {
                return item[0].isSelected;
            })[0];

            const minPoints = FindMinPoints({
                mesh: item,
            });
            const maxPoints = FindMaxPoints({
                mesh: item,
            });

            updateSelectedItems(updatedData);
        }
    };

    const updateSelectedItemProperties = useCallback(
        (updateType: string, value: any) => {
            if (updateType.indexOf("updateTexture") !== -1) {
                if (selectedItems && meshInTheScene) {
                    setSelectedItems((item: IMeshsInTheScene[] | any) => {
                        return item.map((el: IMeshsInTheScene) => {
                            return (el.materialTexture = value);
                        });
                    });

                    setMeshInTheScene((item: IMeshsInTheScene[][] | any) => {
                        return item.map((el: IMeshsInTheScene[]) => {
                            return el.map((data: IMeshsInTheScene) => {
                                if (data.isSelected) {
                                    data.materialTexture = value;
                                }

                                return data;
                            });
                        });
                    });
                }
            }
        },
        [selectedItems]
    );

    const LeftSideMenuWithMemo = useMemo(() => {
        return (
            selectedItems && (
                <LeftSideMenu
                    setMeshTextureOnClick={setMeshTextureOnClick}
                    updateSelectedItemProperties={updateSelectedItemProperties}
                    selectedItem={selectedItems}
                />
            )
        );
    }, [selectedItems]);

    const SceneWithMemo = useMemo(() => {
        return (
            <Scene
                updateMeshItems={updateMeshItems}
                meshInTheScene={meshInTheScene}
                handleMeshSelect={handleGroupPointerDownToMeshes}
                cizim={cizim}
                scene={scene}
                setScene={setScene}
            />
        );
    }, [meshInTheScene]);

    return (
        <div className='App'>
            <div className='scene'>
                <Canvas
                    style={{
                        margin: "auto",
                        width: "95%",
                        height: window.innerHeight / 1.2,
                    }}>
                    {cizim && SceneWithMemo}
                </Canvas>
                {selectedItems && LeftSideMenuWithMemo}
            </div>
            <div className='glfexporter'>
                <Button size='huge' color='orange' onClick={() => gltfExportScene()}>
                    Glf Exporter
                </Button>
            </div>
            <DetailModulPanelController/>
        </div>
    );
}
