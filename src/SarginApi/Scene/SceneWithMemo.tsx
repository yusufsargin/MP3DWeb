import React, { useMemo } from "react";
import { Scene } from "./Scene";
import { IMeshsInTheScene } from "../../declation";

interface ISceneProps {
  updateMeshItems?: any;
  meshInTheScene?: IMeshsInTheScene[][];
  handleMeshSelect?: any;
  cizim?: any;
  scene?: any;
  setScene?: any;
  handleGroupPointerDownToMeshes?: any;
  updateItems?: IMeshsInTheScene[];
}

export const SceneWithMemo = React.memo(
  (props: ISceneProps) => {
    const { updateMeshItems, meshInTheScene, handleGroupPointerDownToMeshes, cizim, scene, setScene } = props;
    return (
      <Scene
        updateMeshItems={updateMeshItems}
        meshInTheScene={meshInTheScene}
        handleMeshSelect={handleGroupPointerDownToMeshes}
        cizim={cizim}
        scene={scene}
        setScene={setScene}
      />
    );
  },
  (prevState: ISceneProps, nextState: ISceneProps) => {
    console.log(prevState, nextState);
    if (prevState.updateItems && nextState.updateItems) {
      if (prevState.updateItems[0].shouldUpdate !== nextState.updateItems[0].shouldUpdate) {
        return false;
      }
    }

    if (typeof prevState.updateItems === "undefined") {
      return false;
    }

    if (prevState.updateItems !== nextState.updateItems) {
      return false;
    }

    if (typeof nextState.scene === "undefined") {
      return false;
    }
    return true;
  }
);
