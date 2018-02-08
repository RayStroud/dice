Vue.component('side-box', {
	props: ['die', 'sides', 'side', 'index'],
	template: `
		<div class="dieBox">
			<input v-model="side.value" class="value" type="text" size="3" 
				onfocus="app.adjustInputSize(this)" 
				oninput="app.adjustInputSize(this)">
			<input v-model="side.weight" class="weight" type="text" size="3" 
				onchange="if(isNaN(this.value) || this.value < 1){this.value='1'};" 
				onfocus="app.adjustInputSize(this)" 
				oninput="app.adjustInputSize(this)">
			<div>
				<button v-on:click="die.moveSideIndex(index,index-1)">&larr;</button>
				<button class="delete" v-on:click="die.removeSide(side)">&times;</button>
				<button v-on:click="die.moveSideIndex(index,index+1)">&rarr;</button>
			</div>
		</div>`
})
Vue.component('die-box', {
	props: ['roller', 'dice', 'die', 'index'],
	template: `
		<div class="diceBox">
			<input v-model="die.name" class="name" type="text" size="8"
					onfocus="app.adjustInputSize(this)" 
					oninput="app.adjustInputSize(this)">
			<div>
				<button v-on:click="roller.moveDieIndex(index,index-1);">&uarr;</button>
				<button v-on:click="roller.removeDie(die);">Delete Dice</button>
				<button v-on:click="roller.moveDieIndex(index,index+1);">&darr;</button>
				<button v-on:click="die.newSide();">Add Side</button>
			</div>
			<side-box 
				v-for="side in die.sides" 
				v-bind:die="die" 
				v-bind:sides="die.sides" 
				v-bind:side="side" 
				v-bind:index="die.sides.indexOf(side)">
			</side-box>
		</div>`
})
Vue.component('side-row', {
	props: ['die', 'sides', 'side', 'index'],
	template: `
		<tr class="dieRow">
			<td><input v-model="side.value" class="value" type="text"></td>
			<td class="weight-td"><input v-model="side.weight" class="weight" type="text"></td>
			<td><button v-on:click="die.moveSideIndex(index,index-1)">&uarr;</button></td>
			<td><button v-on:click="die.moveSideIndex(index,index+1)">&darr;</button></td>
			<td><button class="delete" v-on:click="die.removeSide(side)">&times;</button></td>
		</tr>`
})
Vue.component('die-table', {
	props: ['roller', 'dice', 'die', 'index'],
	template: `
		<table class="diceTable">
			<tr>
				<td colspan="2"><input v-model="die.name" class="name" type="text"></td>
				<td><button v-on:click="roller.moveDieIndex(index,index-1)">&uarr;</button></td>
				<td><button v-on:click="roller.moveDieIndex(index,index+1)">&darr;</button></td>
				<td><button v-on:click="roller.removeDie(die);">&times;</button></td>
			</tr>
			<tr><td colspan="5"><button v-on:click="die.newSide();">Add Side</button></td></tr>
			<side-row 
				v-for="side in die.sides" 
				v-bind:die="die" 
				v-bind:sides="die.sides" 
				v-bind:side="side" 
				v-bind:index="die.sides.indexOf(side)">
			</side-row>
		</table>`
})
Vue.component('die-roll', {
	props: ['die'],
	template: `
		<div class="rollBox">
			<div class="name">{{die.name}}</div>
			<button v-on:click="die.rollDie()">Roll</button>
			<div class="history">
				<div v-for="record in die.history.slice().reverse()">
					<span class="count">{{record.count}}:</span> {{record.roll}}</div>
			</div>
		</div>`
})