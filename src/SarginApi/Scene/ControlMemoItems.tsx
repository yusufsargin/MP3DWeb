import React, { memo, useCallback } from "react";
import { IMeshsInTheScene } from "../../declation";
import * as Three from "three";
import CreateCube from "../CreateObjects/CreateCube";
import Floor1T from "../Materials/Texture/TextureImages/floor_1_T.jpg";
import Floor1R from "../Materials/Texture/TextureImages/floor_1_R.jpg";
import { CreateElementMemo } from "./CreateElementMemo";

export const ControlMemoItems = memo(
  (props: any) => {
    const { meshInTheScene, groupItem, handleMeshSelect, updateItem } = props;

    return (
      <group position={[0, 100, -100]} rotation={new Three.Euler(Math.PI / 2, 0, Math.PI / 2)}>
        {meshInTheScene &&
          meshInTheScene.map((item: Array<IMeshsInTheScene>, key: number) => {
            return (
              <group
                ref={groupItem}
                name={item[0].modulAdi}
                key={key}
                onPointerDown={(e) => {
                  handleMeshSelect(e, 0);
                }}>
                {item.map((el: IMeshsInTheScene, index: number) => {
                  if (el.duvarNo === 0) {
                    return <CreateElementMemo index={index} el={el} updateItem={updateItem} />;
                  }
                })}
              </group>
            );
          })}
      </group>
    );
  },
  (prevState, nextState) => {
    //İlerde render müdahelesi için kullan.
    return false;
  }
);
