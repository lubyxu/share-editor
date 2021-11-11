import React from 'react';
import { Dropdown, Button, Menu, message } from '@whale-labs/want';
import { DownOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import Layer from './Layer';


const Siderbar = (props) => {
    const { container, tooltip, menus } = props;
    return (
        <Layer container={container} visible={tooltip.visible} target={tooltip.target}>
            <Dropdown overlay={menus} placement="bottomRight">
                <Button shape="circle" size="small" icon={<UnorderedListOutlined />} />
            </Dropdown>
        </Layer>
    );
};

export default observer(Siderbar);
