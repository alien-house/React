import React from 'react';
/*
What is Higher Order Components?
	Higher Order Componentとは、単に他のコンポーネントをラップするReactコンポーネントのことです。
	//https://facebook.github.io/react/docs/higher-order-components.html
*/
const HOC = (InnerComponent) => class extends React.Component {
	constructor(){
		super();
		this.state = {count:0}
	}
	update(){
		this.setState({count: this.state.count + 1})
	}
	componentWillMount(){
		console.log(this.state+' will mount')
	}
	render(){
		return (
			<InnerComponent 
				{...this.props}
				{...this.state}
				update={this.update.bind(this)}
			/>
		)
	}
}

class ComponentHigherOrder extends React.Component {
	render(){
		return (
			<div>
				<Button>button</Button>
				<hr />
				<LabelHOC>label</LabelHOC>
			</div>
		)
	}
}

const Button = HOC((props) => 
	<button onClick={props.update}>{props.children}-{props.count}</button>
)

class Label extends React.Component{
	componentWillMount(){
		console.log('label will mount')
	}
	render(){
		return (
			<label onMouseMove={this.props.update}>
			{this.props.children}-{this.props.count}
			</label>
		)
	}
}
const LabelHOC = HOC(Label)
export default ComponentHigherOrder