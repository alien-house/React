import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import './App.css';
import { syncDate } from  "../actions/clock";
import Clock from "../components/Clock"

class App extends Component {

  componentDidMount() {
    this.timer = setInterval(this.props.syncDate, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="warp">
        <h1>Redux Clock</h1>
        <Clock {...this.props.time} />
        <small className="copy">inspired by <a href="https://github.com/tsuyoshiwada/redux-samples/tree/gh-pages/clock" target="_blank">tsuyoshiwada/redux-samples</a></small>
      </div>
    );
  }
}

// for type validation
App.propTypes = {
  syncDate: PropTypes.func.isRequired,
  time: PropTypes.shape({
    hour: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  })
};

//それぞれStoreのstateとdispatchメソッドをpropsを通して、Container Componentで扱えるようにするものです。

//mapStateToPropsは、一枚岩のでっかいstateの中から、対象のコンポーネントに合ったプロパティを生成する為のものです。
//ここに全てのstateが表示される？なくてもいいらしい？
const mapStateToProps = (state) => {
  return {
    // propsを通して取得する際に使う名前: Storeのstateの値
    time: state.clock
  };
};
//mapDispatchToPropsは、dispatch関数を受け取ってプロパティに変換します。
//dispatchでアクションを呼び起こす。
const mapDispatchToProps = (dispatch) => {
  return {
    // propsを通して取得する際に使う名前
    syncDate: () => {
      // Storeのdispatchメソッド（引数はAction Creator）
      //状態（state）の更新を許可
      dispatch(syncDate());
    }
  };
};
//connectは、ReduxとReactのコンポーネントを繋ぎ込む為のメソッド
export default connect(mapStateToProps, mapDispatchToProps)(App);
    

    
