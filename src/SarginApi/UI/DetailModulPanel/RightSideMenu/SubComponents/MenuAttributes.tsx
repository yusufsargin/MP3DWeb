import React from 'react';

interface AttributeI {
    header: string;
    imagesUrl: Array<string>,
    customProperties?: any
}

const MenuAttributesDetail = (props: AttributeI) => {
    const {header, imagesUrl} = props;

    return (
        <div>

        </div>
    );
};

export default MenuAttributesDetail;
