import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

import './App.css'

export default class AnimationExampleImporting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me']};
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {
    const Items = (props) => (
      <div key={props.key} onClick={() => this.handleRemove(this)}>
       a
      </div>
    );
    // console.log(this.state.items[0]);
    // console.log(this.state.items[0]);
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <Items key={this.state.items[0]} />
          <Items key={this.state.items[1]} />
        </CSSTransitionGroup>
      </div>
    );
  }
}