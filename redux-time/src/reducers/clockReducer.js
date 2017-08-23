import {SYNC_DATE} from "../actions/clock"
import {parseTime} from "../utils/dates"
/*
「Reducer」は、Actionに呼応してアプリケーションの状態（state）をどのように変化させるか指定する役割を持った関数です。
受け取ったAcitonのタイプ属性を見て、対応するActionの値を用いて、Storeのsateを更新します。
*/
//初期状態も設定できる
const initialState = parseTime(new Date());
export default function clock(state = initialState, action) {
  switch ( action.type ) {
    case SYNC_DATE:
      const {hour, minutes, seconds} = action;
      return Object.assign({}, state, {
        hour, minutes, seconds
      });
    default:
      return state;
  }
}
