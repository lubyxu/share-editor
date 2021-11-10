import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Radio, Card } from '@whale-labs/want';

const { Meta } = Card;

export default function GameTest({ defaultVisible, onCancel, onValueChange }) {
    const [ visible, setVisible ] = useState(defaultVisible);
    const [ val, setVal ] = useState();
    const onShow = () => setVisible(true);
    const onHide = () => {
        setVisible(false);
        onCancel();
    };
    const handelChange = (e) => {
        onValueChange(e.target.value);
        onHide();
    };
    return (
        <Modal title="Basic Modal" visible={visible} onOk={onShow} onCancel={onHide}>
            <Radio.Group onChange={handelChange}>
                <Radio value="https://oss-whale-peach.meetwhale.com/c53ac779-662f-4e2b-a63d-5fd351f0ef51/VPEAX_dj4bu46guc9nkv621ylom7unlzkf2pzs.jpg?x-oss-process=image/resize,m_lfit,h_640">
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://oss-whale-peach.meetwhale.com/c53ac779-662f-4e2b-a63d-5fd351f0ef51/VPEAX_dj4bu46guc9nkv621ylom7unlzkf2pzs.jpg?x-oss-process=image/resize,m_lfit,h_640" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Radio>
                <Radio value="https://oss-whale-peach.meetwhale.com/c53ac779-662f-4e2b-a63d-5fd351f0ef51/JMWYN_50mvrvptjautmvwntkaoriqy34w3csg9.jpg?x-oss-process=image/resize,m_lfit,h_640">
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://oss-whale-peach.meetwhale.com/c53ac779-662f-4e2b-a63d-5fd351f0ef51/JMWYN_50mvrvptjautmvwntkaoriqy34w3csg9.jpg?x-oss-process=image/resize,m_lfit,h_640" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Radio>
            </Radio.Group>
        </Modal>
    );
}

export function showModal() {
    return new Promise(function (res, rej) {
        const div = document.createElement('div');
        const onGameChange = (val) => res(val);
        document.body.appendChild(div);

        const onCancel = () => {
            document.body.removeChild(div);
        };

        ReactDOM.render(<GameTest defaultVisible={true} onCancel={onCancel} onValueChange={onGameChange} />, div);
    });
}