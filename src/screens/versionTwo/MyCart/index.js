import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

import ProductCart from '../../../components/ProductCartV2';
import { addRemoveCartItem, removeProductFromCart } from '../../../actions/cart';
import Images from '../../../constants/images';
import { COLORS } from '../../../theme/common';
import CartEmpty from './Empty';
import commonStyles from '../../../theme/styles';
import CustomText from '../../../components/CustomText';

class MyCart extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => {
    return ({
      headerLeft: (
        <TouchableOpacity style={commonStyles.headerLeft} onPress={() => navigation.goBack()}>
          <Ionicons style={commonStyles.backIcon} name={"ios-arrow-back"} size={20} color={COLORS.TEXT_WHITE} />
        </TouchableOpacity>
      ),
      headerTitle: (
        <CustomText style={[commonStyles.titleCenter, { color: COLORS.TEXT_WHITE }]}>My Cart</CustomText>
      ),
      headerRight: (
        <View style={commonStyles.emptyView}/>
      )
    })
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  _keyExtractor = (item, index) => index;

  plusPress(productId) {
    this.props.addRemoveCartItem(productId, true);
  }

  minusPress(productId) {
    this.props.addRemoveCartItem(productId, false);
  }

  gotoProductDetail(product) {
    const { navigation } = this.props;
    navigation.navigate('ProductDetail', { categoryId: _.get(product, 'categories.0.id'), productId: product.id });
  }

  _renderItem = (item, index) => {
    return (
      <ProductCart
        cart={item}
        removeProductFromCart={(productId) => this.props.removeProductFromCart(productId)}
        gotoProduct={(product) => this.gotoProductDetail(product)}
        plusPress={(productId) => this.plusPress(productId)}
        minusPress={(productId) => this.minusPress(productId)} />
    );
  };

  render() {
    const { carts, totalsCart, navigation } = this.props;
    let totals = 0;
    _.forEach(carts, item => {
      const { productData, quantity } = item;
      const price = _.get(productData, 'price', 0);
      totals += price * quantity;
    });
    return (
      <View style={[styles.container]}>
        {
          totalsCart > 0 ? (
            <View style={{ flex: 1 }}>
              <FlatList
                style={{ marginVertical: 5 }}
                data={carts}
                keyExtractor={this._keyExtractor}
                extraData={carts}
                removeClippedSubviews={false}
                contentContainerStyle={[{ justifyContent: 'flex-start'}]}
                ListEmptyComponent={this._listEmptyComponent}
                renderItem={({ item, index }) => this._renderItem(item, index)}
              />
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Checkout');
                  }}
                  style={styles.btnContainer}
                >
                  <CustomText style={styles.lblFooter}>PLACE THIS ORDER</CustomText>
                  <MaterialCommunityIcons name={'dots-vertical'} size={22} color={COLORS.TEXT_WHITE} style={styles.dot} />
                  <CustomText style={styles.lblFooter}>${totals}</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <CartEmpty navigation={navigation} />
          )
        }
      </View>
    );
  }
}

export default connect(
  state => ({
    carts: state.cart.carts,
    totalsCart: state.cart.totals
  }),
  dispatch => bindActionCreators({
    addRemoveCartItem,
    removeProductFromCart
  }, dispatch)
)(MyCart);
