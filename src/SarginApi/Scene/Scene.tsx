import React, { useState, useEffect } from "react";
import { OrbitControls, Sky } from "drei";
import * as Three from "three";
import CreateCube from "../CreateObjects/CreateCube";
import Floor1T from "../Materials/Texture/TextureImages/floor_1_T.jpg";
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
  const { cizim } = props;

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
        {/* <pointLight {...props} /> */}
        <ambientLight {...props} />
        <Sky />
      </>
    );
  };

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
    }
  }, [cizim]);

  return (
    <>
      <Control screenSpacePanning zoomSpeed={3} panSpeed={2} enablePan={true} enableZoom={true} enableRotate={true} />
      <SceneDefaultLights intensity={1} position={new Three.Vector3(0, 100, 100)} />
      {/* <CreateCube
        objProperties={{
          meshName: "test",
          meshDepth: 10,
          meshHeight: 10,
          meshWidth: 10,
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          materialTexture: Floor1T,
          materialBumb: Floor1R,
          materialRef: Floor1R,
        }}
      /> */}
      <group position={[0, 100, -100]} rotation={new Three.Euler(Math.PI / 2, 0, Math.PI / 2)}>
        {serialDataFirstWall &&
          serialDataFirstWall.map((collection, index) => {
            return collection.map((item, key) => {
              return (
                <CreateCube
                  objProperties={{
                    meshName: item.meshName || "",
                    meshWidth: item.meshWidth || 0,
                    meshHeight: item.meshHeight || 0,
                    meshDepth: item.meshDepth || 0,
                    isSelected: item.isSelected || false,
                    position: item.position || { x: 0, y: 0, z: 0 },
                    materialTexture: Floor1T,
                  }}
                />
              );
            });
          })}
      </group>
    </>
  );
}
