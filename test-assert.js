ENABLE_ASSERTIONS = true;
function testAssertSuccess() {
	var i = 1;
	assert(function() { return i === 1; });
}
function testAssertFailure() {
	var j = 1;
    assert(function() { return j === 2; });
}

testAssertSuccess();
testAssertFailure();
