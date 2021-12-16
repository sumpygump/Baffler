const std = require("C:/Users/robot/DEV/baffler/0.0.2/src/runtime.js")

function ifElse(paramA, paramB) {
	if (paramA > paramB) {
		std.disp("Bueno");
	} else {
		std.disp("malo");
	};
};
ifElse(-10, -20);