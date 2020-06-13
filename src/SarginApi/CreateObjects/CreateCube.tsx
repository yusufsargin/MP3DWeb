import React, { useState, useMemo, useRef } from "react";
import * as Three from "three";
import MaterialCreator from "../Materials/MaterialLib/MaterialCreator";
import { TCreateCube } from "../../declation";

export default function CreateCube(props: TCreateCube) {
  const {
    position,
    meshDepth,
    meshWidth,
    meshHeight,
    meshName,
    materialTexture,
    materialBumb,
    materialRef,
    needUpdate,
  } = props.objProperties;
  //Material Control And Add --------------------------------------------
  const diffuseTexture = materialTexture || "";
  const bumpTexture = materialBumb || "";
  const refTexture = materialRef || "";

  const [material] = useState<Three.MeshStandardMaterial>(
    MaterialCreator({
      materialTexture: diffuseTexture,
      materialBumb: bumpTexture,
      materialRef: refTexture,
      bumbScale: 0.5,
    })
  );
  //------------------------------------------------

  //Location Clc-------------------
  const lastObjPosition = new Three.Vector3(meshWidth / 2, meshHeight / 2, meshDepth / 2);
  const lastPosition = new Three.Vector3(
    lastObjPosition.x + position.z,
    lastObjPosition.y + position.x,
    lastObjPosition.z + position.y
  );

  //-------------------------------
  const box = useMemo(() => new Three.BoxBufferGeometry(meshWidth, meshHeight, meshDepth), []);
  const materialMemo = useMemo(
    () =>
      MaterialCreator({
        materialTexture: diffuseTexture,
        materialBumb: bumpTexture,
        materialRef: refTexture,
        bumbScale: 0.5,
      }),
    [material]
  );

  return (
    <mesh
      matrixAutoUpdate={false}
      onUpdate={(self) => {
        const material: any = self.material;
        if (needUpdate) {
          material.needUpdate = true;
          self.updateMatrix();
        }
      }}
      name={meshName}
      geometry={box}
      position={[lastPosition.x, lastPosition.y, lastPosition.z]}
      material={materialMemo}
    />
  );
}
