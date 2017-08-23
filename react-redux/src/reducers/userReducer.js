//初期状態を設定できる
const userReducer = (state = {
  name: "Max",
  age: 27
}, action) => {
  switch (action.type){
    case "SET_NAME":
      state = {
        ...state,
        name: action.payload
      };
      // state.lastValues.push(action.payload);
      break;
    case "SET_AGE":
        state = {
          ...state,
          age: action.payload
        };
        // state.lastValues.push(action.payload);
      break;
  }
  return state;
};
export default userReducer;