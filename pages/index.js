import React from 'react'
import 'isomorphic-fetch'

export default class CryptoPrice extends React.Component {
  static async getInitialProps () {
    const res = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD')
    const json = await res.json()
    return {
      btc: json.BTC.USD,
      eth: json.ETH.USD,
      show: 'eth'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      btc: this.props.btc,
      eth: this.props.eth,
      show: 'eth'
    }
  }

  componentDidMount() {
    setInterval(this.update.bind(this), 5000)
  }

  show(type) {
    this.setState({show: type})
  }

  async update() {
    const res = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD')
    const json = await res.json()
    this.setState({
      btc: json.BTC.USD,
      eth: json.ETH.USD
    })
  }

  render () {
    return (
      <div className="canvas">
        <ul className="nav">
          <li className="nav__item">
            <a
              className={this.state.show === 'btc' ? 'nav__link nav__link--active' : 'nav__link'}
              onClick={e => { e.preventDefault(); this.show('btc') }} href="#">
              Bitcoin
            </a>
          </li>
          <li className="nav__item">
            <a
              className={this.state.show === 'eth' ? 'nav__link nav__link--active' : 'nav__link'}
              onClick={e => { e.preventDefault(); this.show('eth') }} href="#">
              Ethereum
            </a>
          </li>
        </ul>
        <h1
          className="price"
          style={{display: (this.state.show === 'btc' ? 'flex' : 'none')}}>
          ${this.state.btc}
        </h1>
        <h1
          className="price"
          style={{display: (this.state.show === 'eth' ? 'flex' : 'none')}}>
          ${this.state.eth}
        </h1>
      </div>
    )
  }
}
