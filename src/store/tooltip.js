import { makeAutoObservable, autorun } from 'mobx';

function getMiddle({ top, bottom }) {
    return (bottom - top) / 2 + top;
}

class Tooltip {
    visible = false;
    position = {};
    target = null;

    constructor() {
        makeAutoObservable(this);
    }

    show() {
        this.visible = true;
    }
    hide() {
        this.visible = false;
    }
    setTarget(tar) {
        this.target = tar;
    }

    position(bound) {
        if (!bound) {
            return;
        }
        const { bottom, height, top } = bound;
        const middle = getMiddle({ top, bottom });

        return {
            top: middle,
            left: 0,
        };
    }
}

const tooltip = new Tooltip();


autorun(() => {
    console.log('i am changed', tooltip.visible);
})

export default tooltip;