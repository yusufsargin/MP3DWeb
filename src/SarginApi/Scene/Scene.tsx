import React, { useState, useEffect, Suspense, useRef, useCallback, memo } from "react";
import { OrbitControls, Sky } from "drei";
import * as Three from "three";
import CreateCube from "../CreateObjects/CreateCube";
import Floor1T from "../Materials/Texture/TextureImages/floor_1_T.jpg";
import Floor1R from "../Materials/Texture/TextureImages/floor_1_R.jpg";
import SerializeData from "../DataParser/SerializeData";
import { IDefaultLights, IOrbitControl, IMeshsInTheScene } from "../../declation";
import { useThree } from "react-three-fiber";
import { ControlMemoItems } from "./ControlMemoItems";

export const Scene = (props: any) => {
  const [serialDataFirstWall, setSerialDataFirstWall] = useState<Array<Array<IMeshsInTheScene>>>();
  const [serialDataSecondWall, setSerialDataSecondWall] = useState<Array<Array<IMeshsInTheScene>>>();
  const { cizim, updateMeshItems, meshInTheScene, handleMeshSelect, setScene } = props;
  const groupItem = useRef<any>(null);
  const { scene } = useThree();

  function getUpdatedData(meshes: IMeshsInTheScene[][]) {
    var lastData: any = [];

    meshes.map((el: IMeshsInTheScene[]) => {
      el.map((item: IMeshsInTheScene) => {
        if (item.shouldUpdate) {
          lastData.push(item);
        }
      });
    });

    return lastData;
  }
  let updateItem = meshInTheScene && getUpdatedData(meshInTheScene);

  const Control = (props: IOrbitControl) => {
    return (
      <>
        <OrbitControls {...props} />
      </>
    );
  };

  const SceneDefaultLights = (props: IDefaultLights) => {
    return (
      <>
        <ambientLight {...props} />
        <Sky />
      </>
    );
  };

  useEffect(() => {
    if (serialDataFirstWall && serialDataSecondWall) {
      serialDataFirstWall.map((item) => {
        updateMeshItems(item);
        return;
      });
      serialDataSecondWall.map((item) => {
        updateMeshItems(item);
      });
    }
  }, [serialDataSecondWall, serialDataFirstWall]);

  useEffect(() => {
    if (cizim) {
      //0. duvar items
      Object.values(cizim).map((collection: any, index: number) => {
        const item = SerializeData({
          collection: collection,
          duvarFilter: 0,
        }).filter((el: any) => el !== []);

        if (item.length > 0 && item) {
          setSerialDataFirstWall((state) => {
            let last = state || [];

            last.push(item);

            return last;
          });
        }
      });
      //1.Duvar Items
      Object.values(cizim).map((collection: any, index: number) => {
        const item = SerializeData({
          collection: collection,
          duvarFilter: 1,
        }).filter((el: any) => el !== []);

        if (item.length > 0 && item) {
          setSerialDataSecondWall((state) => {
            let last = state || [];

            last.push(item);

            return last;
          });
        }
      });
    }
  }, [cizim]);

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

        updateItem = getUpdatedData(meshInTheScene);
      }
    }
  };

  const CreateElement = useCallback(
    (props: any) => {
      const { index, el } = props;

      const shouldUpdate =
        updateItem.filter((item: IMeshsInTheScene) => {
          return item.meshName === el.meshName;
        }).length > 0;

      console.log(shouldUpdate, el.meshName);

      if (shouldUpdate || updateItem.length === 0) {
        return (
          <CreateCube
            key={index + Math.random() * 100 + 10}
            objProperties={{
              needUpdate: true,
              meshName: el.meshName || "",
              meshWidth: el.meshWidth || 0,
              meshHeight: el.meshHeight || 0,
              meshDepth: el.meshDepth || 0,
              isSelected: el.isSelected || false,
              position: el.position || { x: 0, y: 0, z: 0 },
              materialTexture: el.materialTexture,
              materialBumb: Floor1R,
              materialRef: Floor1R,
            }}
          />
        );
      }

      return (
        <CreateCube
          key={index + Math.random() * 100 + 10}
          objProperties={{
            needUpdate: false,
            meshName: el.meshName || "",
            meshWidth: el.meshWidth || 0,
            meshHeight: el.meshHeight || 0,
            meshDepth: el.meshDepth || 0,
            isSelected: el.isSelected || false,
            position: el.position || { x: 0, y: 0, z: 0 },
            materialTexture: el.materialTexture,
            materialBumb: Floor1R,
            materialRef: Floor1R,
          }}
        />
      );
    },
    [updateItem]
  );

  // const ControlMemoItems = memo(
  //   (props: any) => {
  //     return (
  //       <group position={[0, 100, -100]} rotation={new Three.Euler(Math.PI / 2, 0, Math.PI / 2)}>
  //         {meshInTheScene &&
  //           meshInTheScene.map((item: Array<IMeshsInTheScene>, key: number) => {
  //             return (
  //               <group
  //                 ref={groupItem}
  //                 name={item[0].modulAdi}
  //                 key={key}
  //                 onPointerDown={(e) => {
  //                   handleMeshSelect(e, 0);
  //                 }}>
  //                 {item.map((el: IMeshsInTheScene, index: number) => {
  //                   if (el.duvarNo === 0) {
  //                     return CreateElement({ index: index, el: el });
  //                   }
  //                 })}
  //               </group>
  //             );
  //           })}
  //       </group>
  //     );
  //   },
  //   (prevState, nextState) => {
  //     console.log(prevState, nextState);
  //     return false;
  //   }
  // );

  return (
    <>
      <Control screenSpacePanning zoomSpeed={3} panSpeed={2} enablePan={true} enableZoom={true} enableRotate={true} />
      <SceneDefaultLights intensity={1} position={new Three.Vector3(0, 100, 100)} />
      {/* <ControlMemoItems updatedItem={updateItem} /> */}
      <ControlMemoItems
        meshInTheScene={meshInTheScene}
        groupItem={groupItem}
        handleMeshSelect={handleMeshSelect}
        updateItem={updateItem}
      />
      {/* <Suspense fallback={<h1>Loading...</h1>}>
        <group position={[0, 100, -100]} rotation={new Three.Euler(Math.PI / 2, 0, 0)}>
          {meshInTheScene &&
            meshInTheScene.map((item: Array<IMeshsInTheScene>, key: number) => {
              return (
                <group name={item[0].modulAdi} key={key} onPointerDown={(e) => handleMeshSelect(e, 1)}>
                  {item.map((el: IMeshsInTheScene, index: number) => {
                    if (el.duvarNo === 1) {
                      return (
                        <CreateCube
                          key={index + Math.random() * 100 + 50}
                          objProperties={{
                            meshName: el.meshName || "",
                            meshWidth: el.meshWidth || 0,
                            meshHeight: el.meshHeight || 0,
                            meshDepth: el.meshDepth || 0,
                            isSelected: el.isSelected || false,
                            position: el.position || { x: 0, y: 0, z: 0 },
                            materialTexture: Floor1T,
                            materialBumb: Floor1R,
                            materialRef: Floor1R,
                          }}
                        />
                      );
                    }
                  })}
                </group>
              );
            })}
        </group>
      </Suspense> */}
    </>
  );
};

// {/* if (item.duvarNo === 0) {
//                 return (
//                   <CreateCube
//                     key={key}
//                     objProperties={{
//                       meshName: item.meshName || "",
//                       meshWidth: item.meshWidth || 0,
//                       meshHeight: item.meshHeight || 0,
//                       meshDepth: item.meshDepth || 0,
//                       isSelected: item.isSelected || false,
//                       position: item.position || { x: 0, y: 0, z: 0 },
//                       materialTexture: Floor1T,
//                       materialBumb: Floor1R,
//                       materialRef: Floor1R,
//                     }}
//                   />
//                 ); */}
