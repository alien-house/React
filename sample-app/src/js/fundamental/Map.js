import React from 'react';

export default class Map extends React.Component {
	constructor(){
		super();
		this.state = {items: []}
	}
	componentWillMount(){
	console.log("ee");
		fetch('http://swapi.co/api/people/?format=json')
			.then(response => response.json())
			.then(({results:items}) => this.setState({items}))
	}
	filter(e){
		this.setState({filter: e.target.value})
	}
	render() {
	console.log("nande");
	const numbers = [1, 2, 3, 4, 5];
	const doubled = numbers.map((number) => number * 2);
	console.log(this.state.items);
		let items = this.state.items
		if(this.state.filter){
			items = items.filter( item =>
				item.name.toLowerCase().includes(this.state.filter.toLowerCase())
			)
		}
		const Person = (props) => <h4>{props.person.name}</h4>
		return (
			<div>
				<input type="text" onChange={this.filter.bind(this)} />
				{items.map(item => <Person key={item.name} person={item} />)}
			</div>
		);
		// return (
		// 	<div>
		// 	{items.map(item => <h4 key={item.name}>{item.name}</h4>)}
		// 	</div>
		// );
	}
}





