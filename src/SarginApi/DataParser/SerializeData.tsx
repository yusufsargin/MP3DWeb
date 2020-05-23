import React from "react";
import { ICreateCube } from "../CreateObjects/CreateCube";

export type TSerialize = {
  ICreateCube: ICreateCube;
  setSceneMeshes(value: ICreateCube): void;
};

export default function SerializeData(props: TSerialize) {
  const { setSceneMeshes, ICreateCube } = props;
  const { meshName, meshWidth, meshDepth, meshHeight, materialTexture, position } = ICreateCube;
  let postData = [];

  return <></>;
}
