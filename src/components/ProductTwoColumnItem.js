import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../theme/common';
import ImageLoad from './ImageLoad';
import ProductPrice from './ProductPrice';
import CustomText from './CustomText';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    width: width / 2,
    height: width / 2 * 4 / 3,
    backgroundColor: COLORS.BACKGROUND,
    borderColor: COLORS.TEXT_GRAY,
    borderWidth: 0.5
  },
  containerWrap: {
    margin: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderWidth: 0.5,
    borderColor: COLORS.TEXT_GRAY
  },
  containerImage: {
    width: '100%',
    height: '70%'
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.TEXT_GRAY
  },
  detailContainer: {
    padding: 10,
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  title: {
    color: COLORS.TEXT_GRAY,
    fontSize: 16
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    color: COLORS.MAIN_COLOR,
    fontSize: 16
  },
  priceTextStyle: {
    fontSize: 18
  },
  discountTextStyle: {
    fontSize: 16,
    marginLeft: 5
  }
};

class ProductTwoColumnItem extends PureComponent {
  static propTypes = {
    product: PropTypes.object.isRequired,
    onPressItem: PropTypes.func.isRequired,
    onPressLike: PropTypes.func.isRequired,
    isLike: PropTypes.bool
  };

  onPressItem(id) {
    this.props.onPressItem(id);
  }

  render() {
    const { product, isLike, color } = this.props;
    const name = _.get(product, 'name');
    const image = { uri: _.get(product, 'images.0.src') };
    return (
      <View style={styles.container}>
        <View style={styles.containerWrap}>
          <TouchableOpacity style={styles.containerImage} onPress={() => this.onPressItem(product)}>
            <ImageLoad
              style={styles.image}
              loadingStyle={{ size: 'large', color: color ? color : COLORS.MAIN_COLOR }}
              source={image}
              resizeMethod={'resize'}
            />
          </TouchableOpacity>
          <View style={styles.detailContainer}>
            <CustomText style={styles.title} numberOfLines={1}>{name}</CustomText>
            <View style={styles.footer}>
              <ProductPrice
                product={product}
                priceTextStyle={[styles.priceTextStyle, { color: color ? color : COLORS.MAIN_COLOR }]}
                discountTextStyle={styles.discountTextStyle} />
              <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => this.props.onPressLike(product)}>
                {
                  isLike
                    ? <MaterialCommunityIcons name="heart" size={20} color={color ? color : COLORS.HIGH_LIGHT} />
                    : <MaterialCommunityIcons name="heart-outline" size={20} color={COLORS.TEXT_GRAY} />
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

ProductTwoColumnItem.defaultProps = {
  isLike: false
};

export default ProductTwoColumnItem;
