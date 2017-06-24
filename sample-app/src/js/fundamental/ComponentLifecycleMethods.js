import React from 'react';
import ReactDOM from 'react-dom';

class ComponentLifecycleMethods extends React.Component {

	constructor(){
		super();
		this.state = {val: 0}
		// This binding is necessary to make `this` work in the callback
		this.update = this.update.bind(this)
	}
	update(event){
		this.setState({val:this.state.val + 1})
	}
	render() {
		console.log("render");
		return (
			<button onClick={this.update}>{this.state.val * this.state.m}</button>
		);
	}
	componentWillMount(){
		console.log('componentWillMount')
		this.setState({m:2})
	}
	componentDidMount(){
		console.log('componentDidMount')
	}
	componentWillUnmount(){
		console.log('componentWillUnmount')
	}
}

class Wrapper extends React.Component{
	mount(){
		ReactDOM.render(<ComponentLifecycleMethods />, document.getElementById('a'))
	}
	unmount(){
		ReactDOM.unmountComponentAtNode(document.getElementById('a'))
	}
	render(){
		return(
			<div>
				<button onClick={this.mount.bind(this)}>Mount</button>
				<button onClick={this.unmount.bind(this)}>UnMount</button>
				<div id="a"></div>
			</div>
		)
	}
}
export default Wrapper
