import { useEffect } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import Siderbar from '../modules/Siderbar';
import Game from '../modules/Game';
import Icon from '../icons';
import Delta from 'quill-delta';
import Emitter from 'quill/core/emitter';

Quill.register('formats/game', Game);
Quill.register('ui/icons', Icon);

Quill.register('modules/cursors', QuillCursors);
Quill.register('modules/siderbar', Siderbar);


const useQuill = (ref) => {
    useEffect(() => {
        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider(
            'ws://localhost:1234',
            'quill-demo-2',
            ydoc
        );
        const ytext = ydoc.getText('quill');
        console.log(`ref.current`, ref.current)
        const editorContainer = ref.current;
        // editorContainer.setAttribute('id', 'editor');
        document.body.insertBefore(editorContainer, null);

        const editor = new Quill(editorContainer, {
            modules: {
                cursors: true,
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block', 'game']
                ],
                history: {
                    userOnly: true
                },
                siderbar: {}
            },
            placeholder: 'Start collaborating...',
            theme: 'snow' // or 'bubble'
        });

        const toolbar = editor.getModule('toolbar');
        toolbar.addHandler('game', function () {
            // 弹窗选择图片
            let range = this.quill.getSelection(true);
            editor.updateContents(new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert('hello')
                  , Emitter.sources.USER);
        })

        const binding = new QuillBinding(ytext, editor, provider.awareness);
    }, []);
};

export default useQuill;
