import React from 'react';
import Portal from 'rc-util/es/PortalWrapper';
import Align from 'rc-align';
import Animate from 'rc-animate';


const align = {
    points: ['cc', 'cl'],
    //      target  sourcenode
    // offset: [10, 20],
    offset: [-20, 0],
    overflow: { adjustX: true, adjustY: true }
}

export default function Layer({ visible, container, children, target }) {
    return (
        <Animate showProp="show" transitionName="fade" component="span">
            <Portal
                // wrapperClassName={`whale-map-workflow-mask ${!visible ? 'whale-map-workflow-mask-hidden' : ''}`}
                visible={visible}
                getContainer={() => container || document.body}
                // @ts-ignore
                show={visible}
                key="select-panel"
            >
                {() => {
                    console.log('target :>> ', target);
                    return (
                        <Align
                            align={align}
                            // @ts-ignore
                            target={() => target}
                        >

                            <div style={{display: 'inline-block'}}>{ children }</div>
                        </Align>
                    );
                }}
            </Portal>
        </Animate>
    );
}
