module.exports = { disp, add, sub, mul, div, mod, abs, pow , eq}

function disp(...args){ console.log(...args); }
function add(...args) { return args.reduce((sum, num) => sum + num, 0); }
function sub(x, y){ return x-y; }
function mul(...args){return args.reduce((sum, num) => sum * num, 1); }
function div(x, y){ return x/y; }
function mod(x, y){ return x % y }
function abs(n){ return Math.abs(n); }
function pow(n, m){ return Math.pow }
function eq(a, b){ return a == b}