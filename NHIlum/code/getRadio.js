var d = new Dict("myconfig");


function msg_int() {
	var a = arrayfromargs(messagename, arguments);

	var json = d.stringify();
	var obj = JSON.parse(json);
	var list = obj.config;

	for (var i = 0; i < list.length; i++) {
		//post(list[i].midiNote);post()
		switch (Number(a)) {
			case list[i].midiNote:
				outlet(0,i+1);
				break;
			default : 
				break;
		}
	}
}