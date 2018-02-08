class Side {
	constructor(value = '?', weight = 1) {
		this.value = value;
		this.weight = weight;
	}
}
class Die {
	constructor(name = 'name') {
		this.name = name;
		this.sides = [];
		this.roll = null;
		this.count = 0;
		this.history = [];
	}
	newSide() {
		this.sides.push(new Side());
	}
	addSide(side) {
		this.sides.push(side);
	}
	removeSide(side) {
		const index = this.sides.indexOf(side);
		if (index != -1) {this.sides.splice(index, 1)};
	}
	moveSideIndex(from, to) {
		// keep 'to' and 'from' within index range
		let n = this.sides.length;
		to = (to < 0) ? 0 : (to > n) ? n : to;
		from = from < 0 ? 0 : (from > n) ? n : from;
		this.sides.splice(to, 0, this.sides.splice(from, 1)[0]);
	}
	rollDie() {
		// get sum of all weights
		let sum = 0;
		for (let i=0, n=this.sides.length; i<n; i++) {
			sum += parseInt(this.sides[i].weight);
		}

		// get random number up to sum
		let random = Math.floor(Math.random() * sum);

		// find which weighted side corresponds to roll
		let value = '';
		let min = 0; // min of range that corrresponds to first array item
		for (let i=0, n=this.sides.length; i<n; i++) {
			// max of range that corresponds to current array item
			let max = min + parseInt(this.sides[i].weight);

			// check if random number is in range of weighted array item
			if (random < max) {
				value = this.sides[i].value;
				break;
			}
			// adjust the min for range of next item
			else {
				min = max;
			}
		}
		this.roll = value;
		this.count++;
		this.history.push({count:this.count,roll:this.roll});
	}
	clearHistory() {
		this.count = 0;
		this.history = [];
	}
}
class Roller {
	constructor() {
		this.dice = [];
		this.count = 0;
		this.history = [];
		this.addD6();
	}
	addD6() {
		let d6 = new Die('d6');
		d6.addSide(new Side(1,1));
		d6.addSide(new Side(2,1));
		d6.addSide(new Side(3,1));
		d6.addSide(new Side(4,1));
		d6.addSide(new Side(5,1));
		d6.addSide(new Side(6,1));
		this.dice.push(d6);
	}
	newDie() {
		this.dice.push(new Die());
	}
	removeDie(die) {
		const index = this.dice.indexOf(die);
		if (index != -1) {this.dice.splice(index, 1)};
	}
	moveDieIndex(from, to) {
		// keep 'to' and 'from' within index range
		let n = this.dice.length;
		to = (to < 0) ? 0 : (to > n) ? n : to;
		from = from < 0 ? 0 : (from > n) ? n : from;
		this.dice.splice(to, 0, this.dice.splice(from, 1)[0]);
	}
	rollDice() {
		let rollSummary = '';
		let rollTotal = 0;
		let firstDice = true;
		this.dice.forEach(function(die) {
			die.rollDie();
			rollSummary = firstDice ? die.roll + '' : rollSummary + ', ' + die.roll;
			firstDice = false;
			rollTotal = rollTotal + parseInt(die.roll);
		});
		this.count++;
		this.history.push({count:this.count, roll:rollSummary, total:rollTotal});
	}
	clearHistory() {
		this.count = 0;
		this.history = [];
		this.dice.forEach(function(die) {
			die.clearHistory();
		});
	}
}