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
}

var app = new Vue({
	el: '#app',
	data: {
		mode: 'setup',
		viewMode: 'table',
		dice: [],
		history: [],
		count: 0
	},
	methods: {
		addD6: function() {
			let d6 = new Die('d6');
			d6.addSide(new Side(1,1));
			d6.addSide(new Side(2,1));
			d6.addSide(new Side(3,1));
			d6.addSide(new Side(4,1));
			d6.addSide(new Side(5,1));
			d6.addSide(new Side(6,1));
			app.dice.push(d6);
		},
		newDie: function() {
			app.dice.push(new Die());
		},
		removeDie: function(dice, die) {
			const index = dice.indexOf(die);
			if (index != -1) {dice.splice(index, 1)};
		},
		adjustInputSize : function(input) {
			input.size = Math.max(input.value.length + 2, 3);
		},
		removeSide: function(die, side) {
			const index = die.sides.indexOf(side);
			if (index != -1) {die.sides.splice(index, 1)};
		},
		moveArrayIndex: function(array, from, to) {
			// keep 'to' and 'from' within index range
			let n = array.length;
			to = (to < 0) ? 0 : (to > n) ? n : to;
			from = from < 0 ? 0 : (from > n) ? n : from;
			array.splice(to, 0, array.splice(from, 1)[0]);
		},
		rollDice: function() {
			let rollSummary = '';
			let rollTotal = 0;
			let firstDice = true;
			app.dice.forEach(function(die) {
				die.rollDie();
				rollSummary = firstDice ? die.roll + '' : rollSummary + ', ' + die.roll;
				firstDice = false;
				rollTotal = rollTotal + parseInt(die.roll);
			});
			app.count++;
			app.history.push({count:app.count, roll:rollSummary, total:rollTotal});
		}
	}
});
let testDice = [
	{name:'d6', roll: '', history: [], sides: [
		{value:1,weight:1,selected:false},
		{value:2,weight:1,selected:false},
		{value:3,weight:1,selected:false},
		{value:4,weight:1,selected:false},
		{value:5,weight:1,selected:false},
		{value:6,weight:1,selected:false}
	]},
	{name:'fruit', roll: '', history: [], sides: [
		{value:'apples',weight:10,selected:false},
		{value:'bananas',weight:6,selected:false},
		{value:'oranges',weight:4,selected:false},
		{value:'kiwi',weight:1,selected:false}
	]}
];
app.addD6();