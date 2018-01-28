import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import store from "./store";
// ここで返されるオブジェクトが状態の変更を表すアクションになる
// type が操作の内容 payload がパラメータ
// reduxのアクションはどう書いても良いのだが FSA という標準が提案されている。




// store が状態を管理するオブジェクトになる
// const store = createStore(reducer);

// connect函数で元のReactのコンポーネントをreduxに対応したものに変換する
// 元の変数に代入しているのが気持ち悪ければ適当に変更する
// const App2 = connect(mapStateToProps,mapDispatchToProps)(App)





ReactDOM.render(
	<Provider store={store}>
        <App/>
    </Provider>,
     document.getElementById('root'));
// registerServiceWorker();



