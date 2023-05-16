/*
const fs = require("fs");

setImmediate(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
fs.readFile('./README.md', () => {
    console.log(4);
    setTimeout(() => console.log(5));
    setImmediate(() => console.log(6));
    process.nextTick(() => console.log(7));
});
console.log(8);
*/

// Expected Output
// 8 3 2 1 4 7 6 5

// Event Loop execution Priority
// 1 - MicroTask Queue 1 - Callbacks via process.nextTick()
// 2 - MicroTask Queue 2 - Promises that reject or resolve
// 3 - Poll - Main application code runs here + I/O related Callbacks
// 4 - Check - Callbacks via setImmediate();
// 5 - Close - Callbacks via EventEmitter close events
// 6 - Timers - Callbacks scheduled via setTimeout() and setInterval()
// 7 - Pending - Special system events

const sleep_st = (t) => new Promise((r) => setTimeout(r, t));
const sleep_im = () => new Promise((r) => setImmediate(r));

(async () => {
    setImmediate(() => console.log(9));
    console.log(10);
    await sleep_st(0);
    setImmediate(() => console.log(11));
    console.log(12);
    await sleep_im();
    setImmediate(() => console.log(13));
    console.log(14);
    await 1;
    setImmediate(() => console.log(7));
    console.log(8);
})();

// Expected Output
// 10 12 9 11 14 8 13 7