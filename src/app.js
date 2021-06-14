
// contextAPI 的使用 demo

import React, {Component} from 'react'
import './assets/tab.css'

const cnString = {
  btnName: '切换语言',
  submit: '提交',
  cancel: '取消'
}

const enString = {
  btnName: 'Switch Language',
  submit: 'Submit',
  cancel: 'Cancel'
}

const LocalContext = React.createContext(cnString)

// provider
class LocalProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: cnString
    }
  }

  handleSwitchLanguage() {
    const locale = this.state.locale === cnString ? enString : cnString
    this.setState({
      locale
    })
  }

  render() {
    return (
      <LocalContext.Provider value={this.state.locale}>
        <div className="btn" onClick={this.handleSwitchLanguage.bind(this)}>
          {this.state.locale.btnName}
        </div>
        {this.props.children}
      </LocalContext.Provider>
    )
  }
}

class LocalCustomer extends Component {
  render() {
    return (
      <LocalContext.Consumer>
        {
          (locale) => (
            <div>
              <div className="btn">{locale.submit}</div>
              <div className="btn">{locale.cancel}</div>
            </div>
          )
        }
      </LocalContext.Consumer>
    )
  }
}

export default class App extends Component {
    render() {
      return (
        <LocalProvider>
          <LocalCustomer></LocalCustomer>
        </LocalProvider>
      )
    }
}
