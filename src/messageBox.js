import React, { Component } from 'react';
import './assets/tab.css';

export default class DemoMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
  }

  handleMessage() {
    this.setState(prev => ({
      messages: [
        `msg ${prev.messages.length}`,
        ...prev.messages
      ]
    }))
  }

  componentDidMount() {
    for(let i=0; i<20; i++) this.handleMessage();
    this.timer = setInterval(() => {
      if (this.state.messages.length > 200) {
        clearInterval(this.timer);
        return
      }
      this.handleMessage()
    }, 1000)
  }

  getSnapshotBeforeUpdate() {
    return this.refs.messageBox.scrollHeight
  }

  componentDidUpdate(preProps, prevState, prevScrollHeight) {
    const scrollTop = this.refs.messageBox.scrollTop
    if (scrollTop < 5) return
    this.refs.messageBox.scrollTop = scrollTop + (this.refs.messageBox.scrollHeight - prevScrollHeight)
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <ul className="ul-wrap" ref="messageBox">
        {
          this.state.messages.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ul>
    )
  }
}
