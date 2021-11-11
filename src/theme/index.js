import React from 'react';
import ReactDOM from 'react-dom';
import Quill from 'quill';
import Emitter from 'quill/core/emitter';
import BubbleTheme from 'quill/themes/bubble';
import Siderbar from '../components/Siderbar';
import tooltip from '../store/tooltip';
import icons from '../icons';
import Toolbar from '../components/Toolbar';
import Theme from 'quill/core/theme';


class WhaleTooltip {
    constructor(quill) {
        this.mounted = false;
        // this.container = options.container.find('.ql-siderbar');
        this.quill = quill;

        this.target = null;
        quill.on(
            Emitter.events.SELECTION_CHANGE,
            (range, oldRange, source) => {
                const siderbar = this.quill.getModule('siderbar');
                const container = siderbar._container;
                if (!range || range.index === null) {
                    this.hide()
                    return;
                }
                const index = range.index;

                const [ line ] = this.quill.getLine(index);

                const domNode = line.domNode;
                tooltip.setTarget(domNode);
                if (!this.mounted) {
                    this.mounted = true;
                    tooltip.show();
                    
                }
                else {
                    this.show();
                }
            }
        );
    }
    show() {
        tooltip.show();
    }
    hide() {
        tooltip.hide();
    }

}


export default class WhaleTheme extends Theme {
    static DEFAULTS = {
        ...BubbleTheme.DEFAULTS,
    }
    constructor(quill, options) {
        super(quill, options);
        this.quill = quill;
        this.options = options;
        quill.on(
            Emitter.events.EDITOR_CHANGE,
            (type, range, oldRange, source) => {
                if (Emitter.sources.USER !== source || !range || range.index === null) {
                    return;
                }
                // 监听这一行的变化
                // const bounds = this.quill.getBounds(rang.index);
            }
        );
    }

    addModule(name) {
        const module = super.addModule(name);
        if (name === 'siderbar') {
          this.extendToolbar(module);
        }
        return module;
    }

    onHandler(key) {
        const toolbar = this.quill.getModule('toolbar');
        
        // toolbar.handlers[key]();

        this.quill.focus();
        const [range] = this.quill.selection.getRange();
        // if (toolbar.handlers[format] != null) {
        //     toolbar.handlers[format].call(toolbar, value);
        // } else if (
        //     this.quill.scroll.query(format).prototype instanceof EmbedBlot
        // ) {
        //     value = prompt(`Enter ${format}`); // eslint-disable-line no-alert
        //     if (!value) return;
        //     this.quill.updateContents(
        //     new Delta()
        //         .retain(range.index)
        //         .delete(range.length)
        //         .insert({ [format]: value }),
        //     Quill.sources.USER,
        //     );
        // } else {
            this.quill.format('header', false, Quill.sources.USER);
        // }
        // this.update(range);
    }

    extendToolbar(toolbar) {
        // 渲染siderbar组件
        const siderbar = this.quill.getModule('siderbar');
        
        const menus = React.createElement(Toolbar, { onHandler: this.onHandler.bind(this),  quill: this.quill })
        this.tooltip = new WhaleTooltip(this.quill, this.options);
        this.tooltip.append(menus);
        // this.siderbar.root.append(menus);
        // this.tooltip.root.appendChild(toolbar.container);
        // this.buildButtons(toolbar.container.querySelectorAll('button'), icons);
        // this.buildPickers(toolbar.container.querySelectorAll('select'), icons);
    }

}
