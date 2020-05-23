import React, { useState } from "react";
import "./LeftSideMenu.css";
import TextureTable, { ITableItem } from "./TextureTable";
import { Button, Divider } from "semantic-ui-react";
import SettingsCard, { ISelectedProduct } from "./SettingsCard";
import { IMeshsInTheScene } from "../../App";

export interface ISelectedItemProp {
  name: string;
  genislik: number;
  boy: number;
  derinlik: number;
  duzenleVisible?: boolean;
}

export default function LeftSideMenu(props: any) {
  const { selectedItem, setMeshProperties } = props;

  const testTableItems: Array<ITableItem> = [
    {
      textureName: "Wood",
      textureSrc: "https://i.pinimg.com/originals/e9/ff/92/e9ff92cba52cdbab0415c67864dc3adc.jpg",
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
            <SettingsCard productAttribute={selectedItem} duzenleVisible={true} setMeshProperties={setMeshProperties} />
          </div>
        </div>
      </div>
    </div>
  );
}
