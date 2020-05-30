import React, { useState, useEffect, Suspense, useRef } from "react";
import { OrbitControls, Sky } from "drei";
import * as Three from "three";
import CreateCube from "../CreateObjects/CreateCube";
import Floor1T from "../Materials/Texture/TextureImages/floor_1_T.jpg";
import Floor1R from "../Materials/Texture/TextureImages/floor_1_R.jpg";
import SerializeData from "../DataParser/SerializeData";
import { IMeshsInTheScene } from "../../App";

interface IOrbitControl {
  enablePan?: boolean;
  enableRotate?: boolean;
  enableZoom?: boolean;
  panSpeed?: number;
  zoomSpeed?: number;
  screenSpacePanning?: boolean;
}

interface IDefaultLights {
  position?: Three.Vector3;
  intensity?: number;
}

export default function Scene(props: any) {
  const [serialDataFirstWall, setSerialDataFirstWall] = useState<Array<Array<IMeshsInTheScene>>>();
  const [serialDataSecondWall, setSerialDataSecondWall] = useState<Array<Array<IMeshsInTheScene>>>();
  const { cizim, updateMeshItems, meshInTheScene, handleMeshSelect } = props;
  const groupItem = useRef<any>(null);

  useEffect(() => {
    if (groupItem) {
      console.log(groupItem);
    }
  }, [groupItem]);

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

  return (
    <>
      <Control screenSpacePanning zoomSpeed={3} panSpeed={2} enablePan={true} enableZoom={true} enableRotate={true} />
      <SceneDefaultLights intensity={1} position={new Three.Vector3(0, 100, 100)} />
      <Suspense fallback={<h1>Loading</h1>}>
        <group position={[0, 100, -100]} rotation={new Three.Euler(Math.PI / 2, 0, Math.PI / 2)}>
          {meshInTheScene &&
            meshInTheScene.map((item: Array<IMeshsInTheScene>, key: number) => {
              return (
                <group
                  ref={groupItem}
                  name={item[0].modulAdi}
                  key={key}
                  onPointerDown={(e) => {
                    handleMeshSelect(e, 0);
                    console.log(groupItem.current.position.set(0, 100, 10));
                  }}>
                  {item.map((el: IMeshsInTheScene, index: number) => {
                    if (el.duvarNo === 0) {
                      return (
                        <CreateCube
                          key={index + Math.random() * 100 + 10}
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
      </Suspense>
      <Suspense fallback={<h1>Loading...</h1>}>
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
      </Suspense>
    </>
  );
}

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
