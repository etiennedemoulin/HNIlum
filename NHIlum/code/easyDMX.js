//outlets = 2

nChannels = jsarguments[1];



baseList = []
while (baseList.length < nChannels) 
{
	baseList.push(0);
}

priority = []
while (priority.length < nChannels)
{
	priority.push(0);
}	

//function trame(l) {
//	var size = l.length+1
//	outlet(0,126,6,size,0,0,l,231)
//	outlet(1,l)
//}


function list() 
{
	var a = arrayfromargs(messagename, arguments);	
	dmxAddress = a[0] - 1;
	dmxValue = a[1];
	dmxPriority = a[2];




	if (dmxPriority) {

	//on écrase la valeur si la priorité est supérieure ou égale, si la valeur est nulle on reset la priorité
		if (dmxPriority >= priority[dmxAddress]) {
			baseList[dmxAddress] = dmxValue;

			if (dmxValue !== 0) {
				priority[dmxAddress] = dmxPriority;
			}
			else {
				priority[dmxAddress] = 0;
			}

			outlet(0, baseList);
		}
	}

	else {
		baseList[dmxAddress] = dmxValue;
		priority[dmxAddress] = 0;
		outlet(0, baseList);
	}

}


function blackout()
{
	baseList = []
	priority = []

	while (priority.length < nChannels)
	{
	priority.push(0);
	}	
	
	while (baseList.length < nChannels) 
	{
	baseList.push(0);
	}
	outlet(0, baseList)

}

function fullon()
{
	baseList = []
	while (baseList.length < nChannels) 
	{
	baseList.push(255);
	}
	outlet(0, baseList)

}