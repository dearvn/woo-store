import React, { Component } from 'react';
import { View, Text, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';
import { navigationHeaderWithoutBackButton } from "../../../navigator";
import ProductCart from '../../../components/ProductCart';
import { addRemoveCartItem, removeProductFromCart } from "../../../actions/cart";
import Images from '../../../constants/images';
import { COLORS } from "../../../theme/common";

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => navigationHeaderWithoutBackButton({ navigation });

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

  _listEmptyComponent = () => (
    <View style={styles.container}>
      <Image style={{ alignSelf: 'center' }} source={Images.CART_EMPTY} resizeMethod={'resize'} resizeMode={'contain'} />
    </View>
  );

  _renderItem = (item, index) => {
    return (
      <ProductCart
        cart={item}
        removeProductFromCart={(productId) => this.props.removeProductFromCart(productId)}
        gotoProduct={(product) => this.gotoProductDetail(product)}
        plusPress={(productId) => this.plusPress(productId)}
        minusPress={(productId) => this.minusPress(productId)} />
    )
  };

  render() {
    const { carts, totalsCart } = this.props;
    let totals = 0;
    _.forEach(carts, item => {
      const { productData, quantity } = item;
      const price = _.get(productData, 'price', 0);
      totals += price * quantity;
    });
    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
        <FlatList
          style={{ marginVertical: 5, flex: 1 }}
          data={carts}
          keyExtractor={this._keyExtractor}
          extraData={carts}
          removeClippedSubviews={false}
          contentContainerStyle={[styles.container, { justifyContent: 'flex-start' }]}
          ListEmptyComponent={this._listEmptyComponent}
          renderItem={({ item, index }) => this._renderItem(item, index)}
        />
        <View style={styles.footerContainer}>
          {
            totalsCart > 0
              ? <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Checkout');
                }}
                style={styles.btnContainer}
              >
                <Text style={styles.lblFooter}>PLACE THIS ORDER</Text>
                <MaterialCommunityIcons name={'dots-vertical'} size={22} color={COLORS.TEXT_WHITE} style={styles.dot} />
                <Text style={styles.lblFooter}>${totals}</Text>
              </TouchableOpacity>
              : <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}
                style={[styles.btnContainer, { backgroundColor: COLORS.RED_GRAY }]}
              >
                <Text style={styles.lblFooter}>SHOP NOW!</Text>
              </TouchableOpacity>
          }
        </View>
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
)(Home);
