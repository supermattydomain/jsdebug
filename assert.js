function assert(func) {
	var name;
	if (typeof(ENABLE_ASSERTIONS) !== "undefined" && !ENABLE_ASSERTIONS) {
		return;
	}
	name = arguments.callee.caller;
	name = name ? name.name : "(toplevel)";
	if (!func()) {
		throw name + ": assertion failed: " + ('' + func).replace(/function[^(]*\([^)]*\)[^{]*{[^r]*return[ \t\n]*/, '').replace(/[ \t\n]*;[ \t\n]*}[ \t\n]*$/, '');
	}
}
