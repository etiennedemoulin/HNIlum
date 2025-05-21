nodeState = [];

mouseState = [];

//messnamed("manual_init","bang")

d = new Dict('myconfig');

function update() {
	nodeState = [];
	var json = d.stringify();
	var obj = JSON.parse(json);
	var list = obj.config;
	for (var i = 0; i < list.length; i++) {
		nodeState.push({'number':i+1,'posX':list[i].x,'posY':list[i].y,'active':0}) 
	}
	outlet(0,"active",0,0);
}

//function node() {
//	var a = arrayfromargs(messagename, arguments);
//	nodeState.push({'number':a[1],'posX':a[2],'posY':a[3],'radius':a[4],'active':a[5]}) 
//}


function bang() {
	for (var i = 0; i < nodeState.length; i++) {
		nodeState[i].active = 0;
		//outlet(1,nodeState[i].number,0);
	}
	outlet(0,"active",0,0)
}

function fullon() {
	for (var i = 0; i < nodeState.length; i++) {
		nodeState[i].active = 1;
		//outlet(1,nodeState[i].number, 127);
	}
	outlet(0,"active",0,1)
}


function mouseidle() {
	var a = arrayfromargs(messagename, arguments);
	mouseState[0] = a[1]
	mouseState[1] = a[2]
}

function mouse() {
	var i = 0;
	if (nodeState.length === 40) {

	for (var i = 0; i < nodeState.length; i++) {
		var diffX = Math.abs(nodeState[i].posX - mouseState[0])
		var diffY = Math.abs(nodeState[i].posY - mouseState[1])
		var delta = 0.04
		if (diffX < delta && diffY < delta ) {
			nodeState[i].active = 1 - nodeState[i].active;
			outlet(0,"active",nodeState[i].number,nodeState[i].active)
			//outlet(1,nodeState[i].number,nodeState[i].active*127);
			//post("j'ai cliqué sur "+nodeState[i].active);
		}
	}

	}



	//outlet(0,"active",nodeNumber,0ou1)
}


function active() {
	var a = arrayfromargs(messagename, arguments);
	var i = a[1] - 1;
	nodeState[i].active = a[2];
}

function midi() {
	var a = arrayfromargs(messagename, arguments);
	var midiNoteIndex = a[1] - 1;
	nodeState[midiNoteIndex].active = 1 - nodeState[midiNoteIndex].active;
	outlet(0,"active",nodeState[midiNoteIndex].number,nodeState[midiNoteIndex].active)
	//outlet(1,nodeState[midiNoteIndex].number,nodeState[midiNoteIndex].active*127);

}

function event() {
	var a = arrayfromargs(messagename, arguments);
	var index = a[1] - 1
	var activeState = a[2] //0 ou 1
	nodeState[index].active = activeState;
	outlet(0,"active",nodeState[index].number, nodeState[index].active)
	//outlet(1,nodeState[index].number,nodeState[index].active*127)

}

//index 30 = node 31