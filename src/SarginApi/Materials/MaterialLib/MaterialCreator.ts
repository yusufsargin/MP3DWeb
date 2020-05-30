import * as Three from "three";

interface IMaterialCreator {
  materialTexture: string;
  materialBumb: string;
  materialRef: string;
  bumbScale: number;
}

export default function Wood(props: IMaterialCreator) {
  const diffuseTexture = new Three.TextureLoader().load(props.materialTexture);
  const refTexture = new Three.TextureLoader().load(props.materialRef);

  diffuseTexture.minFilter = Three.LinearFilter;
  refTexture.minFilter = Three.LinearFilter;

  const material = new Three.MeshStandardMaterial({
    map: diffuseTexture,
    bumpMap: refTexture,
    bumpScale: 0.05,
  });

  return material;
}
