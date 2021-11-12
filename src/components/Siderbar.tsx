import React, { useMemo, useEffect, useRef } from 'react';
import { Dropdown, Button, Menu, message } from '@whale-labs/want';
import { SettingOutlined, BoldOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import Layer from './Layer';
import menu from '../store/menu';

const { SubMenu } = Menu;


const Siderbar = (props) => {
    const { container, tooltip, menu, onFormat } = props;
    const selectedKeys = menu.selectedKeys;
    const selectedKeysRef = useRef(selectedKeys);

    const compactKeys = useMemo(() => {
        return selectedKeys.map(item => '' + item);
    }, [selectedKeys]);

    const selectedRef = useRef({});

    useEffect(() => {
        selectedKeysRef.current.forEach((key) => {
            if (key.includes('-')) {
                const [ attr, val ] = key.split('-');
                selectedRef.current[attr] = val;
            }
            else {
                selectedRef.current[key] = true;
            }
        }, {});
    }, []);

    const onDeselect = (e) => {
        const key = e.key;
        if (key.includes('-')) {
            const [attr, val] = key.split('-');
            selectedRef.current[attr] = false;
        }
        else {
            selectedRef.current[key] = false;
        }
        onFormat(selectedRef.current);
    };
    const onSelect = e => {
        const key = e.key;
        if (key.includes('-')) {
            const [attr, val] = key.split('-');
            selectedRef.current[attr] = val;
        }
        else {
            selectedRef.current[key] = true;
        }
        onFormat(selectedRef.current);
    };


    const menus = (
        <Menu selectable onSelect={onSelect} onDeselect={onDeselect} selectedKeys={compactKeys}>
            <Menu.Item key="header-1">H1</Menu.Item>
            <Menu.Item key="header-2">H2</Menu.Item>
            <Menu.Item key="header-3">H3</Menu.Item>
            <Menu.Item key="bold"><BoldOutlined /></Menu.Item>
            <Menu.Item key="image">图片</Menu.Item>
            <Menu.Item key="game">来自自定义素材</Menu.Item>
        </Menu>
    );

    return (
        <Layer container={container} visible={tooltip.visible} target={tooltip.target}>
            <Dropdown overlay={menus} placement="bottomRight">
                <Button shape="circle" size="small" icon={<UnorderedListOutlined />} />
            </Dropdown>
        </Layer>
    );
};

export default observer(Siderbar);
