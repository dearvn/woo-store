import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  Modal
} from 'react-native';
import {
  PAYMENT_APPROVED_CODE,
  PAYMENT_CANCELED_CODE,
  PAYMENT_ERROR_CODE
} from '../services/PayPalAPI';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProductOrderItem from '../components/ProductOrderItem';
import PayPalWebView from '../components/PayPalWebView';
import CustomText from '../components/CustomText';
import Loading from '../components/Loading';
import { COLORS, fontMaker } from '../theme/common';
import { getMetaData } from '../utils/general';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND
  },
  viewTopAddress: {
    width,
    backgroundColor: COLORS.BACKGROUND,
    paddingBottom: 20
  },
  shippingTo: {
    fontSize: 15,
    backgroundColor: 'transparent',
    color: COLORS.TEXT_DARK,
    marginLeft: 16,
    marginTop: 25,
    marginBottom: 4
  },
  buttonEdit: {
    position: 'absolute',
    right: -5,
    top: 25,
    width: 80,
    height: 40,
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND
  },
  textEdit: {
    fontSize: 14,
    backgroundColor: 'transparent',
    color: COLORS.MAIN_COLOR
  },
  topUsername: {
    fontSize: 15,
    color: COLORS.TEXT_GRAY,
    backgroundColor: 'transparent',
    marginLeft: 16,
    marginTop: 4,
    marginBottom: 2
  },
  underline: {
    width,
    height: 0.5,
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT
  },
  wrapContentCart: {
    width,
    padding: 16,
    backgroundColor: COLORS.BACKGROUND
  },
  //Content Cart Price Info
  wrapCart: {
    width,
    flexDirection: 'row',
    height: 45,
    backgroundColor: COLORS.BACKGROUND,
    alignItems: 'center'
  },
  paymentSumary: {
    fontSize: 15,
    backgroundColor: 'transparent',
    color: COLORS.TEXT_DARK,
    marginLeft: 0,
    marginTop: 25,
    marginBottom: 4
  },
  contentTitleBold: {
    flex: 3,
    fontSize: 15,
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent'
  },
  contentTitleRegular: {
    flex: 3,
    fontSize: 15,
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent'
  },
  isHighlight: {
    color: COLORS.MAIN_GREEN
  },
  contentPriceRegular: {
    flex: 1,
    fontSize: 15,
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent',
    right: 0
  },
  contentPriceBold: {
    flex: 1,
    fontSize: 15,
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent',
    right: 0
  },
  buttonNext: {
    height: 50,
    width, //padding 16 each side
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MAIN_COLOR
  },
  textNext: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  nextIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  }
};

class Confirmation extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isPaying: false
    };
  }
  
  _keyExtractor = (item, index) => index;
  _renderItem = (item, index) => {
    const { mainColor } = this.props;
    
    return (
      <ProductOrderItem
        product={item.productData}
        addToCart={(product) => this.props.addToCart(product, 1, _.get(product, 'categories.0.id'))}
        onPressItem={(product) => this.gotoProductDetail(product)}
        mainColor={mainColor}
        isWishList={true}
      />
    );
  };
  
  renderContentCart(title, amount, isBold = false, isHighlight = false) {
    const titleStyle = isBold ? styles.contentTitleBold : styles.contentTitleRegular;
    const priceStyle = isBold ? styles.contentPriceBold : styles.contentPriceRegular;
    return (
      <View style={styles.wrapCart}>
        <CustomText weight={700} style={titleStyle}>{title}</CustomText>
        <CustomText weight={400}
                    style={!isHighlight ? priceStyle : [priceStyle, styles.isHighlight]}>{amount === 0 ? 'Free' : ('$' + amount)}</CustomText>
      </View>
    );
  };
  
  // On Next Handler
  orderNow() {
    const { orderInfo } = this.props;
    const paymentMethod = _.get(orderInfo, 'payment_method');
    if(paymentMethod === 'stripe') {
      Alert.alert(
        'Confirm order!',
        `Do you wanna pay $${_.get(orderInfo, 'amount')} for this order ?`,
        [
          { text: 'Cancel', onPress: () => this.setState({ isPaying: false }) },
          { text: 'Ok', onPress: () => this.orderStripeProduct() }
        ]
      );
    }
    if(paymentMethod === 'paypal') {
      Alert.alert(
        'Confirm order!',
        `Do you wanna pay $${_.get(orderInfo, 'amount')} for this order ?`,
        [
          { text: 'Cancel', onPress: () => this.setState({ isPaying: false }) },
          { text: 'Ok', onPress: () => this.setState({ modalVisible: true }) }
        ]
      );
    } else {
      this.orderProduct();
    }
  };
  
  addNewAddress() {
    const { orderInfo, address, updateCustomerAddress, updateUserMetaData } = this.props;
    const billing = _.get(orderInfo, 'billing');
    const listAddress = _.get(address, 'result', []);
    if(!_.isEmpty(billing)) {
      _.forEach(listAddress, item => {
        if(!_.isEmpty(item)) {
          if(
            ((_.get(billing, 'address_1') !== _.get(item, 'address_1')) && !!_.get(billing, 'address_1'))
            || ((_.get(billing, 'city') !== _.get(item, 'city')) && !!_.get(billing, 'city'))
            || ((_.get(billing, 'state') !== _.get(item, 'state')) && !!_.get(billing, 'state'))
            || ((_.get(billing, 'country') !== _.get(item, 'country')) && !!_.get(billing, 'country'))
            || ((_.get(billing, 'phone') !== _.get(item, 'phone')) && !!_.get(billing, 'phone'))
          ) {
            let newAddress = [
              ...listAddress,
              billing
            ];
            newAddress = _.unionWith(newAddress, _.isEqual);
            updateCustomerAddress(newAddress);
            const data = {
              userAddress: JSON.stringify(newAddress)
            };
            updateUserMetaData(data);
            return false;
          }
        }
      });
    }
  }
  
  orderPaypalProduct(responseCode) {
    const { orderInfo, createOrder, resetCart, addHistoryOrder, onNext } = this.props;
    const type = _.get(responseCode, 'paymentState', responseCode);
    switch(type) {
      case PAYMENT_APPROVED_CODE:
        createOrder({ ...orderInfo, 'set_paid': true }).then((data) => {
          this.addNewAddress();
          resetCart();
          addHistoryOrder(data);
          onNext(data['id'], data['date_created']);
        }).catch(error => this.props.showAlert('error', 'Create order', 'Create order failed!'));
        break;
      case PAYMENT_CANCELED_CODE:
      case PAYMENT_ERROR_CODE:
        this.props.showAlert('error', 'Create order', 'Create order failed!');
        break;
      default:
      // just close the modal or error
    }
    this.closeModal();
  }
  
  orderStripeProduct() {
    const { user, stripeCreateCharge, orderInfo, createOrder, resetCart, addHistoryOrder, onNext } = this.props;
    const metaData = _.get(user, 'meta_data', []);
    let stripeCustomer = getMetaData(metaData, 'stripeCustomer', null);
    stripeCustomer = stripeCustomer && JSON.parse(stripeCustomer);
    stripeCreateCharge(orderInfo.amount, stripeCustomer.id).then(() => {
      createOrder({ ...orderInfo, 'set_paid': true }).then((data) => {
        this.addNewAddress();
        resetCart();
        addHistoryOrder(data);
        onNext(data['id'], data['date_created']);
      }).catch(error => this.props.showAlert('error', 'Create order', 'Create order failed!'));
    }).catch(error => this.props.showAlert('error', 'Payment', 'Payment failed!'));
  }
  
  orderProduct() {
    const { orderInfo, createOrder } = this.props;
    createOrder(_.omit(orderInfo, ['amount', 'haveDiscount', 'discountStatus', 'fee_ship', 'amountDiscount', 'amountShipping'])).then((data) => {
      this.addNewAddress();
      this.props.resetCart();
      this.props.addHistoryOrder(data);
      this.props.onNext(data['id'], data['date_created']);
    }).catch(error => {
      console.log('error:', error);
      this.props.showAlert('error', 'Create order', 'Create order failed!');
      this.setState({ isPaying: false });
    });
  }
  
  closeModal() {
    this.setState({ modalVisible: false, isPaying: false });
  }
  
  renderPaypalLayout = () => {
    return (
      <Modal
        ref='PaypalModal'
        onRequestClose={() => {
        }}
        visible={this.state.modalVisible}
        style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.closeModal()}
          style={{ position: 'absolute', top: 10, left: 10, zIndex: 5, backgroundColor: 'transparent' }}>
          <Ionicons style={styles.backIcon} name="ios-arrow-back" size={30} color="#000"/>
        </TouchableOpacity>
        <PayPalWebView
          ref='payPalPanel'
          totals={_.get(this.props, 'orderInfo.amount', 0)}
          orderInfo={this.props.orderInfo}
          completePurchase={(paymentState) => this.orderPaypalProduct({ paymentState })}
          closeModal={() => this.closeModal()}
        />
      </Modal>);
  };
  
  render() {
    const { orderInfo, mainColor } = this.props;
    const billing = _.get(orderInfo, 'billing');
    const firstName = _.get(billing, 'first_name', '');
    const lastName = _.get(billing, 'last_name', '');
    const phone = _.get(billing, 'phone', '');
    const address = _.get(billing, 'address_1', '');
    const city = _.get(billing, 'city', '');
    const country = _.get(billing, 'country', '');
    const state = _.get(billing, 'state', '');
    const infoShipping = `${firstName} ${lastName}\n${phone}\n${address}, ${city}\n${state}, ${country}`;
    const amountDiscount = _.get(this.props, 'orderInfo.amountDiscount', 0);
    const amount = amountDiscount ? amountDiscount : _.get(this.props, 'orderInfo.amount', 0);
    const amountShipping = _.get(this.props, 'orderInfo.amountShipping', 0);
    const total = amount + amountShipping;
    const color = mainColor ? mainColor : COLORS.MAIN_COLOR;
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {/* Top Address View */}
          <View style={styles.viewTopAddress}>
            <CustomText weight={700} style={styles.shippingTo}>Shipping to</CustomText>
            <TouchableOpacity style={styles.buttonEdit} onPress={() => this.props.editShipping()}>
              <CustomText weight={400} style={[styles.textEdit, { color }]}>Edit</CustomText>
            </TouchableOpacity>
            <CustomText weight={400} style={styles.topUsername}>{infoShipping}</CustomText>
            <View style={styles.underline}/>
          </View>
          <FlatList
            style={styles.container}
            contentContainerStyle={{ backgroundColor: COLORS.BACKGROUND }}
            data={this.props.carts}
            keyExtractor={this._keyExtractor}
            removeClippedSubviews={false}
            renderItem={({ item, index }) => this._renderItem(item, index)}
          />
          {/* Bottom Cart Info */}
          <View style={styles.wrapContentCart}>
            <CustomText weight={700} style={styles.paymentSumary}>Payment Sumary</CustomText>
            {this.renderContentCart('Order total', amountDiscount)}
            <View style={styles.underline}/>
            {this.renderContentCart('Delivery Charge', amountShipping, false, true)}
            <View style={styles.underline}/>
            {this.renderContentCart('Total Amount', total, true, true)}
            <View style={styles.underline}/>
          </View>
        </ScrollView>
        {this.renderPaypalLayout()}
        <TouchableOpacity
          style={[styles.buttonNext, { backgroundColor: color }]}
          disabled={this.state.isPaying}
          onPress={() => {
            this.setState({ isPaying: true });
            this.orderNow();
          }}>
          {
            this.state.isPaying
              ? <Loading/>
              : <View style={[styles.buttonNext, { backgroundColor: color }]}>
                <CustomText weight={400} style={styles.textNext}>ORDER NOW</CustomText>
                <Ionicons style={styles.nextIcon} name="ios-arrow-round-forward-outline" color={COLORS.TEXT_WHITE}
                          size={30}/>
              </View>
          }
        
        </TouchableOpacity>
      </View>
    );
  }
}

export default Confirmation;