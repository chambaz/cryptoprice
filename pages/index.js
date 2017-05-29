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
      <div>
        <ul>
          <li><a onClick={e => { e.preventDefault(); this.show('btc') }} href="#">Bitcoin</a></li>
          <li><a onClick={e => { e.preventDefault(); this.show('eth') }} href="#">Ethereum</a> </li>
        </ul>
        <h1 style={{display: (this.state.show === 'btc' ? 'block' : 'none')}}>{this.state.btc}</h1>
        <h1 style={{display: (this.state.show === 'eth' ? 'block' : 'none')}}>{this.state.eth}</h1>
      </div>
    )
  }
}
