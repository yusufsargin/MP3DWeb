import React, { Suspense, useState, useEffect, useMemo, useRef } from "react";
import * as Three from "three";
import { TextureLoader } from "three";
import Floor1T from "../Materials/Texture/TextureImages/floor_1_R.jpg";
import { useLoader } from "react-three-fiber";
import { BasisTextureLoader } from "three/examples/jsm/loaders/BasisTextureLoader";

export interface IPosition {
  x: number;
  y: number;
  z: number;
  vector?: Three.Vector3;
}

export interface ICreateCube {
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
  } = props.objProperties;
  //Material Control And Add --------------------------------------------
  const diffuseTexture = materialTexture || "";
  const bumpTexture = materialBumb || "";
  const refTexture = materialRef || "";

  const [diffuseMap, setDiffuseMap] = useState(new TextureLoader().load(diffuseTexture));
  const [bumpMap, setBumpMap] = useState(new TextureLoader().load(bumpTexture));
  const [refMap, setRefMap] = useState(new TextureLoader().load(refTexture));
  const [material, setMaterial] = useState<Three.MeshStandardMaterial>();

  useEffect(() => {
    //Set Material prop
    setMaterial(() => {
      let lastState = new Three.MeshStandardMaterial();

      if (lastState && diffuseMap) {
        lastState.map = diffuseMap;
        lastState.refractionRatio = 0.7;

        if (bumpTexture !== "") {
          lastState.bumpMap = bumpMap;
          lastState.bumpScale = 0.05;
        }

        if (refTexture !== "") {
          lastState.roughnessMap = refMap;
        }
      }

      return lastState;
    });
  }, [diffuseMap, bumpMap, refMap]);
  //------------------------------------------------

  return (
    <mesh name={meshName} position={[position.x, position.y, position.z]} material={material}>
      <boxBufferGeometry attach='geometry' args={[meshWidth, meshHeight, meshDepth]} />
    </mesh>
  );
}
