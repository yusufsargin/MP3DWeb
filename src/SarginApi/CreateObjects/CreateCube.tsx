import React, { Suspense, useState, useEffect, useMemo, useRef } from "react";
import * as Three from "three";
import { TextureLoader, MaterialLoader } from "three";
import Floor1T from "../Materials/Texture/TextureImages/floor_1_R.jpg";
import { useLoader } from "react-three-fiber";
import { BasisTextureLoader } from "three/examples/jsm/loaders/BasisTextureLoader";
import MaterialCreator from "../Materials/MaterialLib/MaterialCreator";

export interface IPosition {
  x: number;
  y: number;
  z: number;
  vector?: Three.Vector3;
}

export interface ICreateCube {
  isSelected?: boolean;
  meshName: string;
  meshType?: string;
  meshWidth: number;
  meshHeight: number;
  meshDepth: number;
  position: IPosition;
  UV?: { col: number; row: number };
  rotation?: { lx: number; ly: number; lz: number };
  MainGroup?: Three.Group;
  materialTexture?: string;
  materialRef?: string;
  materialBumb?: string;
  hasMaterial?: boolean;
}

export interface IMaterialProp {
  materialTexture?: string;
  materialRef?: string;
  materialBumb?: string;
  attach?: any;
}

export type TCreateCube = {
  objProperties: ICreateCube;
};

export default function CreateCube(props: TCreateCube) {
  const {
    position,
    meshDepth,
    meshWidth,
    meshHeight,
    meshName,
    materialTexture,
    materialBumb,
    materialRef,
    rotation,
  } = props.objProperties;
  //Material Control And Add --------------------------------------------
  const diffuseTexture = materialTexture || "";
  const bumpTexture = materialBumb || "";
  const refTexture = materialRef || "";

  const [material, setMaterial] = useState<Three.MeshStandardMaterial>();

  useEffect(() => {
    const material = MaterialCreator({
      materialTexture: diffuseTexture,
      materialBumb: bumpTexture,
      materialRef: refTexture,
      bumbScale: 0.5,
    });

    setMaterial(material);
  }, []);
  //------------------------------------------------

  //Location Clc-------------------
  const lastObjPosition = new Three.Vector3(meshWidth / 2, meshHeight / 2, meshDepth / 2);
  const lastPosition = new Three.Vector3(
    lastObjPosition.x + position.z,
    lastObjPosition.y + position.x,
    lastObjPosition.z + position.y
  );

  //-------------------------------

  return (
    <mesh name={meshName} position={[lastPosition.x, lastPosition.y, lastPosition.z]} material={material}>
      <boxBufferGeometry attach='geometry' args={[meshWidth, meshHeight, meshDepth]} />
    </mesh>
  );
}
