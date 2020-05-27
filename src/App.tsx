import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import LeftSideMenu from "./SarginApi/UI/LeftSideMenu";
import { Canvas } from "react-three-fiber";
import Scene from "./SarginApi/Scene/Scene";
import * as Three from "three";
import { IPosition } from "./SarginApi/CreateObjects/CreateCube";
import TestData from "./SarginApi/TextData/test.json";
import DataParser from "./SarginApi/DataParser/DataParser";
import FindMinPoints from "./SarginApi/Utils/FindMinPoints";
import FindMaxPoints from "./SarginApi/Utils/FindMaxPoints";

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
  const [cizim] = useState<any>(DataParser(TestData));
  const [selectedItems, setSelectedItems] = useState<Array<IMeshsInTheScene>>();

  const [meshInTheScene, setMeshInTheScene] = useState<Array<Array<IMeshsInTheScene>>>();

  const updateMeshItems = useCallback(
    (value: Array<IMeshsInTheScene>) => {
      setMeshInTheScene((state) => {
        let lastState = state || [];

        lastState.push(value);

        return lastState;
      });
    },
    [meshInTheScene]
  );

  const updateSelectedItems = useCallback((updatedData: IMeshsInTheScene[][]) => {
    if (updatedData) {
      let lastData: IMeshsInTheScene[] = [];

      updatedData.map((el: Array<IMeshsInTheScene>) => {
        el.map((item) => {
          if (item.isSelected) {
            lastData.push(item);
          }
        });
      });

      setSelectedItems(lastData);
    }
  }, []);

  const handleGroupPointerDownToMeshes = (e: PointerEvent | any, duvarNo?: number) => {
    e.stopPropagation();
    const groupName = e.eventObject.name || "";
    if (meshInTheScene) {
      const updatedData: Array<Array<IMeshsInTheScene>> | any = meshInTheScene.map((item) => {
        return item.map((el: IMeshsInTheScene) => {
          if (el.duvarNo === (duvarNo || 0)) {
            if (el.modulAdi === groupName) {
              el.isSelected = true;
              return el;
            }
          }

          el.isSelected = false;
          return el;
        });
      });

      const item = updatedData.filter((item: IMeshsInTheScene[]) => {
        return item[0].isSelected;
      })[0];

      const minPoints = FindMinPoints({
        mesh: item,
      });
      const maxPoints = FindMaxPoints({
        mesh: item,
      });

      console.log(maxPoints.x - minPoints.x);

      updateSelectedItems(updatedData);
    }
  };

  const updateSelectedItemProperties = useCallback(
    (updateType: string, value: any) => {
      if (updateType.indexOf("updateTexture") !== -1) {
        if (selectedItems && meshInTheScene) {
          setSelectedItems((item: IMeshsInTheScene[] | any) => {
            return item.map((el: IMeshsInTheScene) => {
              return (el.materialTexture = value);
            });
          });

          setMeshInTheScene((item: IMeshsInTheScene[][] | any) => {
            return item.map((el: IMeshsInTheScene[]) => {
              return el.map((data: IMeshsInTheScene) => {
                if (data.isSelected) {
                  data.materialTexture = value;
                }

                return data;
              });
            });
          });
        }
      }
    },
    [selectedItems]
  );

  const LeftSideMenuWithMemo = useMemo(() => {
    return (
      selectedItems && (
        <LeftSideMenu updateSelectedItemProperties={updateSelectedItemProperties} selectedItem={selectedItems} />
      )
    );
  }, [selectedItems]);

  const SceneWithMemo = useMemo(() => {
    return (
      <Scene
        updateMeshItems={updateMeshItems}
        meshInTheScene={meshInTheScene}
        handleMeshSelect={handleGroupPointerDownToMeshes}
        cizim={cizim}
      />
    );
  }, [meshInTheScene]);

  return (
    <div className='App'>
      <div className='scene'>
        <Canvas
          style={{
            margin: "auto",
            width: "95%",
            height: window.innerHeight / 1.2,
          }}>
          {cizim && SceneWithMemo}
        </Canvas>
      </div>
      {selectedItems && LeftSideMenuWithMemo}
    </div>
  );
}

export default App;
