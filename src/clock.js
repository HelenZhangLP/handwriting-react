import React, {Component} from 'react'

export default class DemoClock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
    this.timer = null
  }

  // ui 渲染完后调用
  componentDidMount() {
    this.timer = setInterval(()=>{
      this.setState({
        date: new Date()
      })
    }, 1000)
  }

  componentDidUpdate() {
    console.log('this method execute after render')
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>{this.state.date.toLocaleTimeString()}</div>
    )
  }
}
