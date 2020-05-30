import React from "react";
import { Card, Button, Input, List, Label } from "semantic-ui-react";
import "./LeftSideMenu.css";
import * as Three from "three";
import { IMeshsInTheScene, SelectedProduct } from "../../declation";

export default function SettingsCard(props: SelectedProduct) {
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
