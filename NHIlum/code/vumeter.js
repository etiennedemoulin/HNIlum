const array1 = Array(40).fill(1).map((n, i) => n + i);
const array2 = [];
// outlets=2

function shuffle() {
	const array = array1;
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function routine1(dep, arr) {
	for (let i = dep; i < arr; i++) {
		array2.push(array1[i]);
		outlet(0, array1[i], 255);
	}
	// outlet_dictionary(1, {array1: array1, array2: array2});
} 

function routine2(dep, arr) {
	for (let i = dep; i < arr; i++) {
		const removed = array2.pop();
		outlet(0, removed, 0);
	}
	// outlet_dictionary(1, {array1: array1, array2: array2});
}

const a = 6;

function step1(d) {
	if (d === 1) {
		routine1(0, 1*a);
	} else {
		routine2(0, 1*a);
	}
}

function step2(d) {
	if (d === 1) {
		routine1(1*a, 2*a);
	} else {
		routine2(1*a, 2*a);
	}
}

function step3(d) {
	if (d === 1) {
		routine1(2*a, 3*a);
	} else {
		routine2(2*a, 3*a);
	}
}

function step4(d) {
	if (d === 1) {
		routine1(3*a, 4*a);
	} else {
		routine2(3*a, 4*a);
	}
}

function step5(d) {
	if (d === 1) {
		routine1(4*a, 5*a);
	} else {
		routine2(4*a, 5*a);
	}
}

function step6(d) {
	if (d === 1) {
		routine1(5*a, 6*a);
	} else {
		routine2(5*a, 6*a);
	}
}

function step7(d) {
	if (d === 1) {
		routine1(6*a, array1.length);
	} else {
		routine2(6*a, array1.length);
	}
}
