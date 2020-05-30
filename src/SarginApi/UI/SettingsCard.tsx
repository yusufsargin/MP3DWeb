import React from "react";
import { Card, Button, Input, List, Label } from "semantic-ui-react";
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
  productAttribute?: Array<IMeshsInTheScene>;
  duzenleVisible?: boolean;
  setSelectedItemHandle?(value: ISelectedProduct): void;
  setMeshProperties?: any;
  setMeshTextureOnClick?: any;
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

  function fixToNumber(value: number) {
    return value && parseFloat(value.toFixed(2));
  }

  return (
    <Card.Group className='containerScroll center-col'>
      {props.productAttribute &&
        props.productAttribute.map((el: IMeshsInTheScene, index: number) => {
          return (
            <Card key={index}>
              <Card.Content>
                <Card.Header>{el.meshName}</Card.Header>
                <Card.Description>
                  <p>{el.description}</p>
                  <List divided selection>
                    <List.Item>
                      <Label color='red' horizontal>
                        {fixToNumber(el.meshWidth || 0) + " cm"}
                      </Label>
                      Kalınlık
                    </List.Item>
                    <List.Item>
                      <Label color='purple' horizontal>
                        {fixToNumber(el.meshDepth || 0) + " cm"}
                      </Label>
                      Yükseklik
                    </List.Item>
                    <List.Item>
                      <Label color='red' horizontal>
                        {fixToNumber(el.meshHeight || 0) + " cm"}
                      </Label>
                      Derinlik
                    </List.Item>
                  </List>
                </Card.Description>
              </Card.Content>
            </Card>
          );
        })}
    </Card.Group>
  );
}
