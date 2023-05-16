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

// Expected Output
// 83214765

// Event Loop execution Priority
// 1 - MicroTask Queue 1 - Callbacks via process.nextTick()
// 2 - MicroTask Queue 2 - Promises that reject or resolve
// 3 - Poll - Main application code runs here + I/O related Callbacks
// 4 - Check - Callbacks via setImmediate();
// 5 - Close - Callbacks via EventEmitter close events
// 6 - Timers - Callbacks scheduled via setTimeout() and setInterval()
// 7 - Pending - Special system events