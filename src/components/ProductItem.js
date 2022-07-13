import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../theme/common';
import ProductPrice from './ProductPrice';
import ImageLoad from './ImageLoad';
import CustomText from './CustomText';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    width,
    height: 120,
    justifyContent: 'center'
  },
  divide: {
    width,
    height: 1,
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT
  },
  containerWrap: {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderColor: COLORS.BACKGROUND_GRAY_LIGHT,
    borderWidth: 1
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    color: COLORS.TEXT_GRAY,
    fontSize: 18
  },
  priceTextStyle: {
    fontSize: 18
  },
  discountTextStyle: {
    fontSize: 16
  },
  stockContainer: {
    width: 60,
    height: '100%',
    paddingHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  addToCartContainer: {
    width: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.HIGH_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 10
  },
  lblAddToCart: {
    color: COLORS.HIGH_LIGHT,
    fontSize: 16,
    paddingHorizontal: 5
  },
  rightContainer: {
    width: '100%',
    height: 100,
    backgroundColor: COLORS.RED_GRAY,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  lblStock: {
    fontSize: 10
  }
};

class ProductItem extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    onPressItem: PropTypes.func.isRequired,
    addToCart: PropTypes.func,
    isWishList: PropTypes.bool,
    isLike: PropTypes.bool,
    onPressLike: PropTypes.func,
    mainColor: PropTypes.string
  };

  render() {
    const { product, addToCart, onPressItem, isLike, mainColor } = this.props;
    const image = { uri: _.get(product, 'images.0.src') };
    const inStock = _.get(product, 'in_stock', true);
    const color = mainColor ? mainColor : COLORS.HIGH_LIGHT;
    return (
      <View style={styles.container}>
        <View style={styles.divide} />
        <View style={styles.containerWrap}>
          <TouchableOpacity onPress={() => onPressItem(product)}>
            <ImageLoad
              style={styles.image}
              loadingStyle={{ size: 'small', color: COLORS.MAIN_COLOR }}
              source={image}
              resizeMethod={'resize'}
            />
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <TouchableOpacity onPress={() => onPressItem(product)}>
              <CustomText weight={500} style={styles.title} numberOfLines={1}>{product.name}</CustomText>
            </TouchableOpacity>
            <View>
              <ProductPrice product={product}
                            priceTextStyle={[styles.priceTextStyle, { color }]}
                            discountTextStyle={[styles.discountTextStyle, { color }]} />
              {
                this.props.isWishList &&
                <TouchableOpacity style={[styles.addToCartContainer, { borderColor: color }]} onPress={() => addToCart(product)}>
                  <CustomText weight={400} style={[styles.lblAddToCart, { color }]}>ADD TO CART</CustomText>
                </TouchableOpacity>
              }
            </View>
          </View>
          <View style={styles.stockContainer}>
            {
              inStock
                ? <CustomText weight={400} style={[styles.lblStock, { color: COLORS.MAIN_COLOR }]}>In stock</CustomText>
                : <CustomText weight={400} style={[styles.lblStock, { color: COLORS.RED_GRAY }]}>Out stock</CustomText>
            }
            <TouchableOpacity onPress={() => this.props.onPressLike(product)}>
              {
                isLike
                  ? <MaterialCommunityIcons name="heart" size={20} color={color} />
                  : <MaterialCommunityIcons name="heart-outline" size={20} color={COLORS.TEXT_GRAY} />
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
      ;
  }
}

export default ProductItem;
