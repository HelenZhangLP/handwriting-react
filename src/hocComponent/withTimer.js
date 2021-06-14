
import React, { Component } from 'react'
// 使用高阶组件封装已有组件，形成新组件

export default function withTimer(WrappedComponent) {
  return class extends Component {
    state = { time: new Date() }
    componentDidMount() {
      this.timer = setInterval(()=>{this.tick()}, 1000)
    }
    tick() {
      this.setState({
        time: new Date()
      })
    }
    componentWillUnmount() {
      clearInterval(this.timer)
    }
    render() {
      return <WrappedComponent time={this.state.time} {...this.props} />
    }
  }
}
