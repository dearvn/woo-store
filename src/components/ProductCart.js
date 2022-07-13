import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Image,  TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';

import { COLORS } from '../theme/common';
import ProductPrice from './ProductPrice';
import commonStyles from '../theme/styles';
import CustomText from './CustomText';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    width,
    height: 120,
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND
  },
  divide: {
    width,
    height: 1,
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT
  },
  containerWrap: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderColor: COLORS.BACKGROUND_GRAY_LIGHT,
    borderWidth: 1,
    borderRadius: 10
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    color: COLORS.TEXT_DARK,
    fontSize: 16
  },
  priceTextStyle: {
    fontSize: 18
  },
  discountTextStyle: {
    fontSize: 16
  },
  qualityContainer: {
    width: 50,
    height: '100%',
    paddingHorizontal: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qualityNumber: {
    width: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.TEXT_GRAY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lblQuality: {
    color: COLORS.MAIN_COLOR,
    fontSize: 16
  },
  rightContainer: {
    width: '100%',
    height: 100,
    backgroundColor: COLORS.RED_GRAY,
    alignItems: 'flex-start',
    justifyContent: 'center'
  }
};

class ProductCart extends PureComponent {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    plusPress: PropTypes.func.isRequired,
    minusPress: PropTypes.func.isRequired,
    gotoProduct: PropTypes.func.isRequired,
    removeProductFromCart: PropTypes.func
  };

  render() {
    const { cart, plusPress, minusPress, removeProductFromCart } = this.props;
    const { productData, quantity, productId } = cart;
    const image = { uri: _.get(productData, 'images.0.src') };
    const rightBtn = [
      {
        backgroundColor: COLORS.RED_GRAY,
        component: (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome name={'trash-o'} color={COLORS.TEXT_WHITE} size={30} />
          </View>
        ),
        onPress: () => {
          removeProductFromCart(productId)
        }
      }
    ];
    return (
      <Swipeout autoClose={true} right={rightBtn}>
        <View style={[styles.container]}>
          <View style={styles.divide} />
          <View style={[styles.containerWrap, commonStyles.shadow]}>
            <TouchableOpacity onPress={() => this.props.gotoProduct(productData)}>
              <Image source={image} style={styles.image} resizeMethod={'resize'} />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
              <CustomText style={styles.title} numberOfLines={2}>{productData.name}</CustomText>
              <ProductPrice product={productData} priceTextStyle={styles.priceTextStyle} discountTextStyle={styles.discountTextStyle} />
            </View>
            <View style={styles.qualityContainer}>
              <TouchableOpacity onPress={() => plusPress(cart.productId)}>
                <MaterialCommunityIcons name={'plus'} size={22} color={COLORS.TEXT_GRAY} />
              </TouchableOpacity>
              <View style={styles.qualityNumber}>
                <CustomText weight={400} style={styles.lblQuality}>{quantity || 1}</CustomText>
              </View>
              <TouchableOpacity onPress={() => minusPress(cart.productId)}>
                <MaterialCommunityIcons name={'minus'} size={22} color={COLORS.TEXT_GRAY} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Swipeout>
    );
  }
}

export default ProductCart;
