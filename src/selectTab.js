
import React, { Component } from 'react'
import './assets/tab.css'
import withTimer from './hocComponent/withTimer'


function TabSelector(props) {
  const { value, options, onChange } = props
  function handleChange(event) {
    debugger
  }
  return (
    <div className="tab-selector">
      <ul>
        {
          options.map(opt => (
            <li
              key = {opt.value}
              className="tab-item"
              style={opt.value === value ? {backgroundColor: value} : {backgroundColor: 'transparent'}}
              onClick={() => {
                onChange(opt.value)
              }}>
              {opt.name}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

/**
 * 受控组件
 * value / onChange
 * 状态由外部维护
 *
 * 非受控组件
 * 表单元素状态由 DOM 自身维护
 * <input type="text" ref={node => this.input = node} />
 */

class DemoSelectTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "red"
    }
    this.options = [
      {name: "Red", value: "red"},
      {name: "Blue", value: "blue"},
      {name: "Orange", value: "orange"}
    ]

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({
      color: value
    })
  }
  render() {
    return (
      <div>
        Select color: &nbsp;&nbsp;
        <TabSelector
          options = {this.options}
          value = {this.state.color}
          onChange = {this.handleChange}
        />
        <h1>{this.props.time.toLocaleString()}</h1>
      </div>
    )
  }
}

export default withTimer(DemoSelectTab)
