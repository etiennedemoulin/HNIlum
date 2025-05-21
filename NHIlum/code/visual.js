this.nodes = [];

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

function list() {
	const a = arrayfromargs(messagename, arguments);

	for (let i = 0; i < this.nodes.length; i++) {
		if (a[i] !== 0) {
			outlet(0, 'active', i+1, 1);
		} else {
			outlet(0, 'active', i+1, 0);
		}
	}
}