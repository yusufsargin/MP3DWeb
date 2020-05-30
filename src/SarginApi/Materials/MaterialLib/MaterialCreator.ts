import * as Three from "three";
import { IMaterialCreator } from "../../../declation";

export default function Wood(props: IMaterialCreator) {
  const diffuseTexture = new Three.TextureLoader().load(props.materialTexture);
  const refTexture = new Three.TextureLoader().load(props.materialRef);

  const material = new Three.MeshStandardMaterial({
    map: diffuseTexture,
    bumpMap: refTexture,
    bumpScale: 0.05,
  });

  return material;
}
