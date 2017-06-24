import React from 'react';
import ReactDOM from 'react-dom';

export default class ComponentUpdates extends React.Component {

	update(){
		ReactDOM.render(
			<ComponentUpdates val={this.props.val+1} />,
				document.getElementById('app')
		)
	}
	componentWillReceiveProps(nextProps){
		this.setState({increasing: nextProps.val > this.props.val})
	}
	shouldComponentUpdate(nextProps, nextState){
		return nextProps.val % 5 === 0;
	}
	render() {
		console.log("render");
		return (
			<button onClick={this.update.bind(this)}>{this.props.val}</button>
		);
	}
	componentDidUpdate(prevProps, prevState){
		// console.log('prevProps:'+prevProps.val)
		console.log(`prevProps:${prevProps.val}`)
	}
}
// can get a default props
ComponentUpdates.defaultProps = {val:0}
