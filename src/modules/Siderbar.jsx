import React from 'react';
import ReactDOM from 'react-dom';
import SiderbarComponent from '../components/Siderbar';

export default class Siderbar {
    static DEFAULT =  {
        containerClass: 'ql-siderbar',
    };
    constructor(quill, options) {
        this.quill = quill;
        this.options = {
            ...Siderbar.DEFAULT,
            ...options,
        };
        // this.container = document.querySelector(options);
        this._container = this.quill.addContainer(this.options.containerClass);
        quill.on(this.quill.constructor.events.SELECTION_CHANGE, this.onChange.bind(this));

        console.log('this._container :>> ', this._container);

        ReactDOM.render(<SiderbarComponent />, this._container);
    }

    onChange(range, oldRange, source) {
        console.log('source :>> ', source);
        if (!range) {
            return;
        }
        const { index, length } = range;

        const bounds = this.quill.getBounds(index);
        console.log(`bounds`, bounds);

        if (length === 0) {
        this.insert();
        }
    }

    insert() {
        // this.quill.insertEmbed(10, 'image', 'https://quilljs.com/images/cloud.png');
    }
}