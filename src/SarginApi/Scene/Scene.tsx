import React, { useRef, useState, useCallback } from "react";
import { OrbitControls, Sky } from "drei";
import * as Three from "three";
import CreateCube from "../CreateObjects/CreateCube";
import Floor1T from "../Materials/Texture/TextureImages/floor_1_T.jpg";
import Floor1R from "../Materials/Texture/TextureImages/floor_1_R.jpg";
import MainDrawEngine from "../DrawEngine/MainDrawEngine";

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
  const { cizim, setMeshInTheScene } = props;

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
        <pointLight {...props} />
        <Sky />
      </>
    );
  };

  return (
    <>
      <Control screenSpacePanning zoomSpeed={3} panSpeed={2} enablePan={true} enableZoom={true} enableRotate={true} />
      <SceneDefaultLights intensity={2} position={new Three.Vector3(100, 50, 50)} />
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
      {Object.values(cizim).map((collection: any, index: number) => {
        if (collection[0].duvaNo === 1) {
          return <MainDrawEngine collection={collection} setMeshesInTheScene={setMeshInTheScene} />;
        }
      })}
    </>
  );
}
