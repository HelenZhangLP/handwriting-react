
// 脱离 react redux 独立运行
import { createStore, bindActionCreators, combineReducers } from 'redux'
import React from 'react'

export default () => (
  <div>
    <button onClick={run}>Run</button>
    <p>+ 请打开控制台看运行结果</p>
  </div>
)

function run() {
  // store initialState
  const initialState = { count: 0 }
  // reducer
  const counterReducer = (state=initialState, action) => {
    switch (action.type) {
      case "PLUS_ONE":
        return { count: state.count + 1}
        break;
      case "MINUS_ONE":
        return { count: state.count - 1}
        break;
      case "CUSTOM_COUNT":
        return { count: state.count + action.payload.count }
        break;
      default:
        return state;
        break;
    }
  }

  const todoReducer = (state={flag: true}) => state
  // create store
  const store = createStore(combineReducers([
    counterReducer,
    todoReducer
  ]))

  // define action
  function plusOne() {
    return {type: "PLUS_ONE"}
  }

  plusOne = bindActionCreators(plusOne, store.dispatch)

  function minusOne() {
    return {type: "MINUS_ONE"}
  }

  function customCount(count) {
    return {
      type: 'CUSTOM_COUNT',
      payload: {count}
    }
  }

  // 监听 store 的数据变化
  store.subscribe(()=>console.log(store.getState()))
  store.dispatch(minusOne())
  store.dispatch(customCount(4))
  plusOne()
}
