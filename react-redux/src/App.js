import Main from './components/Main';
import User from './components/User';

import React, { Component } from 'react';
import { connect } from "react-redux";
import { setName } from "./actions/userActions";

class App extends Component {
  render() {
    console.log("props: ", this.props);
    return (
      <div className="App">
        <Main changeUsername={() => this.props.setName("Anna")} />
        <User username={this.props.user.name} />
      </div>
    );
  }
}
//mapStateToPropsは、一枚岩のでっかいstateの中から、対象のコンポーネントに合ったプロパティを生成する為のものです。
const mapStateToProps = (state) => {
  return {
    user: state.user,
    math: state.math
  };
};
//mapDispatchToPropsは、dispatch関数を受け取ってプロパティに変換します。
//dispatchでアクションを呼び起こす
const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
      dispatch(setName(name));
    }
  };
};
//connectは、ReduxとReactのコンポーネントを繋ぎ込む為のメソッドです。
export default connect(mapStateToProps, mapDispatchToProps)(App);
