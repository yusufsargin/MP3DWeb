import React, { useRef, useState, useCallback } from "react";
import { OrbitControls, Sky } from "drei";
import * as Three from "three";
import { ISelectedProduct } from "../UI/SettingsCard";
import { IMeshsInTheScene } from "../../App";
import { BoxBufferGeometry } from "three";
import CreateCube from "../CreateObjects/CreateCube";
import Floor1T from "../Materials/Texture/TextureImages/floor_1_T.jpg";
import Floor1R from "../Materials/Texture/TextureImages/floor_1_R.jpg";

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
  console.log(Floor1T);
  const firstMesh = useRef<any>();
  const secondMesh = useRef<any>();
  //import setStateItem Hook
  const { setSelectedItem, updateSelectedItemProp, setMeshInTheScene, meshInTheScene } = props;

  const setSelectetItemProp = useCallback(async (data: any) => {
    const { name, scale } = data.object;
    setSelectedItem({
      name: name,
      genislik: scale.x,
      boy: scale.y,
      derinlik: scale.z,
    });

    setMeshInTheScene((items: Array<IMeshsInTheScene>) => {
      let prev: Array<IMeshsInTheScene> = items;

      prev = prev.map((item: IMeshsInTheScene) => {
        if (item.meshName === name) {
          item.isSelected = true;
          return item;
        } else {
          item.isSelected = false;
          return item;
        }
      });

      return prev;
    });
  }, []);

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

  function meshPointerDownHandle(e: PointerEvent): void {
    e.stopPropagation();
    setSelectetItemProp(e);
  }

  const DefaultCube = (props: any) => {
    return (
      <>
        <mesh onPointerDown={(e: any) => meshPointerDownHandle(e)} position={[0, 0, 0]} name='FirstObj' ref={firstMesh}>
          <boxBufferGeometry attach='geometry' />
          <meshNormalMaterial attach='material' />
        </mesh>
        <mesh onPointerDown={(e: any) => meshPointerDownHandle(e)} position={[2, 0, 0]} name='Second' ref={secondMesh}>
          <boxBufferGeometry attach='geometry' />
          <meshNormalMaterial attach='material' />
        </mesh>
      </>
    );
  };

  const PropsCubes = (props: IMeshsInTheScene) => {
    const { meshName, position, material, size } = props;
    return (
      <mesh
        geometry={new Three.BoxBufferGeometry(size?.x, size?.y, size?.z)}
        //onPointerDown={(e: any) => updateSelectedItemProp(e)}
        position={position}
        name={meshName}>
        {material ? <meshStandardMaterial attach='material' /> : <meshNormalMaterial attach='material' />}
      </mesh>
    );
  };

  return (
    <>
      <Control screenSpacePanning zoomSpeed={3} panSpeed={2} enablePan={true} enableZoom={true} enableRotate={true} />
      <SceneDefaultLights intensity={2} position={new Three.Vector3(100, 50, 50)} />
      {/* <DefaultCube /> */}
      {/* <group name='test' onPointerDown={(e: any) => e.stopPropagation() && console.log(e)}>
        {(meshInTheScene || []).map((item: IMeshsInTheScene, index: number) => {
          return (
            <PropsCubes
              key={index}
              meshName={item.meshName}
              size={item.size}
              position={item.position}
              isSelected={item.isSelected}
            />
          );
        })}
      </group> */}
      <CreateCube
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
      />
    </>
  );
}
