import React from "react";
import "./App.css";
import * as Three from "three";
import { IPosition } from "./SarginApi/CreateObjects/CreateCube";
import TestData from "./SarginApi/TextData/test.json";
import Sargin3dDrawEngine from "./Sargin3dDrawEngine";

export interface ICizimModul {
  adi: string;
  boy: number;
  derinlik: number;
  en: number;
  x_1: number;
  y_1: number;
  z_1: number;
  marka: string;
  image: string;
  kalinlik: number;
  duvarNo: number;
  modulAdi: string;
  modulEn: number;
  modulDerinlik: number;
  modulX1: number;
  modulY1: number;
  modulZ1: number;
  modulYukseklik: number;
  tip: number;
  extra: { cekmecekontrol: boolean };
}

export interface IMeshsInTheScene {
  meshName?: string;
  isSelected?: boolean;
  size?: Three.Vector3;
  setSize?(value: Three.Vector3): void;
  position?: IPosition;
  objItem?: Three.BoxBufferGeometry | Three.SphereBufferGeometry;
  description?: string;
  materialTexture?: string;
  meshWidth?: number;
  meshHeight?: number;
  meshDepth?: number;
  duvarNo?: number;
  rotation: { lx: number; ly: number; lz: number };
  modulAdi?: string;
}

function App() {
  return (
    <div className='App'>
      <Sargin3dDrawEngine cizim={TestData} />
    </div>
  );
}

export default App;
