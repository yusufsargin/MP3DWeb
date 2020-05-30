import React, { useState, useEffect, useCallback, useMemo } from "react";
import LeftSideMenu from "./SarginApi/UI/LeftSideMenu";
import { Canvas } from "react-three-fiber";
import Scene from "./SarginApi/Scene/Scene";
import TestData from "./SarginApi/TextData/test.json";
import DataParser from "./SarginApi/DataParser/DataParser";
import FindMinPoints from "./SarginApi/Utils/FindMinPoints";
import FindMaxPoints from "./SarginApi/Utils/FindMaxPoints";
import { IMeshsInTheScene } from "./declation";
import "./DrawEngine.css";

export default function Sargin3dDrawEngine(props: any) {
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

  const updateSelectedItems = useCallback((updatedData: IMeshsInTheScene[][]) => {
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
  }, []);

  const setMeshTextureOnClick = (imgItem: any, id: string) => {
    if (imgItem && id !== "") {
      let meshItem = meshInTheScene;

      if (meshItem) {
        meshItem = meshItem.map((el: IMeshsInTheScene[]) => {
          return el.map((mesh: IMeshsInTheScene) => {
            if (mesh.modulAdi === id) {
              mesh.materialTexture = imgItem;
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
              return el;
            }
          }

          el.isSelected = false;
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
    </div>
  );
}
