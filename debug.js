/**
 * If true, and if unable to output debug messages unobtrusively,
 * fall back to showing such messages using alert().
 * If false, attempt to output debug messages unobtrusively,
 * or if that fails, silently throw the messages away.
 */
var showDebugAlerts = true;
var maxAlertCount = 5;
var alertCount;

/**
 * Displays a string in the 'Web Console' (not 'Error Console') in FireFox 7.0.1 {Win32|Win64|Linux}.
 * In Internet Explorer, this works only when the 'developer tools' window is open.
 * @param msg String to be displayed.
 */
function debugString(str) {
	if ("undefined" == typeof(console) || "undefined" == typeof(console.log)) {
		console = {};
		console.log = function(str) {
			if (showDebugAlerts) {
				if (alertCount++ < maxAlertCount) {
					alert(str);
				}
			} else {
				// Nowhere unobtrusive to send this string. Drop it on the floor.
			}
		};
	}
	console.log(str);
}

/**
 * Display a list of JavaScript objects of arbitrary type in the browser's debug console.
 * @param objs Any number of any type of argument - variadic.
 */
function debug() {
	var str = '';
	for (var i = 0; i < arguments.length; i++) {
		if ("string" == typeof(arguments[i])) {
			str += arguments[i];
		} else {
			// FIXME: The following hangs in IE
			// str += JSON.stringify(JSON.decycle(arguments[i]));
			str += JSON.stringify(arguments[i]);
		}
	}
	debugString(str);
}

function debugEvent(funcName, event) {
	if (event) {
		debug(funcName + ': event=' + event.type + '; target=' + event.target + '; currentTarget=' + event.currentTarget);
	} else {
		debug(funcName + ': event=null');
	}
}

$(document).ready(function() {
	alertCount = 0;
});
