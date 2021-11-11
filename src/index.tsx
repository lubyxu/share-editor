import React, { useRef } from 'react';
import useQuill from './hooks/useQuill';
import Siderbar from './components/Siderbar';

const ShareEditor = () => {
    const ref: any = useRef();
    useQuill(ref);

    return (
        <div>
            <div style={{marginLeft: 100, height: 400, border: '1px solid #000'}} ref={ref}></div>
        </div>
    );
};

export default ShareEditor;
