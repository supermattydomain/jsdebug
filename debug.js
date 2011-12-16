/**
 * Debugging output for JavaScript.
 * matthew 2011/12/2
 */

/**
 * If true, and if unable to output debug messages unobtrusively, fall back to
 * showing such messages using alert(). If false, attempt to output debug
 * messages unobtrusively, or if that fails, silently throw the messages away.
 */
var showDebugAlerts = true;
var maxAlertCount = 5;
var alertCount = 0;

/**
 * In Firefox 7.0.1 {Win32|Win64|Linux}, console.log displays any arguments in the
 * web console, JSON-encoding them as necessary.
 * In Internet Explorer, it displays in the script tab of the
 * developer tools window, but it only works when the 'developer tools' window
 * is open at the time that console.log is called.
 */
function getDebugFunc(str) {
	if ('object' == typeof(console) && 'undefined' != typeof (console.log)) {
		return console.log;
	} else if (showDebugAlerts && alertCount < maxAlertCount) {
		return function(s) {
			alert(s);
			alertCount++;
		};
	}
	return function(s) {
		// Nowhere unobtrusive to send this string. Drop it on the floor.
	};
}

function argsToString(args) {
	var str = '';
	for ( var i = 0; i < args.length; i++) {
		if ('string' == typeof (args[i])) {
			str += args[i];
		} else if ('function' == typeof (JSON.stringify)) {
			/**
			 * This either hangs, or takes impossibly long to run.
			 * Consequently, it is disabled.
			 */
			/*
			if ('function' == typeof (JSON.decycle)) {
				str += JSON.stringify(JSON.decycle(args[i]));
			} else {
				str += JSON.stringify(args[i]);
			}
			*/
			str += JSON.stringify(args[i]);
		} else {
			str += args[i];
		}
	}
	return str;
}

var debugFunc = getDebugFunc();
/**
 * Display a list of JavaScript objects of arbitrary type.
 * 
 * @param objs
 *            Any number of any type of argument - variadic.
 */
var debug = ("object" == typeof(console) && debugFunc === console.log) ? function() {
	debugFunc.apply(this, arguments);
} : function() {
	debugFunc(argsToString(arguments));
};

function debugEvent(funcName, event) {
	if (event) {
		debug(funcName + ': event=' + event.type + '; target=' + event.target
				+ '; currentTarget=' + event.currentTarget);
	} else {
		debug(funcName + ': event=null');
	}
}
