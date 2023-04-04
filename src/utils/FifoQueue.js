/// FIFO Que
export default class FifoQueue /* extends [] */ {
    constructor(props) {
        // super();
        this.state = {
            array: [],
            max: props.max,
            isRepeatable: props.isRepeatable ?? false   // 重複を許可するか（DEFAULTは許可しない）
        };
        // return this.state.array;
    }
    push(value) {
        // 重複を許可している場合
        if (this.state.isRepeatable) {
            // なにもしなくていい
        } else {
            // 重複を許可しない場合
            // かぶっているものがなければ
            if (this.state.array.indexOf(value) === -1) {
                // かぶっているものがなければ何もしなくていい
            } else {
                // かぶっているものがある場合
                // 配列に追加しなくてよいので何もせずに抜ける
                return;
            }
        }
        // 現在の配列に要素を追加する
        this.state.array.push(value);
        // 最大の長さを超えていた場合
        if (this.state.array.length > this.state.max) {
            // ひとつ目の要素を削除する
            this.state.array = this.state.array.slice(1);
            // console.log('FifoQueue push', this.state.array);
        }
        return;
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
