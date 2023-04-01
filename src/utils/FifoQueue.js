
export default class FifoQueue /* extends [] */ {
    constructor(props) {
        // super();
        this.state = {
            array: [],
            max: props.max,
            isRepeatable: props.isRepeatable ?? false
        };
        // return this.state.array;
    }
    push(value) {
        if (!this.state.isRepeatable) {
            if (this.state.array.indexOf(value) !== -1) {
                // console.log('FifoQueue Repeated');
                return;
            }
        }
        this.state.array.push(value);
        if (this.state.array.length > this.state.max) {
            // console.log('FifoQueue push', this.state.array.length, this.state.max);
            this.state.array = this.state.array.slice(1);
            // console.log('FifoQueue push', this.state.array);
        }
    }
    get() {
        return this.state.array;
    }

}

export const testFIFO = () => {
    // var fifo = new FifoQueue({ max: 3, isRepeatable: true });
    // console.log('testFIFO start', fifo.get());
    // fifo.push(1);
    // console.log('testFIFO get', fifo.get());
    // fifo.push(1);
    // console.log('testFIFO get', fifo.get());
    // fifo.push(2);
    // console.log('testFIFO get', fifo.get());
    // fifo.push(3);
    // console.log('testFIFO get', fifo.get());
    // fifo.push(4);
    // console.log('testFIFO end', fifo.get());

    var fifoStr = new FifoQueue({ max: 3, isRepeatable: true });
    console.log('testFIFO start', fifoStr.get());
    fifoStr.push("1");
    console.log('testFIFO get', fifoStr.get());
    fifoStr.push("1");
    console.log('testFIFO get', fifoStr.get());
    fifoStr.push("2");
    console.log('testFIFO get', fifoStr.get());
    fifoStr.push("3");
    console.log('testFIFO get', fifoStr.get());
    fifoStr.push("4");
    console.log('testFIFO end', fifoStr.get());
}
