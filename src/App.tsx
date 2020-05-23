import React, { useState, useEffect } from "react";
import "./App.css";
import LeftSideMenu from "./SarginApi/UI/LeftSideMenu";
import { Canvas } from "react-three-fiber";
import Scene from "./SarginApi/Scene/Scene";
import * as Three from "three";

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

interface ISelectedItem {}
export interface IMeshsInTheScene {
  meshName?: string;
  isSelected?: boolean;
  size?: Three.Vector3;
  setSize?(value: Three.Vector3): void;
  position?: Three.Vector3;
  objItem?: Three.BoxBufferGeometry | Three.SphereBufferGeometry;
  material?: Three.MeshStandardMaterial;
  description?: string;
}

function App() {
  const [topla, setTopla] = useState(0);

  function toplamaIslemi(a: number, b: number) {
    const sonuc = a + b;
    console.log(sonuc);
    setTopla(sonuc);
  }

  const [meshInTheScene, setMeshInTheScene] = useState<Array<IMeshsInTheScene>>([
    {
      meshName: "testObj",
      isSelected: false,
      size: new Three.Vector3(20, 20, 20),
      position: new Three.Vector3(2, 10, 2),
    },
    {
      meshName: "testObj2",
      isSelected: false,
      size: new Three.Vector3(20, 20, 20),
      position: new Three.Vector3(20, 20, 0),
    },
  ]);

  function updateSelectedItemProp(e: PointerEvent | any) {
    e.stopPropagation();
    const { name } = e.object;
    setMeshInTheScene((item: Array<IMeshsInTheScene>) => {
      let meshItems: Array<IMeshsInTheScene> = item;

      meshItems = meshItems.map((element: IMeshsInTheScene) => {
        if (name === element.meshName) {
          element.isSelected = true;
          return element;
        }

        element.isSelected = false;
        return element;
      });

      return meshItems;
    });
  }

  function updateMeshProperty(id: string, value: { size?: Three.Vector3; position?: Three.Vector3 }) {
    setMeshInTheScene((item: Array<IMeshsInTheScene>) => {
      let meshs = item;

      meshs = meshs.map((el: IMeshsInTheScene) => {
        if (id === el.meshName) {
          el.objItem = new Three.BoxBufferGeometry(value.size?.x, value.size?.y, value.size?.z);
          if (value.size) {
            el.size = value.size;
          }
          if (value.position) {
            el.position = value.position;
          }
          return el;
        }

        return el;
      });

      return meshs;
    });
  }

  function setMeshProperties(type: string, value: { size?: Three.Vector3; position?: Three.Vector3 }, id: string) {
    switch (type) {
      case "setSize":
        updateMeshProperty(id, value);
        break;
    }
  }

  const [selectedItem, setSelectedItem] = useState<ISelectedItem>();

  return (
    <div className='App'>
      <div className='scene'>
        <Canvas
          style={{
            margin: "auto",
            width: "95%",
            height: window.innerHeight / 1.2,
          }}>
          <Scene
            toplamaIslemi={toplamaIslemi}
            meshInTheScene={meshInTheScene}
            updateSelectedItemProp={updateSelectedItemProp}
            setMeshInTheScene={setMeshInTheScene}
            setSelectedItem={setSelectedItem}
          />
        </Canvas>
      </div>
      <LeftSideMenu
        setMeshProperties={setMeshProperties}
        selectedItem={meshInTheScene.filter((el: IMeshsInTheScene) => el.isSelected)}
      />
    </div>
  );
}

export default App;
