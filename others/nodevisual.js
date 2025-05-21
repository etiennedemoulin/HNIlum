function list() {
	var a = arrayfromargs(messagename, arguments);
	for (var i = 0; i < a.length; i++) {
		if (a[i] !== 0) {
			outlet(0,"active",i+1,1)
		}
		else {
			outlet(0,"active",i+1,0)
		}
	}



}