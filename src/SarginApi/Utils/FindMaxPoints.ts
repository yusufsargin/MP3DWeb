import * as Three from "three";
import { IMeshsInTheScene } from "../../App";

interface IFindMinPoints {
  mesh: IMeshsInTheScene[];
}

export default function FindMinPoints(props: IFindMinPoints) {
  const { mesh } = props;
  let maxPoints = {
    x: 0,
    y: 0,
    z: 0,
  };

  if (mesh) {
    mesh.map((item: IMeshsInTheScene) => {
      item.objItem?.computeBoundingBox();

      const meshItem = item.objItem?.boundingBox;
      const { x, y, z } = maxPoints;

      if (x < ((meshItem?.max || {}).x || 0)) {
        maxPoints.x = (meshItem?.max || {}).x || 0;
      }
      if (y < ((meshItem?.max || {}).y || 0)) {
        maxPoints.y = (meshItem?.max || {}).y || 0;
      }
      if (z < ((meshItem?.max || {}).z || 0)) {
        maxPoints.z = (meshItem?.max || {}).z || 0;
      }
    });

    return maxPoints;
  }

  return maxPoints;
}
