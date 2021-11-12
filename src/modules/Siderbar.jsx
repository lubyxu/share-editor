import Quill from 'quill';
import React from 'react';
import ReactDOM from 'react-dom';
import SiderbarComponent from '../components/Siderbar';
import menu from '../store/menu';
import tooltip from '../store/tooltip';

export default class SiderbarModule {
    static DEFAULT =  {
        containerClass: 'ql-siderbar',
    };
    constructor(quill, options) {
        this.quill = quill;
        this.options = {
            ...SiderbarModule.DEFAULT,
            ...options,
        };
        this._container = this.quill.addContainer(this.options.containerClass);
        this._container.setAttribute('id', 'js-ql-siderbar');

        ReactDOM.render(React.createElement(SiderbarComponent, { tooltip, menu, container: this._container, onFormat: this.onFormat.bind(this) }), this._container);
        
        // selection 改变，获取formats， 回填至 menus 中
        quill.on(this.quill.constructor.events.SELECTION_CHANGE, this.onSelectionChange.bind(this));

    }

    update(range) {
        if (!range) {
            return;
        }
        const format = this.quill.getFormat(range);
        const selectedKeys = Object.keys(format).reduce((prev, key) => {
            if (key === 'header') {
                prev.push('header-' + format[key]);
            }
            else {
                prev.push(key);
            }
            return prev;
        }, []);

        menu.setSelectedKeys(selectedKeys);
    }

    onFormat1(attr, val) {
        this.quill.format(attr, val, Quill.sources.USER);
    }

    // selectedKeys 可能是 header-1, 也可能是blod。 image
    onFormat(formatsMap) {
        const toolbar = this.quill.getModule('toolbar');

        console.log('formatsMap :>> ', formatsMap);
        for (let format in formatsMap) {
            if (toolbar.handlers[format]) {
                toolbar.handlers[format].call(toolbar, formatsMap[format], Quill.sources.USER);
            }
            else {
                this.quill.format(format, formatsMap[format], Quill.sources.USER);
            }
        }
    }

    updateContent(attr, val) {
        const toolbar = this.quill.getModule('toolbar');
        toolbar.handlers[attr].call(toolbar, val);
    }

    onSelectionChange(range, source) {
        if (!range || range.index === null) {
            tooltip.hide()
            return;
        }
        const index = range.index;
        const [ line ] = this.quill.getLine(index);
        const domNode = line.domNode;
        tooltip.setTarget(domNode);

        this.update(range);
        tooltip.show();
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