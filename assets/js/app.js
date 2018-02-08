var app = new Vue({
	el: '#app',
	data: {
		mode: 'setup',
		viewMode: 'box',
		roller: new Roller(),
	},
	methods: {
		adjustInputSize: function(input) {
			input.size = Math.max(input.value.length + 2, 3);
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