import React from 'react';
import './JSXLiveCompiler.css'
import * as Babel from 'babel-standalone'
export default class JSXLiveCompiler extends React.Component {
	constructor(){
		super();
		this.state={
			input: '/*add your jsx here*/',
			output:'',
			err:''
		}
	}
	update(e){
		let code = e.target.value;
		try {
			this.setState({
				output: Babel
				.transform(code, {presets:['es2015','react']})
				.code,
				err:''
			})
		}
		catch(err){
			this.setState({err: err.message})
		}
	}
	render() {
		return (
			<div>
				<header>{this.state.err}</header>
				<div className="container">
					<textarea onChange={this.update.bind(this)} defaultValue={this.state.input}/>
					<pre>{this.state.output}</pre>
				</div>
			</div>
		);
	}
}