import React from 'react'
import formatCurrency from 'format-currency'
import cookies from 'next-cookies'
import 'isomorphic-fetch'

export default class CryptoPrice extends React.Component {
  static async getInitialProps (ctx) {
    const res = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD')
    const json = await res.json()
    const cooks = cookies(ctx)
    return {
      btc: json.BTC.USD,
      eth: json.ETH.USD,
      show: cooks.show || 'btc'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      btc: formatCurrency(this.props.btc),
      eth: formatCurrency(this.props.eth),
      show: this.props.show
    }
  }

  componentDidMount() {
    setInterval(this.update.bind(this), 2000)
  }

  show(type) {
    this.setState({show: type})
    document.cookie = `show=${type}`
  }

  async update() {
    const res = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD')
    const json = await res.json()
    this.setState({
      btc: formatCurrency(json.BTC.USD),
      eth: formatCurrency(json.ETH.USD)
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
