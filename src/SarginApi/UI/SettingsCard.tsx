import React from "react";
import { Card, Button, Input } from "semantic-ui-react";
import "./LeftSideMenu.css";
import * as Three from "three";
import { IMeshsInTheScene } from "../../App";

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

export type SelectedProduct = {
  productAttribute?: ISelectedProduct;
  duzenleVisible?: boolean;
  setSelectedItemHandle?(value: ISelectedProduct): void;
  setMeshProperties?: any;
};

export default function SettingsCard(props: SelectedProduct) {
  const products: Array<IMeshsInTheScene> | any = props.productAttribute;

  function setItemValue(item: IMeshsInTheScene | any, type: string, value: number) {
    if (type.indexOf("genislik") !== -1 && item) {
      item.size.x = value;
    }
    if (type.indexOf("boy") !== -1 && item) {
      item.size.y = value;
    }
    if (type.indexOf("derinlik") !== -1 && item) {
      item.size.z = value;
    }

    props.setMeshProperties && props.setMeshProperties("setSize", { size: item.size }, item.meshName);
  }

  return (
    <Card.Group className='containerScroll center-col'>
      {products &&
        products.map((el: IMeshsInTheScene) => {
          return (
            <Card>
              <Card.Content>
                <Card.Header>{el.meshName}</Card.Header>
                <Card.Description>
                  <p>{el.description}</p>
                  <Input
                    label={{ basic: true, content: "CM" }}
                    labelPosition='right'
                    type='text'
                    placeholder={"Genislik -" + el.size?.x}
                    onChange={(e) => setItemValue(el, "genislik", parseInt(e.target.value.replace(/[^0-9]/g, "")))}
                  />
                  <Input
                    label={{ basic: true, content: "CM" }}
                    labelPosition='right'
                    type='text'
                    placeholder={"Boy -" + el.size?.y}
                    onChange={(e) => setItemValue(el, "boy", parseInt(e.target.value.replace(/[^0-9]/g, "")))}
                  />
                  <Input
                    label={{ basic: true, content: "CM" }}
                    labelPosition='right'
                    placeholder={"Derinlik -" + el.size?.z}
                    onChange={(e) => setItemValue(el, "derinlik", parseInt(e.target.value.replace(/[^0-9]/g, "")))}
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  {el.isSelected === true ? <Button color='orange'>Düzenle</Button> : ""}
                  <Button color='red'>Sil</Button>
                </div>
              </Card.Content>
            </Card>
          );
        })}
    </Card.Group>
  );
}
