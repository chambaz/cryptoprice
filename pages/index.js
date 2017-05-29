import React from 'react'
import 'isomorphic-fetch'

export default class MyPage extends React.Component {
  static async getInitialProps () {
    const res = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD')
    const json = await res.json()
    return {
      btc: json.BTC.USD,
      eth: json.ETH.USD
    }
  }

  render () {
    return (
      <div>
        <ul>
          <li>Bitcoin {this.props.btc}</li>
          <li>Ethereum {this.props.eth} </li>
        </ul>
      </div>
    )
  }
}
