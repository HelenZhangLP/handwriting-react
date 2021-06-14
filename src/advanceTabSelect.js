
import React, { PureComponent, Component } from "react";
import './assets/tab.css';

class AdvanceTabSelect extends PureComponent {
  render() {
    const {options, value, onChange} = this.props

    return (
      <div>
        <ul>
          {options.map(opt => (
            <li
              key={opt.value}
              className={`tab-item ${opt.value===value ? "selected" : ""}`}
              onClick={() => {onChange(opt.value)}}>
              {opt.name}
              </li>
          ))}
        </ul>
        {console.log(this.props.children)}
        {value && this.props.children(value)}
      </div>
    )
  }
}

const options = [
  {name: 'Red', value: 'red'},
  {name: 'Pink', value: 'pink'},
  {name: 'Yellow', value: 'yellow'}
]

export default class AdvanceTabSelectDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: null
    }
  }

  handleChange = (color) => {
    this.setState({
      color
    })
  }

  render() {
    return (
      <div>
        <h3>select color</h3>
        <AdvanceTabSelect
          value={this.state.color}
          options={options}
          onChange={this.handleChange}>
          {
            (color) => <div style={{width: '100px', height: '100px', backgroundColor: color}}></div>
          }
        </AdvanceTabSelect>
      </div>
    )
  }
}
