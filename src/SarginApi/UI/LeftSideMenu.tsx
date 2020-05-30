import React, { useState } from "react";
import "./LeftSideMenu.css";
import TextureTable from "./TextureTable";
import { Button, Divider, Header } from "semantic-ui-react";
import SettingsCard from "./SettingsCard";
import { TLeftSideMenu, ITableItem } from "../../declation";

export default function LeftSideMenu(props: TLeftSideMenu) {
  const { selectedItem, setMeshProperties, updateSelectedItemProperties, setMeshTextureOnClick } = props;
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
            <TextureTable
              selectedItem={selectedItem}
              setMeshTextureOnClick={setMeshTextureOnClick}
              tableItems={testTableItems}
            />
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
