import React, { Component } from 'react'
import dice from './images/icon-dice.svg';
import dividerDesktop from './images/pattern-divider-desktop.svg';
import dividerMobile from './images/pattern-divider-mobile.svg';

import './App.scss';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      advice: ""
    };
  }

  componentDidMount() {
    this.getAdvice();
  }

  getAdvice() {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then((json) => {
        this.setState({
          id: json.slip.id,
          advice: json.slip.advice
        })
      })
  }

  onGenerateAdvice = (e) => {
    e.preventDefault();
    this.getAdvice();
  }

  render() {
    return (
      <div className="App">
        <main>
          <div className="advice-wrapper">
            <div className="advice">
              <h1>ADVICE #{this.state.id ? this.state.id : 0}</h1>
              <p>{this.state.advice ? this.state.advice : "Your future is created by what you do today, not tomorrow."}</p>
              <div className="advice__divider">
                <picture>
                  <source srcSet={dividerMobile} media="(max-width: 375px)" />
                  <img src={dividerDesktop} alt="divider" />
                </picture>
              </div>
              <button onClick={this.onGenerateAdvice}>
                <img src={dice} alt="a dice" aria-hidden="true" />
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default App;
