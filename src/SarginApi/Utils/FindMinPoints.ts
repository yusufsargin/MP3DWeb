import * as Three from "three";
import { IFindMinPoints, IMeshsInTheScene } from "../../declation";

export default function FindMinPoints(props: IFindMinPoints) {
  const { mesh } = props;
  let minPoints = {
    x: 0,
    y: 0,
    z: 0,
  };

  if (mesh) {
    mesh.map((item: IMeshsInTheScene) => {
      item.objItem?.computeBoundingBox();

      const meshItem = item.objItem?.boundingBox;
      const { x, y, z } = minPoints;

      if (x > ((meshItem?.min || {}).x || 0)) {
        minPoints.x = (meshItem?.min || {}).x || 0;
      }
      if (y > ((meshItem?.min || {}).y || 0)) {
        minPoints.y = (meshItem?.min || {}).y || 0;
      }
      if (z > ((meshItem?.min || {}).z || 0)) {
        minPoints.z = (meshItem?.min || {}).z || 0;
      }
    });

    return minPoints;
  }

  return minPoints;
}
