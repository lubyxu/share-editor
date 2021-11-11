import React from 'react';
import ReactDOM from 'react-dom';
import Siderbar from '../components/Siderbar';
import menu from '../store/menu';
import tooltip from '../store/tooltip';

export default class SiderbarModule {
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

        ReactDOM.render(React.createElement(Siderbar, { tooltip }), this._container);
        
        // selection 改变，获取formats， 回填至 menus 中
        quill.on(this.quill.constructor.events.SELECTION_CHANGE, this.onSelectionChange.bind(this));

    }

    onSelectionChange(range, source) {
        if (!range) {
            return;
        }
        const format = this.quill.getFormat(range);

        const selectedKeys = Object.keys(format).reduce((prev, key) => {
            if (key === 'header') {
                prev.push(key);
                prev.push(format[key]);
            }
            else {
                prev.push(key);
            }
            return prev;
        }, []);

        menu.setSelectedKeys(selectedKeys);
    }
    onChange(range, oldRange, source) {
        console.log('source :>> ', source);
        if (!range) {
            return;
        }
        const { index, length } = range;

        // const bounds = this.quill.getBounds(index);
        // console.log(`bounds`, bounds);

        // if (length === 0 && source === ) {
        // this.insert();
        // }
    }

    insert() {
        // this.quill.insertEmbed(10, 'image', 'https://quilljs.com/images/cloud.png');
    }
}