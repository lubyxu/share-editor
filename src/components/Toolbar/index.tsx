import React from 'react';
import ReactDOM from 'react-dom';
import { Menu, Dropdown } from '@whale-labs/want';
import { SettingOutlined, BoldOutlined, UnorderedListOutlined } from '@ant-design/icons'; 
import Quill from 'quill';
import { observer } from 'mobx-react';
import tooltip from '../../store/tooltip';
import menu from '../../store/menu';
import Layer from '../Layer';

const { SubMenu } = Menu;
function Toolbar({ tooltip, quill, menu, container }) {

    const handleClick = (e) => {
        const key = e.key;
        // onHandler(key);

        let [ attrName, attrVal ] = e.keyPath;


        if (e.keyPath.length === 1) {
            quill.format(key, true, Quill.sources.USER);
            return;
        }

        if (attrName !== 'other') {
            quill.format(attrName, attrVal, Quill.sources.USER);
        }
        else {
            // 应该不是这个做法
            quill.format(attrVal, true, Quill.sources.USER);
        }

    };


    return (
        <Layer container={container} visible={tooltip.visible} target={tooltip.target}>
            <Dropdown overlay={menus} placement="bottomRight">
                <Button shape="circle" size="small" icon={<UnorderedListOutlined />} />
            </Dropdown>
        </Layer>
    );
}

const ObserveToolbar = observer(Toolbar);


export default function renderToolbar(container, quill) {
    ReactDOM.render(<ObserveToolbar tooltip={tooltip} quill={quill} menu={menu} container={container} />, container);
}