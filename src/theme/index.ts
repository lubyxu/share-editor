import Emitter from 'quill/core/emitter';
import { BaseTooltip } from 'quill/themes/base';
import BubbleTheme, { BubbleTooltip } from 'quill/themes/bubble';


class WhaleTooltip extends BubbleTooltip {
    constructor(quill, bounds) {
        super(quill, bounds);
        this.quill.on(
            Emitter.events.EDITOR_CHANGE,
            function (type, range, oldRange, source) { }
        )
    }
}

class WhaleTheme extends BubbleTheme {
    static DEFAULTS = {
        ...BubbleTheme.DEFAULTS,
    }
    constructor(quill, options) {
        super(quill, options);
    }

    extendToolbar()
}

