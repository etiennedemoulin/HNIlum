outlets = 2;

var data = {
	numNodes:40,
	config:[],
};

var d = new Dict("myconfig");


function setnode() {
	var a = arrayfromargs(messagename, arguments);
	var index = a[1] - 1;
	var x = a[2];
	var y = a[3]; 
	//data.config = [];

	var pos = { x: x, y: y, midiNote:0};

	if (data.config[index]) {
			data.config[index] = pos;
	}
	else {
			data.config.push(pos);
	}


	d.parse(JSON.stringify(data))

	outlet(1,"record","bang");

}


function numNodes() {
	var a = arrayfromargs(messagename, arguments);
	data.numNodes = a[1];

	d.parse(JSON.stringify(data))

}

function bang() {
	var json = d.stringify();
	var obj = JSON.parse(json);
	var list = obj.config;
	if (list) {
		for (var i = 0; i < list.length; i++) {
			var x = list[i].x;
			var y = list[i].y;
			var number = i+1;
			outlet(0,"setnode",number,x,y)
		}
		outlet(1,"update","bang");
	}
}