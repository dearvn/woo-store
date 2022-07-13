import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Image, TouchableOpacity } from 'react-native';

import { COLORS } from '../theme/common';
import ProductPrice from './ProductPrice';
import Images from '../constants/images';
import CustomText from './CustomText';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    width,
    height: 80,
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
    width: 60,
    height: 60,
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
    width: 50,
    height: '100%',
    paddingHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'flex-end'
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

class ProductOrderItem extends PureComponent {
  static propTypes = {
    product: PropTypes.object.isRequired,
    onPressItem: PropTypes.func.isRequired,
    addToCart: PropTypes.func,
    isWishList: PropTypes.bool,
    mainColor: PropTypes.string
  };
  
  render() {
    const { product, addToCart, onPressItem } = this.props;
    const imageUrl = _.get(product, 'images.0.src');
    const image = imageUrl ? { uri: imageUrl } : Images.BANNER;
    const inStock = _.get(product, 'in_stock', true);
    const { mainColor } = this.props;
    const color = mainColor ? mainColor : COLORS.MAIN_COLOR;
    
    return (
      <View style={styles.container}>
        <View style={styles.divide}/>
        <View style={styles.containerWrap}>
          <TouchableOpacity onPress={() => onPressItem(product)}>
            <Image source={image} style={styles.image} resizeMethod={'resize'}/>
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            <CustomText style={styles.title} numberOfLines={1}>{product.name}</CustomText>
            <View>
              <ProductPrice product={product} priceTextStyle={[styles.priceTextStyle, { color }]}
                            discountTextStyle={[styles.discountTextStyle, { color }]}/>
            </View>
          </View>
          <View style={styles.stockContainer}>
            {
              inStock
                ? <CustomText weight={400} style={[styles.lblStock, { color: COLORS.MAIN_COLOR }]}>In stock</CustomText>
                : <CustomText weight={400} style={[styles.lblStock, { color: COLORS.RED_GRAY }]}>Out stock</CustomText>
            }
          </View>
        </View>
      </View>
    )
      ;
  }
}

export default ProductOrderItem;
