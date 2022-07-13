import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native';
import _ from 'lodash';

import PayPalAPI, {
  RETURN_URL,
  CANCEL_URL,
  PAYMENT_APPROVED_CODE,
  PAYMENT_CANCELED_CODE,
} from '../services/PayPalAPI';

export default class PayPalWebView extends Component {
  constructor(props) {
    super(props);
    this.state = { url: 'https://www.paypal.com' };
    this.shouldCheckURL = true // use to make sure accept or cancel only execute once.
  }

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    completePurchase: PropTypes.func.isRequired,
    orderInfo: PropTypes.object
  };

  componentDidMount() {
    const { orderInfo, totals } = this.props;

    let items = [];

    for (let item of orderInfo['line_items']) {
      items.push({
        name: item['product_id'],
        quantity: item.quantity,
        price: 0,
        tax: 0,
        sku: 'no sku',
        currency: 'USD'
      })
    }

    this.transactions = [
      {
        amount: {
          total: totals,
          currency: 'USD',
          details: {
            tax: 0,
            shipping: 0,
          }
        },
        invoice_number: Date.now(),
        payment_options: { allowed_payment_method: 'INSTANT_FUNDING_SOURCE' },
        item_list: { items: items }
      }
    ];
    const setPaymentDetails = (json, access_token) => {
      this.executeURL = json.links[2].href; // execute => store accept payment request
      this.access_token = access_token;
      this.setState({
        url: json.links[1].href, //approval_url => user accept payment request
      });
    };
    PayPalAPI.startPaymentProcess(this.transactions, setPaymentDetails)
  }

  render() {
    return (
      <WebView
        style={{ flex: 1 }}
        source={{ uri: this.state.url }}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        javaScriptEnabled={true}
        startInLoadingState={true}
      />
    )
  }

  _onNavigationStateChange(webViewState) {
    if (!this.shouldCheckURL) return; // Prevent duplicate check after finished.
    const url = webViewState.url;
    if (url.indexOf(RETURN_URL) !== -1 ) {
      this.shouldCheckURL = false;
      let payer_id = '';
      for (let i = url.length - 1; url[i] !== '='; --i) {
        payer_id = url[i] + payer_id;
      }
      PayPalAPI.executePayment(this.executeURL, payer_id, this.access_token, (json) => this.onPaymentComplete(json));
    } else if (url.indexOf(CANCEL_URL) !== -1) {
      this.shouldCheckURL = false;
      this.props.completePurchase(PAYMENT_CANCELED_CODE);
      this.props.closeModal();
    }
  }

  onPaymentComplete(json) {
    if (json.state === 'approved') {
      this.props.completePurchase(PAYMENT_APPROVED_CODE);
      this.props.closeModal();
    } else {
      throw 'FATAL ERROR: ORDER WERE PAID BUT PAYPAL RESPONSE DON\'T MATCH, CHECK LOGS FOR MORE DETAILS';
    }
  }
}