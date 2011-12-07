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
 * In Firefox 7.0.1 {Win32|Win64|Linux}, console.log displays a string in the
 * web console. In Internet Explorer, it displays in the script tab of the
 * developer tools window, but it only works when the 'developer tools' window
 * is open at the time that console.log is called.
 */
function debugString(str) {
	var f;
	if ('function' == typeof (console.log)) {
		f = function(s) {
			console.log(s);
		};
	} else if (showDebugAlerts) {
		f = function(s) {
			alert(s);
		};
	} else {
		f = function() {
			// Nowhere unobtrusive to send this string. Drop it on the floor.
		};
	}
	f(str);
}

/**
 * Display a list of JavaScript objects of arbitrary type.
 * 
 * @param objs
 *            Any number of any type of argument - variadic.
 */
function debug() {
	if (showDebugAlerts && alertCount > maxAlertCount) {
		return;
	}
	var str = '';
	for ( var i = 0; i < arguments.length; i++) {
		if ('string' == typeof (arguments[i])) {
			str += arguments[i];
		} else if ('function' == typeof (JSON.stringify)) {
			// FIXME: Loops in IE:
			// debugString(JSON.stringify(JSON.decycle(obj)));
			str += JSON.stringify(arguments[i]);
		} else {
			str += arguments[i];
		}
	}
	debugString(str);
	alertCount++;
}

function debugEvent(funcName, event) {
	if (event) {
		debug(funcName + ': event=' + event.type + '; target=' + event.target
				+ '; currentTarget=' + event.currentTarget);
	} else {
		debug(funcName + ': event=null');
	}
}
