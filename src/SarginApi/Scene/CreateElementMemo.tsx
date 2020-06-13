import React, { memo } from "react";
import CreateCube from "../CreateObjects/CreateCube";
import Floor1T from "../Materials/Texture/TextureImages/floor_1_T.jpg";
import Floor1R from "../Materials/Texture/TextureImages/floor_1_R.jpg";
import { IMeshsInTheScene } from "../../declation";

export const CreateElementMemo = memo(
  (props: any) => {
    const { index, el, updateItem } = props;
    if (updateItem) {
      const shouldUpdate =
        updateItem.filter((item: IMeshsInTheScene) => {
          return item.modulAdi === el.modulAdi;
        }).length > 0;

      if (shouldUpdate || updateItem.length === 0) {
        return (
          <CreateCube
            key={index + Math.random() * 100 + 10}
            objProperties={{
              needUpdate: true,
              meshName: el.meshName || "",
              meshWidth: el.meshWidth || 0,
              meshHeight: el.meshHeight || 0,
              meshDepth: el.meshDepth || 0,
              isSelected: el.isSelected || false,
              position: el.position || { x: 0, y: 0, z: 0 },
              materialTexture: el.materialTexture,
              materialBumb: Floor1R,
              materialRef: Floor1R,
            }}
          />
        );
      }
    }

    return (
      <CreateCube
        key={index + Math.random() * 100 + 10}
        objProperties={{
          needUpdate: false,
          meshName: el.meshName || "",
          meshWidth: el.meshWidth || 0,
          meshHeight: el.meshHeight || 0,
          meshDepth: el.meshDepth || 0,
          isSelected: el.isSelected || false,
          position: el.position || { x: 0, y: 0, z: 0 },
          materialTexture: el.materialTexture,
          materialBumb: Floor1R,
          materialRef: Floor1R,
        }}
      />
    );
  },
  (prevState, nextState) => {
    let shouldUpdate = false;

    const nextUpdateData = nextState.updateItem;
    const nextElement = nextState.el;

    if (nextUpdateData && nextElement) {
      nextUpdateData.map((item: IMeshsInTheScene) => {
        if (nextElement.modulAdi !== item.modulAdi) {
          shouldUpdate = true;
        } else {
          shouldUpdate = false;
        }
      });
    }

    return shouldUpdate;
  }
);
