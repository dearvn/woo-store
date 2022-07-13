import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../theme/common';
import { getMetaData } from "../utils/general";

const { width } = Dimensions.get('window');
const textInputHeight = 40;
import CustomText from './CustomText';

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND
  },
  viewPromotion: {
    padding: 16,
    width,
    height: 100,
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT
  },
  textPromotion: {
    color: COLORS.TEXT_DARK,
    fontSize: 15,
    backgroundColor: 'transparent'
  },
  viewWrapTextinput: {
    flexDirection: 'row',
    marginTop: 10,
    height: textInputHeight,
    borderRadius: 4
  },
  textinput: {
    flex: 2,
    height: textInputHeight,
    backgroundColor: COLORS.BACKGROUND,
    paddingLeft: 10
  },
  buttonApply: {
    flex: 1,
    backgroundColor: COLORS.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textApply: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  // Item
  separator: {
    backgroundColor: COLORS.TEXT_GRAY,
    marginLeft: 60,
    width: width - 60,
    height: 0.5
  },
  itemWrapper: {
    width,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND
  },
  itemImage: {
    width: 30,
    height: 22,
    resizeMode: 'contain',
    marginLeft: 20,
    tintColor: COLORS.TEXT_DARK
  },
  icon: {
    marginLeft: 20
  },
  itemName: {
    color: COLORS.TEXT_DARK,
    fontSize: 15,
    backgroundColor: 'transparent',
    flex: 1,
    marginLeft: 10
  },
  selectState: {
    marginRight: 20,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderColor: COLORS.MAIN_COLOR,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerState: {
    margin: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.MAIN_COLOR
  },
  flatList: {
    flex: 1
  },
  nextHandleView: {
    width,
    height: 95,
    alignItems: 'center'
  },
  wrapAmount: {
    width,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  topAmoutLine: {
    width,
    height: 0.5,
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT
  },
  totalAmount: {
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    backgroundColor: 'transparent',
    flex: 3,
    marginLeft: 20
  },
  amount: {
    color: COLORS.MAIN_GREEN,
    fontSize: 18,
    backgroundColor: 'transparent',
    flex: 1
  },
  amountDiscount: {
    color: COLORS.MAIN_GREEN,
    fontSize: 18,
    backgroundColor: 'transparent',
    textDecorationLine: 'none',
    marginLeft: 5
  },
  amountDiscountThrough: {
    color: COLORS.DARK_COLOR,
    fontSize: 18,
    backgroundColor: 'transparent',
    textDecorationLine: 'line-through'
  },
  buttonNext: {
    height: 50,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MAIN_COLOR,
  },
  textNext: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  nextIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  }
};

const paymentTypes = [
  {
    name: 'Cash on delivery',
    icon: 'money',
    type: 'cod'
  },
  {
    name: 'Credit card',
    icon: 'credit-card',
    type: 'stripe'
  },
  {
    name: 'Paypal',
    icon: 'paypal',
    type: 'paypal'
  }
];

class Payment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      promoCode: _.get(props, 'orderInfo.promoCode', '')
    }
  };

  componentDidMount() {
    this.props.fetchCoupons()
      .then(() => {
        this.handleCoupons();
      });
  }

  _keyExtractor = (item, index) => index;
  _renderItem = (item, index) => {
    const innerStyle = index === this.state.selectedIndex ? styles.innerState : {};
    const { mainColor } = this.props;
    const color = mainColor ? mainColor : COLORS.MAIN_COLOR;
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => this._onPressItem(index)}
      >
        <FontAwesome
          name={item.icon}
          color={index !== this.state.selectedIndex ? COLORS.TEXT_DARK : color}
          size={30}
          style={styles.icon} />
        <CustomText weight={400} style={styles.itemName}>{item.name}</CustomText>
        <View style={[styles.selectState, { borderColor: color }]}>
          <View style={[innerStyle, {backgroundColor: color}]} />
        </View>
      </TouchableOpacity>
    )
  };
  _onPressItem = (index) => {
    this.setState({ selectedIndex: index });
  };

  // On Next Handler
  validateOnNext() {
    const { updateOrderInfo, orderInfo, user } = this.props;
    const shipping = _.get(orderInfo, 'shipping', null);
    const billing = _.get(orderInfo, 'billing', null);
    if (_.isEmpty(shipping) || _.isEmpty(billing)) {
      setTimeout(() => this.props.onPrevious(), 500);
      return false;
    }
    let newOrderInfo = { ...orderInfo };
    if (this.state.selectedIndex === 0 || this.state.selectedIndex === 2) {
      newOrderInfo['payment_method'] = paymentTypes[this.state.selectedIndex].type;
      newOrderInfo['payment_method_title'] = paymentTypes[this.state.selectedIndex].name;
    } else {
      const metaData = _.get(user, 'meta_data', []);
      let stripeCustomer = getMetaData(metaData, 'stripeCustomer', null);
      stripeCustomer = stripeCustomer && JSON.parse(stripeCustomer);
      let stripeCard = getMetaData(metaData, 'stripeCard', null);
      stripeCard = stripeCard && JSON.parse(stripeCard);
      if (!_.isEmpty(stripeCustomer) && !_.isEmpty(stripeCard)) {
        newOrderInfo['payment_method'] = paymentTypes[this.state.selectedIndex].type;
        newOrderInfo['payment_method_title'] = paymentTypes[this.state.selectedIndex].name;
      } else {
        Alert.alert(
          'Please add card first!',
          'Do you want to redirect to add card ?',
          [
            { text: 'Cancel' },
            { text: 'Ok', onPress: () => this.props.redirectToAddCard() }
          ]
        );
      }
    }
    updateOrderInfo(newOrderInfo);
    setTimeout(() => this.props.onNext(), 500);
  }

  handleCoupons() {
    const { coupons, showErrors, orderInfo, updateOrderInfo } = this.props;
    const { promoCode } = this.state;
    if (!promoCode) return;
    const coupon = _.find(coupons, { code: promoCode });
    let newOrderInfo = { ...orderInfo };
    const dateExpires = _.get(coupon, 'date_expires');
    const isExpired = moment(dateExpires).diff(moment()) <= 0;
    if (coupon) {
      if (isExpired) {
        showErrors('Promo code is expired!');
      } else {
        switch (coupon['discount_type']) {
          case 'fixed_cart':
            const productIds = _.get(coupon, 'product_ids', []);
            const lineItems = _.get(newOrderInfo, 'line_items', []);
            const productOrderIds = _.chain(lineItems).mapValues('product_id').values().value();
            const invalided = _.difference(productOrderIds, productIds).length === productOrderIds.length;
            if (invalided) {
              const freeShipping = _.get(coupon, 'free_shipping', false);
              if (freeShipping) {
                _.set(newOrderInfo, 'fee_ship', 0);
                updateOrderInfo(newOrderInfo);
              } else {
                showErrors('Invalided promo code with your order');
              }
            } else {
              const amount = _.get(coupon, 'amount', 0);
              _.set(newOrderInfo, 'amountDiscount', newOrderInfo['amount'] - parseFloat(amount));
              _.set(newOrderInfo, 'haveDiscount', true);
              _.set(newOrderInfo, 'discountStatus', `$${amount}`);
              _.set(newOrderInfo, 'promoCode', promoCode);
              _.set(newOrderInfo, 'coupon_lines', [{ code: promoCode }]);
              updateOrderInfo(newOrderInfo);
            }
            break;
          case 'percent':
            const amount = parseInt(_.get(coupon, 'amount', 0));
            const totals = parseFloat(_.get(newOrderInfo, 'amount', 0));
            const newCost = totals - (totals * amount / 100);
            _.set(newOrderInfo, 'amountDiscount', newCost);
            _.set(newOrderInfo, 'haveDiscount', true);
            _.set(newOrderInfo, 'discountStatus', `${amount}%`);
            _.set(newOrderInfo, 'promoCode', promoCode);
            _.set(newOrderInfo, 'coupon_lines', [{ code: promoCode }]);
            updateOrderInfo(newOrderInfo);
            break;
          default:
            break;
        }
      }
    } else {
      showErrors('Invalided promo code');
    }
  }

  removeCoupons() {
    const { orderInfo, updateOrderInfo } = this.props;
    let newOrderInfo = { ...orderInfo };
    _.set(newOrderInfo, 'amountDiscount', 0);
    _.set(newOrderInfo, 'haveDiscount', false);
    _.set(newOrderInfo, 'discountStatus', '');
    updateOrderInfo(newOrderInfo);
    this.setState({ promoCode: '' });
  }

  render() {
    const { mainColor } = this.props;
    const color = mainColor ? mainColor : COLORS.MAIN_COLOR;
    
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          scrollEnabled={false}
        >
          {/* Promotion Code View */}
          <View style={styles.viewPromotion}>
            <CustomText weight={400} style={styles.textPromotion}>Promo Code</CustomText>
            <View style={styles.viewWrapTextinput}>
              <TextInput
                style={styles.textinput}
                value={this.state.promoCode}
                onChangeText={(promoCode) => this.setState({ promoCode: promoCode })}
                underlineColorAndroid={'transparent'}
                placeholder='Insert promo code'
              />
              {
                _.get(this.props, 'orderInfo.haveDiscount', false) ? (
                  <TouchableOpacity style={[styles.buttonApply, { backgroundColor: COLORS.RED_HIGH_LIGHT }]} onPress={() => this.removeCoupons()}>
                    <CustomText weight={700} style={styles.textApply}>REMOVE</CustomText>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={[styles.buttonApply, { backgroundColor: color }]} onPress={() => this.handleCoupons()}>
                    <CustomText weight={700} style={styles.textApply}>APPLY</CustomText>
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
          <FlatList
            style={styles.flatList}
            scrollEnabled={false}
            data={paymentTypes}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={() => (<View style={styles.separator} />)}
            removeClippedSubviews={false}
            renderItem={({ item, index }) => this._renderItem(item, index)}
          />
        </KeyboardAwareScrollView>
        {/* Checkout amount and continue button */}
        <View style={styles.nextHandleView}>
          <View style={styles.topAmoutLine} />
          <View style={styles.wrapAmount}>
            <CustomText style={styles.totalAmount}>Total Amount</CustomText>
            {
              _.get(this.props, 'orderInfo.haveDiscount', false)
                ? <View style={{ flex: 1, flexDirection: 'row', paddingRight: 50 }}>
                  <CustomText weight={600} style={[styles.amountDiscountThrough, {color}]}>${_.get(this.props, 'orderInfo.amount', '')} </CustomText>
                  <CustomText weight={600} style={[styles.amountDiscount, {color}]}>${_.get(this.props, 'orderInfo.amountDiscount', '')}</CustomText>
                </View>
                : <CustomText weight={600} style={[styles.amount, {color}]}>${_.get(this.props, 'orderInfo.amount', '')}</CustomText>
            }
          </View>
          <TouchableOpacity
            style={[styles.buttonNext, { backgroundColor: color }]}
            onPress={() => this.validateOnNext()}
          >
            <CustomText weight={700} style={styles.textNext}>CONTINUE TO CONFIRMATION</CustomText>
            <Ionicons style={styles.nextIcon} name="ios-arrow-round-forward-outline" color={COLORS.TEXT_WHITE} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Payment;