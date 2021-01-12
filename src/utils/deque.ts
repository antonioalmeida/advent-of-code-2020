class Deque {

    data: number[]
    private front: number
    private back: number
    private size: number

    constructor() {
        this.data = []; 
        this.front = 0;
        this.back = 1;
        this.size = 0;
    }

    addFront(value: number) {
        if (this.size >= Number.MAX_SAFE_INTEGER) throw "Deque capacity overflow";
        this.size++;
        this.front = (this.front + 1) % Number.MAX_SAFE_INTEGER;
        this.data[this.front] = value;
    }

    pickCups(current: number) {
        if (current + 3 < this.size) {
            const vals = []
            vals.push(this.removeFront())
            vals.push(this.removeFront())
            vals.push(this.removeFront())
            return vals
        }
        else {
            // size = 4; current = 2; 
            const nFront = this.size - current - 1
            const nBack = 3 - nFront

            const vals = []
            for (let i = 0; i < nFront; i++) this.removeFront()
            for (let i = 0; i < nBack; i++) this.removeBack()
            return vals
        }
    }

    removeFront() {
        if (!this.size) return;
        const value = this.peekFront();
        this.size--;
        delete this.data[this.front];
        this.front = (this.front || Number.MAX_SAFE_INTEGER) - 1;
        return value;
    }

    peekFront() {
        if (this.size) return this.data[this.front];
    }

    addBack(value) {
        if (this.size >= Number.MAX_SAFE_INTEGER) throw "Deque capacity overflow";
        this.size++;
        this.back = (this.back || Number.MAX_SAFE_INTEGER) - 1;
        this.data[this.back] = value;
    }

    removeBack() {
        if (!this.size) return;
        let value = this.peekBack();
        this.size--;
        delete this.data[this.back];
        this.back = (this.back + 1) % Number.MAX_SAFE_INTEGER;
        return value;
    }

    peekBack() {
        if (this.size) return this.data[this.back];
    }
}