export interface IPosition {
  x: number;
  y: number;
  z: number;
  vector?: Three.Vector3;
}

export interface IMaterialCreator {
  materialTexture: string;
  materialBumb: string;
  materialRef: string;
  bumbScale: number;
}

export interface IFindMinPoints {
  mesh: IMeshsInTheScene[];
}

export interface IFindMinPoints {
  mesh: IMeshsInTheScene[];
}

export interface ISelectedProduct {
  name: string;
  value?: number;
  isDeletable?: boolean;
  description?: string;
  setFunction?: any;
  genislik: number;
  derinlik: number;
  boy: number;
  duzenleVisible?: boolean;
}

export interface ICizimModul {
  adi: string;
  boy: number;
  derinlik: number;
  en: number;
  x_1: number;
  y_1: number;
  z_1: number;
  marka: string;
  image: string;
  kalinlik: number;
  duvarNo: number;
  modulAdi: string;
  modulEn: number;
  modulDerinlik: number;
  modulX1: number;
  modulY1: number;
  modulZ1: number;
  modulYukseklik: number;
  tip: number;
  extra: { cekmecekontrol: boolean };
}

export interface IMeshsInTheScene {
  meshName?: string;
  isSelected?: boolean;
  size?: Three.Vector3;
  setSize?(value: Three.Vector3): void;
  position?: IPosition;
  objItem?: Three.BoxBufferGeometry | Three.SphereBufferGeometry;
  description?: string;
  materialTexture?: string;
  meshWidth?: number;
  meshHeight?: number;
  meshDepth?: number;
  duvarNo?: number;
  rotation: { lx: number; ly: number; lz: number };
  modulAdi?: string;
}
export interface ITableItem {
  textureName: string;
  textureSrc?: string;
}

export type TMainDrawEngine = {
  collection: any;
  collectionName?: string;
  SIZERATIO?: number;
  duvarFilter?: number;
  setMeshesInTheScene?: any;
};

export type TTextureTable = {
  tableItems: Array<ITableItem>;
  setMeshTextureOnClick?: any;
  selectedItem?: IMeshsInTheScene[];
};

export interface IMaterialProp {
  materialTexture?: string;
  materialRef?: string;
  materialBumb?: string;
  attach?: any;
}

export type TCreateCube = {
  objProperties: ICreateCube;
};

export interface ICreateCube {
  isSelected?: boolean;
  meshName: string;
  meshType?: string;
  meshWidth: number;
  meshHeight: number;
  meshDepth: number;
  position: IPosition;
  UV?: { col: number; row: number };
  rotation?: { lx: number; ly: number; lz: number };
  MainGroup?: Three.Group;
  materialTexture?: string;
  materialRef?: string;
  materialBumb?: string;
  hasMaterial?: boolean;
}

export interface IOrbitControl {
  enablePan?: boolean;
  enableRotate?: boolean;
  enableZoom?: boolean;
  panSpeed?: number;
  zoomSpeed?: number;
  screenSpacePanning?: boolean;
}

export interface IDefaultLights {
  position?: Three.Vector3;
  intensity?: number;
}

export type TLeftSideMenu = {
  selectedItem: IMeshsInTheScene[];
  setMeshProperties?: any;
  updateSelectedItemProperties: any;
  setMeshTextureOnClick: any;
};

export interface ISelectedItemProp {
  name: string;
  genislik: number;
  boy: number;
  derinlik: number;
  duzenleVisible?: boolean;
}
export type SelectedProduct = {
  productAttribute?: Array<IMeshsInTheScene>;
  duzenleVisible?: boolean;
  setSelectedItemHandle?(value: ISelectedProduct): void;
  setMeshProperties?: any;
  setMeshTextureOnClick?: any;
};
