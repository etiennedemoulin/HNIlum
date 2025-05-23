const array1 = Array(40).fill(1).map((n, i) => n + i);
const array2 = [];

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

function msg_int(n) {
	shuffle();
  for (let i = 0; i < array2.length; i++) {
    const removed = array2.pop();
    outlet(0, removed, 0);
  }
	for (let i = 0; i < n; i++) {
    array2.push(array1[i]);
		outlet(0, array1[i], 255);
	}
}
