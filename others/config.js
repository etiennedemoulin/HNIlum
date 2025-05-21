const file = { config:[] };
outlets = 3
// outlet 1 : dict
// outlet 2 : nodes
// outlet 3 : midi KBD

function bang() {
	outlet(1, 'setsize', -1, 0);
	outlet(1, 'setnode', 0, 0.5, 0.5);
}

// update node position (x,y)
function setnode() {
	post('setnode is called');
	// received message setnode [nodeNum] [x] [y]
	const a = arrayfromargs(messagename, arguments);
	const index = a[1] - 1;
	const x = a[2];
	const y = a[3];
	
	file.config[index] = {
		x: x, y: y, midiNote: 0
	};

	// set Max Dict
	outlet_dictionary(0, { config: file.config });
}

// update MIDI keyboard
function setkslider() {
	post("setkslider is called");
	const a = arrayfromargs(messagename, arguments);
	const midiNote = a[1];
	const dmxChannel = a[2];

	if (dmxChannel !== 0) {
		file.config[dmxChannel-1].midiNote = midiNote
		outlet_dictionary(0, { config: file.config });
	}

}

function numNodes() {
	post("numNodes is called");
	const a = arrayfromargs(messagename, arguments);

	file.config.length = a[1];
	
	// update Max Dict
	outlet(1, "nodenumber", a[1]);
	bang();
	for (let i = 36; i < 84; i++) {
		outlet(2, "setkslider", i, 0);
	}
}

// load existing config
function msg_dictionary(data) {
	post("msg_dictionary is called");

	file.config = data.config;

	outlet(1, "nodenumber", file.config.length);
	outlet(2, "numNodes", file.config.length);

	for (let k = 0; k < file.config.length; k++) {
		outlet(1, 'setnode', k + 1, file.config[k].x, file.config[k].y);
	}

	for (let i = 36; i < 84; i++) {
		// find corresponding dmxChannel
		const dmxChannel = file.config.findIndex(e => e.midiNote === i);
		outlet(2, "setkslider", i, dmxChannel + 1);
	}

}
