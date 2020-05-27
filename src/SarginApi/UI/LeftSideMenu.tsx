import React, { useState } from "react";
import "./LeftSideMenu.css";
import TextureTable, { ITableItem } from "./TextureTable";
import { Button, Divider, Header } from "semantic-ui-react";
import SettingsCard, { ISelectedProduct } from "./SettingsCard";
import { IMeshsInTheScene } from "../../App";

export interface ISelectedItemProp {
  name: string;
  genislik: number;
  boy: number;
  derinlik: number;
  duzenleVisible?: boolean;
}

export type TLeftSideMenu = {
  selectedItem: IMeshsInTheScene[];
  setMeshProperties?: any;
  updateSelectedItemProperties: any;
};

export default function LeftSideMenu(props: TLeftSideMenu) {
  const { selectedItem, setMeshProperties, updateSelectedItemProperties } = props;
  const material: string = ((selectedItem || [])[0] || {}).materialTexture || "";

  const testTableItems: Array<ITableItem> = [
    {
      textureName: "Wood",
      textureSrc: material || "",
    },
  ];
  const [hoverMenu, setHoverMenu] = useState(true);

  return (
    <div className='container leftSideMenu'>
      <Button className='textBold' primary onClick={() => setHoverMenu(!hoverMenu)}>
        Control Menu
      </Button>{" "}
      <div id={hoverMenu ? "visible" : "invisible"}>
        <div className='header menu title'></div>
        <div className='texture itemsContainer hasBorder'>
          <Divider horizontal>Texture Menu</Divider>
          <div className='texture itemrow'>
            <TextureTable tableItems={testTableItems} />
          </div>
        </div>
        <div className='hasBorder'>
          <Divider horizontal>Seçilen Ürün Özellikleri</Divider>
          <div className='selectedItems'>
            <Header as='h3' dividing>
              {((selectedItem || [])[0] || {}).modulAdi || ""}
            </Header>
            <SettingsCard productAttribute={selectedItem} duzenleVisible={true} setMeshProperties={setMeshProperties} />
          </div>
        </div>
      </div>
    </div>
  );
}
