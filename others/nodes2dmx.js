function onoff(a) {
	if (a!==0) {
		return 255;
	}
	else {
		return 0;
	}
}


function list() {
	var a = arrayfromargs(messagename, arguments);
	for (var i=0; i<a.length; i++) {
		var value = onoff(a[i]);
		outlet(0,i+1,value,1);
	}
}