const std = require("C:/Users/robot/DEV/baffler/src/runtime.js")

let a = 1;
if (1 > a) {
	std.disp("yay");
} else {
	std.disp("boo");
};
function concat(stringUno, stringDos) {
	std.disp(stringUno, stringDos);
};
concat("Hello", "World");