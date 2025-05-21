let array = new Array();

function bang() {
	array = [];
}

function list() {
	const a = arrayfromargs(messagename, arguments);
	const node = a[0];

	const x = a[1];
	const y = a[2];
	array.push({
		x: a[1],
		y: a[2]
	});
	outlet_dictionary(0, {
		config: array
	});
}