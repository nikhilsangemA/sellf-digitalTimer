// Write your code here
import {Component} from 'react'

import './index.css'

const playImg = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseImg = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
const resetImg = 'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'

class DigitalTimer extends Component {
  state = {initialVal: 25, seconds: 0, trueFalse: false}

  increasePlus = () => {
    this.setState(prevState => ({initialVal: prevState.initialVal + 1}))
  }

  decreaseMinus = () => {
    const {initialVal} = this.state
    if (initialVal > 0) {
      this.setState(prevState => ({initialVal: prevState.initialVal - 1}))
    }
  }

  changeImg = () => {
    const {trueFalse} = this.state

    if (trueFalse) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.tick, 1000)
    }

    this.setState(prevState => ({trueFalse: !prevState.trueFalse}))
  }

  tick = () => {
    this.setState(prevState => ({seconds: prevState.seconds + 1}))
  }

  resetOf = () => {
    clearInterval(this.intervalId)
    this.setState({initialVal: 25, seconds: 0, trueFalse: false})
  }

  render() {
    const {initialVal, seconds, trueFalse} = this.state
    const totalHours = initialVal * 60 - seconds
    const minutes = Math.floor(totalHours / 60)
    const second = Math.floor(totalHours % 60)
    const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSec = second > 9 ? second : `0${second}`
    const isButtonsDisabled = seconds > 0

    return (
      <div className="main-container">
        <div className="container">
          <h1>
            {stringifiedMin} : {stringifiedSec}
          </h1>
          <p>{trueFalse ? 'running' : 'paused'}</p>
        </div>
        <div className="container2">
          <button type="button" onClick={this.changeImg}>
            <img
              src={trueFalse ? pauseImg : playImg}
              alt="play icon"
              className="img-size"
            />
          </button>
          <p>{trueFalse ? 'pause' : 'start'}</p>
          <button type="button" onClick={this.resetOf}>
            <img src={resetImg} alt="pause icon" className="img-size" />
          </button>
          <p>reset</p>
        </div>
        <div className="container3">
          <button
            type="button"
            className="plusMinus"
            onClick={this.decreaseMinus}
            disabled={isButtonsDisabled}
          >
            -
          </button>
          <button type="button">{initialVal}</button>
          <button
            type="button"
            className="plusMinus"
            disabled={isButtonsDisabled}
            onClick={this.increasePlus}
          >
            +
          </button>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
