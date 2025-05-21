outlets = 3;

let file = [];

let temp = [];

function bang() {
	outlet_dictionary(0, { config: temp });
}

function init(size) {
	outlet(1, 'setsize', -1, 0);
	outlet(1, 'setnode', 0, 0.5, 0.5);
	outlet(1, 'nodenumber', size);
	outlet(2, 'numNodes', size);
	file = new Array(size);
	temp = new Array(size);

	for (let i = 36; i < 84; i++) {
		outlet(2, "setkslider", i, 0);
	}
}

function updatenode() {
	const a = arrayfromargs(messagename, arguments);
	const index = a[1] - 1;
	const x = a[2];
	const y = a[3];

	temp[index] = {
		x: x,
		y: y,
		midiNote: 0
	};
}

// update MIDI keyboard
function updatekslider() {
	const a = arrayfromargs(messagename, arguments);
	const index = a[2] - 1;
	const midiNote = a[1];

	if (index !== -1) {
		temp[index].midiNote = midiNote;
	}

}

function numNodes() {
	const a = arrayfromargs(messagename, arguments);
	init(a[1]);
}

function msg_dictionary(dict) {

	init(dict.config.length);

	file = dict.config;

	for (let i = 0; i < file.length; i++) {
		outlet(1, 'setnode', i+1, file[i].x, file[i].y);
	}

	for (let i = 36; i < 84; i++) {
		const dmxChannel = file.findIndex(e => e.midiNote === i);
		outlet(2, 'setkslider', i, dmxChannel + 1);
	}
}