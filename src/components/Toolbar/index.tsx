import React from 'react';
import { Menu } from '@whale-labs/want';
import { SettingOutlined, BoldOutlined } from '@ant-design/icons'; 
import Quill from 'quill';
import { observer } from 'mobx-react';

const { SubMenu } = Menu;
function Toolbar({ onHandler, quill, selectedKeys }) {

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


        // if (key === 'h1') {
        //     
        // }
        // else {
        //     
        // }
    };

    return (
        <Menu onClick={handleClick} selectedKeys={selectedKeys}>
            <SubMenu key="header" title="字体">
                <Menu.Item key={1} >H1</Menu.Item>
                <Menu.Item key={2} >H2</Menu.Item>
                <Menu.Item key={3} >H3</Menu.Item>
            </SubMenu>
            <Menu.Item key="bold"><BoldOutlined /></Menu.Item>
            <SubMenu key="other" icon={<SettingOutlined />} title="在下方添加">
                <Menu.Item key="image">图片</Menu.Item>
                <Menu.Item key="game">来自自定义素材</Menu.Item>
            </SubMenu>
        </Menu>
    )
}

export default observer(Toolbar);