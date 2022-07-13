import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { ScrollableTabBar, } from '../../../libs/react-native-scrollable-tab-view';
import DropdownAlert from 'react-native-dropdownalert';

import { COLORS } from '../../../theme/common';
import styles from './styles';
import commonStyles from '../../../theme/styles';
import Shipping from '../../../components/CheckoutShipping';
import Payment from '../../../components/CheckoutPayment';
import Confirmation from '../../../components/CheckoutConfirmation';
import {
  updateCustomerAddress,
  createOrder,
  addHistoryOrder,
  userLogout,
  stripeCreateCharge,
  updateUserMetaData
} from "../../../actions/user";
import { updateOrderInfo, resetCart } from "../../../actions/cart";
import { fetchShippingMethod, fetchCoupons } from "../../../actions/product";

class Checkout extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => {
    return ({
      // headerStyle: {height: 44},
      headerLeft: (
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
          <Ionicons style={styles.backIcon} name="ios-arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      ),
      headerTitle: (
        <Text style={commonStyles.titleCenter}>Checkout</Text>
      ),
      headerRight: (
        <View style={commonStyles.emptyView} />
      )
    })
  };

  constructor (props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    const { shippingMethod } = this.props;
    const status = _.get(shippingMethod, 'status', '');
    if (status !== 'success') {
      fetchShippingMethod();
    }
  }

  componentDidMount () {
    const { address, updateCustomerAddress, user, updateOrderInfo, carts, userLogout, orderInfo: orderInfoData } = this.props;
    if (!user || !user.id) {
      return userLogout();
    }
    if (!_.isEmpty(orderInfoData)) return true;
    const result = _.get(address, 'result', []);
    const userBilling = _.get(user, 'billing');
    const userShipping = _.get(user, 'shipping');
    if (result && !result.length
      && !_.isEmpty(userBilling)
      && _.get(userBilling, 'city')
      && _.get(userBilling, 'phone')
      && _.get(userBilling, 'address_1')) {
      updateCustomerAddress([userBilling]);
    }
    const orderInfo = {};
    let lineItems = [];
    _.forEach(carts, cart => {
      const productId = _.get(cart, 'productId');
      const quantity = _.get(cart, 'quantity');
      const item = {
        'product_id': productId,
        'quantity': quantity
      };
      lineItems.push(item);
    });
    _.set(orderInfo, 'billing', userBilling);
    _.set(orderInfo, 'shipping', userShipping);
    _.set(orderInfo, 'line_items', lineItems);
    _.set(orderInfo, 'set_paid', false);
    _.set(orderInfo, 'customer_id', user.id);
    let totals = 0;
    _.forEach(carts, item => {
      const { productData, quantity } = item;
      const price = _.get(productData, 'price', 0);
      totals += price * quantity;
    });
    _.set(orderInfo, 'amount', totals);
    updateOrderInfo(orderInfo);
  }

  showErrors (errors) {
    this.dropDownAlert.alertWithType('error', 'Validate error', _.isObject(errors) ? _.values(errors).join('\n') : errors);
  }

  showAlert (type, title, message) {
    this.dropDownAlert.alertWithType(type, title, message);
  }

  render () {
    const { navigation, updateCustomerAddress, updateUserMetaData } = this.props;

    const screenToGoBack = _.get(navigation, 'state.key');
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          style={{ flex: 1 }}
          ref={(tabView) => { this.tabView = tabView; }}
          renderTabBar={() => <ScrollableTabBar
            activeTextColor={COLORS.MAIN_COLOR}
            inactiveTextColor={COLORS.TEXT_DARK}
            underlineStyle={styles.underlineStyle}
            backgroundColor={COLORS.BACKGROUND}
            tabStyle={[commonStyles.tabStyle, { height: 45 }]}
            style={[commonStyles.tabBarStyle, { height: 45 }]}
          />}
          locked={true}
        >
          <Shipping
            tabLabel='Shipping'
            onNext={() => this.tabView.goToPage(1)}
            address={this.props.address}
            orderInfo={this.props.orderInfo}
            shippingMethod={this.props.shippingMethod.result || []}
            showErrors={(errors) => this.showErrors(errors)}
            updateOrderInfo={(info) => this.props.updateOrderInfo(info)}
            user={this.props.user} />
          <Payment
            tabLabel='Payment'
            orderInfo={this.props.orderInfo}
            updateOrderInfo={(info) => this.props.updateOrderInfo(info)}
            user={this.props.user}
            coupons={this.props.coupons}
            redirectToAddCard={() => this.props.navigation.navigate('ProfileAddCard', { screenToGoBack })}
            showAlert={(type, title, message) => this.showAlert(type, title, message)}
            onPrevious={() => this.tabView.goToPage(0)}
            showErrors={(errors) => this.showErrors(errors)}
            fetchCoupons={() => this.props.fetchCoupons()}
            onNext={() => this.tabView.goToPage(2)} />
          <Confirmation
            tabLabel='Confirmation'
            address={this.props.address}
            updateCustomerAddress={(address) => updateCustomerAddress(address)}
            updateUserMetaData={(params) => updateUserMetaData(params)}
            editShipping={() => this.tabView.goToPage(0)}
            orderInfo={this.props.orderInfo}
            showAlert={(type, title, message) => this.showAlert(type, title, message)}
            createOrder={(data) => this.props.createOrder(data)}
            resetCart={() => this.props.resetCart()}
            addHistoryOrder={() => this.props.addHistoryOrder()}
            user={this.props.user}
            stripeCreateCharge={(amount, customer) => this.props.stripeCreateCharge(amount, customer)}
            onPrevious={() => this.tabView.goToPage(1)}
            onNext={(orderId, createdAt) => this.props.navigation.navigate('CheckoutSuccess', { orderId, createdAt })}
            carts={this.props.carts} />
        </ScrollableTabView>
        <DropdownAlert ref={ref => this.dropDownAlert = ref} closeInterval={3000} messageNumOfLines={7} errorColor="#fe6c6c" translucent updateStatusBar={false} />
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user.login.result,
    address: state.user.address,
    orderInfo: state.cart.orderInfo,
    carts: state.cart.carts,
    shippingMethod: state.product.shippingMethod,
    coupons: state.product.coupons.result
  }),
  dispatch => bindActionCreators({
    updateCustomerAddress,
    updateOrderInfo,
    createOrder,
    resetCart,
    addHistoryOrder,
    userLogout,
    updateUserMetaData,
    stripeCreateCharge,
    fetchShippingMethod,
    fetchCoupons
  }, dispatch)
)(Checkout);
