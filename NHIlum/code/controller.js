this.nodes = [];
this.mouse = new Array(2);

outlets = 3

function msg_dictionary(data) {

	this.nodes = data.config;

	outlet(0, "nodenumber", this.nodes.length);

	for (let i = 0; i < this.nodes.length; i++) {
		if (this.nodes[i]) {
			outlet(0, "setnode", i + 1, this.nodes[i].x, this.nodes[i].y);
			this.nodes[i].active = 0;
			outlet(0, "active", i + 1, this.nodes[i].active);
		}
	}

	for (let i = 36; i < 84; i++) {
		// find corresponding dmxChannel
		const dmxChannel = this.nodes.findIndex(e => e.midiNote === i);
		outlet(1, i, dmxChannel + 1);
	}
}

function bang() {
	for (let i = 0; i < this.nodes.length; i++) {
		this.nodes[i].active = 0;
	}
	outlet(0, 'active', 0, 0);
}

// click on a node to activate
function mouseidle() {
	const a = arrayfromargs(messagename, arguments);
	this.mouse[0] = a[1];
	this.mouse[1] = a[2];
}

function _mouse() {
	for (let i = 0; i < this.nodes.length; i++) {
		const diff_x = Math.abs(this.nodes[i].x - this.mouse[0]);
		const diff_y = Math.abs(this.nodes[i].y - this.mouse[1]);
		const delta = 0.04;

		if (diff_x < delta && diff_y < delta) {
			this.nodes[i].active = 1 - this.nodes[i].active;
			outlet(0, 'active', i + 1, this.nodes[i].active);
		}
	}
}

function persistent() {
	const a = arrayfromargs(messagename, arguments);
	const i = a[1] - 1;
	if (i !== -1) {
		this.nodes[i].active = 1 - this.nodes[i].active;
		outlet(0, 'active', i+1, this.nodes[i].active);
	}
}

function flash() {
	const a = arrayfromargs(messagename, arguments);
	const i = a[1] - 1;
	const active = a[2];
	if (i !== -1) {
		this.nodes[i].active = active;
		outlet(0, 'active', i+1, this.nodes[i].active);
	}
}

function blackout() {
	for (let i = 0; i < this.nodes.length; i++) {
		this.nodes[i].active = 0;
		outlet(0, 'active', i+1, this.nodes[i].active);
	}
}

function fullon() {
	for (let i = 0; i < this.nodes.length; i++) {
		this.nodes[i].active = 1;
		outlet(0, 'active', i+1, this.nodes[i].active);
	}
}


