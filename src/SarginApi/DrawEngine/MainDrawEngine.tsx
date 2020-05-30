import React, { useState, useEffect } from "react";
import Floor1T from "../Materials/Texture/TextureImages/floor_1_T.jpg";
import { TMainDrawEngine, IMeshsInTheScene, ICizimModul } from "../../declation";

export default function MainDrawEngine(props: TMainDrawEngine) {
  const { collection, SIZERATIO, duvarFilter } = props;
  let lastData: Array<IMeshsInTheScene> = [];

  collection.map((item: ICizimModul, index: number) => {
    let location = { lx: 0, ly: 0, lz: 0 };
    if (item.duvarNo === 1) {
      location = { lx: 0, ly: 0, lz: Math.PI };
    }

    var position = {
      x: (item.x_1 + item.modulX1) * (SIZERATIO || 1),
      y: (item.y_1 + item.modulY1) * (SIZERATIO || 1),
      z: (item.z_1 + item.modulZ1) * (SIZERATIO || 1),
    };
    let en = 0;
    let boy = 0;
    let kalinlik = 0;

    if (item.tip === 2) {
      if ((item.extra || {}).cekmecekontrol || false) {
        en = item.boy;
        boy = item.kalinlik;
        kalinlik = item.en;
      } else {
        //sağ sol yan
        en = item.en;
        boy = item.kalinlik;
        kalinlik = item.boy;
      }
    } else if (item.tip === 3) {
      if ((item.extra || {}).cekmecekontrol || false) {
        en = item.boy;
        boy = item.en;
        kalinlik = item.kalinlik || 1.8;
      } else {
        //raf üst alt
        en = item.en;
        boy = item.boy;
        kalinlik = item.kalinlik || 1.8;
      }
    } else if (item.tip === 1 || item.tip === 4) {
      if (((item.extra || {}).cekmecekontrol || false) && item.adi.indexOf("kapak") === -1) {
        en = item.kalinlik;
        boy = item.boy;
        kalinlik = item.en;
      } else {
        //Kapak çizimi
        if (item.adi.indexOf("baza") !== -1 || item.adi.indexOf("arka kuşak") !== -1) {
          en = item.kalinlik;
          boy = item.boy;
          kalinlik = item.en;
        } else {
          en = item.kalinlik;
          boy = item.en;
          kalinlik = item.boy;
        }
      }
    }

    if (
      (item.duvarNo || 0) === (duvarFilter || 0) &&
      item.marka === "" &&
      item.adi.indexOf("raf") === -1 &&
      item.tip !== 0
    ) {
      lastData.push({
        meshWidth: en,
        meshHeight: boy,
        meshDepth: kalinlik,
        meshName: item.adi,
        position: position,
        rotation: location,
        materialTexture: Floor1T,
      });
    } else {
      return <></>;
    }
  });

  return <></>;
}
