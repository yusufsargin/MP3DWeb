import React from "react";
import "./App.css";
import * as Three from "three";
import TestData from "./SarginApi/TextData/test.json";
import Sargin3dDrawEngine from "./Sargin3dDrawEngine";
import { IPosition } from "./declation";


function App() {
  return (
    <div className='App'>
      <Sargin3dDrawEngine cizim={TestData} />
    </div>
  );
}

export default App;
