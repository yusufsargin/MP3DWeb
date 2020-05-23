import React from "react";
import * as Three from "three";

export interface IPosition {
  x?: number;
  y?: number;
  z?: number;
  vector?: Three.Vector3;
}

export interface ICreateCube {
  meshName: string;
  meshType?: string;
  meshWidth: number;
  meshHeight?: number;
  meshDepth?: number;
  scene: Three.Scene;
  material?: Three.Material;
  position: IPosition;
  UV?: { col: number; row: number };
  rotation?: { lx: number; ly: number; lz: number };
  MainGroup?: Three.Group;
}

export type TCreateCube = {
  objProperties: ICreateCube;
};

export default function CreateCube(props:TCreateCube) {
    
  return <div></div>;
}
