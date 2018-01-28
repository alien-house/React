import React, { Component } from 'react';
import { connect } from "react-redux";
import { addCounter, resetCounter, setButton } from "./actions/counterActions";
import './App.css';

class App extends Component {
    render() {
    console.log("props: ", this.props);
        return (
            <div>
                <Counter count={this.props.counter.count}/>
                <Plus1 onClick={this.props.addCounter}/>
                <PlusForm button={this.props.counter.button}
                     onClick={this.props.addCounter}
                     onChange={this.props.setButton}/>
                <Reset onClick={this.props.resetCounter} />
            </div>
        )
    }
}


// storeが管理するstateを props として受け取るための変換函数
function mapStateToProps(state, props) {
    return state
}

// 各コンポーネントのイベントハンドラを一括で作成するものと思えば良い
// これも props に割り当てられる
function mapDispatchToProps(dispatch, props) {
    return {
        addCounter: function(n) {
            dispatch(addCounter(n));
        },
        resetCounter: function() {
            dispatch(resetCounter());
        },
        setButton: function(n) {
            dispatch(setButton(n));
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;


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
    render() {
        return (
            <div>
                <div>
                
                    <button onClick={() => this.props.onClick(this.props.button)}>plus {this.props.button}</button>
                    <input type="text" onChange={(ev)=> this.props.onChange(parseInt(ev.target.value)||0)}/>
                
                {/*    <button onClick={() => this.props.onClick(this.state.num)}>plus {this.state.num}</button>
                    <input type="text" onChange={(ev)=>this.setState({num: parseInt(ev.target.value, 10)||0})}/>*/}
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

