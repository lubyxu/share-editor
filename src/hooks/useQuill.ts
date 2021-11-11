import { useEffect } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import Siderbar from '../modules/Siderbar';
import Game from '../formats/Game';
import { showModal } from '../components/GameTest';
import Icon from '../icons';
import Delta from 'quill-delta';
import Emitter from 'quill/core/emitter';
import WhaleTheme from '../theme';

Quill.register('formats/game', Game);
Quill.register('ui/icons', Icon);

Quill.register('modules/cursors', QuillCursors);
Quill.register('modules/siderbar', Siderbar);

Quill.register('themes/whale', WhaleTheme);


const useQuill = (ref) => {
    useEffect(() => {
        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider(
            'ws://localhost:1234',
            'quill-demo-2',
            ydoc
        );
        const ytext = ydoc.getText('quill');
        const editorContainer = ref.current;
        // editorContainer.setAttribute('id', 'editor');
        document.body.insertBefore(editorContainer, null);

        const editor = new Quill(editorContainer, {
            modules: {
                cursors: true,
                history: {
                    userOnly: true
                },
                siderbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'image', 'code-block', 'game']
                ]
            },
            placeholder: 'Start collaborating...',
            theme: 'whale' // or 'bubble'
        });

        const toolbar = editor.getModule('toolbar');
        toolbar.addHandler('game', async function () {
            const data = await showModal();
            // 弹窗选择图片
            let range = this.quill.getSelection(true);
            editor.updateContents(new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert({ game: data })
                  , Emitter.sources.USER);
        })

        const binding = new QuillBinding(ytext, editor, provider.awareness);
    }, []);
};

export default useQuill;
