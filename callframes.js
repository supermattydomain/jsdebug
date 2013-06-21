/**
 * Print out the stack frames above this one.
 * Will fail in the presence of mutual recursion,
 * because the 'caller' property appears to be a static
 * attribute rather than representing the function
 * one call-frame up.
 * See for example:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/caller
 */
function showCallFrames() {
	var f = showCallFrames;
	for(;;) {
	  f = f.caller;
	  if (!f) {
		  break;
	  }
	  debug(f.name);
	}
}
