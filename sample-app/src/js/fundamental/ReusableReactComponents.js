import React from 'react';
import ReactDOM from 'react-dom';

export default class ReusableReactComponents extends React.Component {
	constructor(){
		super();
		this.state={
			red:0,
			green:0,
			blue:0
		}
		this.update = this.update.bind(this)
	}
	update(e){
		this.setState({
			red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
			green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
			blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value,
		})
	}
	render(){
		return(
			<div>
				<Slider ref="red" update={this.update} />
			</div>
		)
	}
}



