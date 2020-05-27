import React, { useState } from "react";
import "./LeftSideMenu.css";
import { Table, Label, Grid, Image, Button } from "semantic-ui-react";

export interface ITableItem {
  textureName: string;
  textureSrc?: string;
}

export type TextureTable = {
  tableItems: Array<ITableItem>;
};

export default function TextureTable(props: TextureTable) {
  const [tableItems, settableItems] = useState<Array<ITableItem>>(props.tableItems);
  const [visible, setVisible] = useState(false);
  const imageSize = 60;

  const textureList = [
    {
      src: require("../Materials/Texture/TextureImages/floor_1_R.jpg"),
      textureName: "TEST",
    },
    {
      src: require("../Materials/Texture/TextureImages/floor_1_T.jpg"),

      textureName: "TEST",
    },
    {
      src: require("../Materials/Texture/TextureImages/02.jpg"),
      textureName: "TEST",
    },
    {
      src: require("../Materials/Texture/TextureImages/02.jpg"),
      textureName: "TEST",
    },
    {
      src: require("../Materials/Texture/TextureImages/02.jpg"),
      textureName: "TEST",
    },
  ];

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>TextureName</Table.HeaderCell>
            <Table.HeaderCell>Texture</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableItems?.map((item: ITableItem, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <Label ribbon>{item.textureName}</Label>
                </Table.Cell>
                <Table.Cell>
                  <img width={imageSize} src={item.textureSrc} alt={item.textureName} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Button className='textureListButton' size='tiny' primary onClick={() => setVisible(!visible)}>
        Texture List
      </Button>
      {visible ? (
        <div className='texturegridContaier'>
          <Grid columns={3} className='flow'>
            {textureList.map((item, index) => {
              return (
                <Grid.Column key={index}>
                  <img src={item.src} alt='test' width={imageSize} />
                  <p>{item.textureName}</p>
                </Grid.Column>
              );
            })}
          </Grid>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
