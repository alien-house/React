import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
          count: null,
        };
    }
    addCounter(n) {
        this.setState({
            count: this.state.count + n
        })
    }
    render() {
        return (
            <div>
                <Counter count={this.state.count}/>
                <Plus1 onClick={() => this.addCounter(1)}/>
                <PlusForm onClick={(n) => this.addCounter(n)}/>
                <Reset onClick={() => this.setState({count: 0})}/>
            </div>
        )
    }
}
export default App;


class Counter extends Component {
    render(){
        return (
            <h1>Count = {this.props.count}</h1>
        )
    }
}

class Plus1 extends Component {
    render() {
        return(<button onClick={() => this.props.onClick(1)}>plus 1</button>)
    }
}

class PlusForm extends Component {
    constructor() {
        super();
        this.state = {
          num: null,
        };
    }
    render() {
        return (
            <div>
                <div>
                    <button onClick={() => this.props.onClick(this.state.num)}>plus {this.state.num}</button>
                    <input type="text" onChange={(ev)=>this.setState({num: parseInt(ev.target.value, 10)||0})}/>
                </div>

            </div>
        )

    }
}

class Reset extends Component {
    render() {
        return (
            <div><button onClick={this.props.onClick}>Reset</button></div>
        )
    }
}