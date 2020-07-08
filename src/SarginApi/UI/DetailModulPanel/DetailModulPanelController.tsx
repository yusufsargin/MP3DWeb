import React from 'react';
import './DetailModulControllerStyle.css';
import DetailModulLeftSideMenu from "./LeftSideMenu/DetailModulLeftSideMenu";
import DetailModulRightSideMenu from "./RightSideMenu/DetailModulRightSideMenu";
import DetailModul3DViewSideMenu from "./MiddleSideMenu/DetailModul3DViewSideMenu";

const DetailModulPanelController = (props: any) => {
    return (
        <div className={'main container controller'}>
            <DetailModulLeftSideMenu/>
            <DetailModul3DViewSideMenu/>
            <DetailModulRightSideMenu/>
        </div>
    );
};

export default DetailModulPanelController;
