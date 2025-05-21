state = []

nChannels = jsarguments[1]
i=0
while (state.length < nChannels) 
{
	state.push(0);
}



function list() {
	var a = arrayfromargs(messagename, arguments);
	for (var i = 0; i < a.length; i++) {
		if (state[i] !== a[i]) {
			state[i] = a[i];
			outlet(0,i+1,state[i])
		}
	}

}