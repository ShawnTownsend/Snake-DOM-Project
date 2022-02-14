import k from './kaboom.js'

export default function link () {
    let segment;
    let prevPosition = k.vec2(0, 0);
    let isNew = true;

    return {
        add () {
            prevPosition.x = this.pos.x;
            prevPosition.y = this.pos.y;
        },
        getSegment () {
            return segment;
        },
        setSegment (s) {
            segment = s; 
        },
        moveUpdate (x, y) {
            const pos = prevPosition.clone();
            prevPosition.x = x;
            prevPosition.y = y;
            
            this.pos.x = pos.x;
            this.pos.y = pos.y;

            isNew = false;

            if (!segment) return;

            segment.moveUpdate(pos.x, pos.y);
        },

        isNew () {
            return isNew;
        }
    }
}