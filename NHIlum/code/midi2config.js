var d = new Dict("myconfig");

function fillList(list,nElements) {

	newList = [];


	for (var i = 0; i < nElements; i++) {
		newList.push({'numRadio':i+1,'midipos':0})
	}

	for (var i = 0; i < newList.length; i++) {
		indexI = i+1
		if (list[i]) {
			for (var j = 0; j < newList.length; j++) {
				var indexJ = j+1;
				if(list[i].numRadio === indexJ) {
					newList[j].numRadio = list[i].numRadio;
					newList[j].midipos = list[i].midipos;
				}
			}
		}
	}

	return newList;
}

function radioExist(radioList) {
	var radios = [];

	for (var i = 0; i < radioList.length; i++) {
		if (radioList[i] !== 0) {
			radios.push({'numRadio':radioList[i],'midipos':i+36});
			//post("numRadio: "+radioList[i]+" midipos : "+i);post();
		}
	}



	radios.sort(function(a, b) {
		return ((a.numRadio < b.numRadio) ? -1 : ((a.numRadio == b.numRadio) ? 0 : 1));
	})


	nElements = d.get("numNodes");

	radios = fillList(radios,nElements);

	return radios;
}

function bang() {
	var dmxList = []

	while (dmxList.length < 48) 
	{
	dmxList.push(0);
	}


	var json = d.stringify();
	var obj = JSON.parse(json);
	var list = obj.config;


	if (list) {
	for (var i = 0; i < list.length; i++) {
		var midi = list[i].midiNote - 36;
		//post(midi);post();
		dmxList[midi] = i+1;
		
	}
	}

	outlet(0,dmxList);

}

function list() {
	var json = d.stringify();
	var obj = JSON.parse(json);
	var list = obj.config;

	var a = arrayfromargs(messagename, arguments);

	var radios = radioExist(a);

	for (var i = 0; i < list.length; i++) {
		//post("numradio "+radios[i].numRadio);post();
		//post("midinote "+radios[i].midipos);post();
		list[i].midiNote = radios[i].midipos;
	}

	d.parse(JSON.stringify(obj));


}
