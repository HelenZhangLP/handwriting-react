
// connect 连接 react 与 redux
import { connect, Provider } from 'react-redux'
import { createStore, bindActionCreators } from 'redux'
import React, { Component } from 'react'
import './assets/tab.css'

// 初始 state
const initialState = {
  count: 0
}
// 创建 reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLUS_ONE':
      return { count: state.count + 1 }
      break;
    case 'MINUS_ONE':
      return { count: state.count - 1 }
      break;
    case 'CUSTOM_COUNT':
      return { count: state.count + action.payload.count }
    default:
      return state
      break;
  }
}

// 创建 store
const store = createStore(counterReducer)

// action
function plusOneAction() {
  return {
    type: 'PLUS_ONE',
  }
}

function minusOneAction() {
  return {
    type: 'MINUS_ONE'
  }
}

function customCount() {
  return {
    type: 'CUSTOM_COUNT',
    payload: {count: 5}
  }
}

function Counter(props) {
  const { count, plusOneAction, minusOneAction } = props
  return (
    <div className="counter">
      <div onClick={plusOneAction}>plus</div>
      <span>{count}</span>
      <div onClick={minusOneAction}>minus</div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    count: state.count
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ plusOneAction, minusOneAction }, dispatch)
  }
}

const CounterConnect = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CounterConnect />
      </Provider>
    )
  }
}
