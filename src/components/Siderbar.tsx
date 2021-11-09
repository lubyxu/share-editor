import React from 'react';
import Align from 'rc-align';

const alignConfig = {
    points: ['tl', 'tr'],        // align top left point of sourceNode with top right point of targetNode
    offset: [10, 20],            // the offset sourceNode by 10px in x and 20px in y,
    targetOffset: ['30%','40%'], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
    overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
};

const target = () => {
    return window;
};

const Siderbar = () => {

    return (
        <button>插入自定义</button>
    );

    return (
        <Align align={alignConfig} target={target}>
            <div className="aksldfjakljfkakfjads"> test </div>
        </Align>
    );
};

export default Siderbar;
