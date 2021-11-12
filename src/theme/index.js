import React from 'react';
import ReactDOM from 'react-dom';
import Quill from 'quill';
import extend from 'extend';
import Delta from 'quill-delta';
import Emitter from 'quill/core/emitter';
import BubbleTheme from 'quill/themes/bubble';
import BaseTheme from 'quill/themes/base';
import Siderbar from '../components/Siderbar';
import tooltip from '../store/tooltip';
import icons from '../icons';
import Toolbar from '../components/Toolbar';
import { showModal } from '../components/GameTest';

// class WhaleTooltip {
//     constructor(quill, options) {
//         this.mounted = false;
//         // this.container = options.container.find('.ql-siderbar');
//         this.quill = quill;

//         this.target = null;
//         quill.on(
//             Emitter.events.SELECTION_CHANGE,
//             (type, range, oldRange, source) => {
//                 const siderbar = this.quill.getModule('siderbar');
//                 console.log('-----------------------')
//                 const container = siderbar._container;
//                 if (!range || range.index === null) {
//                     this.hide()
//                     return;
//                 }
//                 const index = range.index;

//                 console.log(`range`, range)
//                 const [ line ] = this.quill.getLine(index);

//                 const domNode = line.domNode;
//                 tooltip.setTarget(domNode);
//                 if (!this.mounted) {
//                     this.mounted = true;
//                     tooltip.show();
//                     ReactDOM.render(React.createElement(Siderbar, { tooltip, menus: options.menus }), container);
//                 }
//                 else {
//                     this.show();
//                 }
//             }
//         );
//     }
//     show() {
//         tooltip.show();
//     }
//     hide() {
//         tooltip.hide();
//     }
// }


export default class WhaleTheme extends BaseTheme {
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

    extendToolbar(toolbar) {}

}

WhaleTheme.DEFAULTS = {
    ...BaseTheme.DEFAULTS,
    modules: {
        ...BaseTheme.DEFAULTS.modules,
        toolbar: {
            ...BaseTheme.DEFAULTS.modules.toolbar,
            handlers: {
                ...BaseTheme.DEFAULTS.modules.toolbar.handlers,
                game: async function () {
                    const data = await showModal();
                    // 弹窗选择图片
                    let range = this.quill.getSelection(true);
                    this.quill.updateContents(new Delta()
                            .retain(range.index)
                            .delete(range.length)
                            .insert({ game: data })
                            .retain(1)
                        , Emitter.sources.USER);
                },
            }
        }
    }
};

// WhaleTheme.DEFAULTS = extend({}, BaseTheme.DEFAULTS, {
//     modules: {
//       toolbar: {
//         handlers: {
//           async game() {
//             const data = await showModal();
//             // 弹窗选择图片
//             let range = this.quill.getSelection(true);
//             this.quill.updateContents(new Delta()
//                     .retain(range.index)
//                     .delete(range.length)
//                     .insert({ game: data })
//                   , Emitter.sources.USER);
//           },
//         },
//       },
//     },
//   });