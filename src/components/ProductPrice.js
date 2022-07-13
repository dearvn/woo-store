import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { COLORS } from '../theme/common';
import CustomText from './CustomText';


const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceTextStyle: {
    color: COLORS.MAIN_COLOR,
    fontSize: 24
  },
  discountTextStyle: {
    marginLeft: 10,
    color: COLORS.TEXT_GRAY,
    fontSize: 16,
    textDecorationLine: "line-through"
  }
};

class ProductPrice extends PureComponent {
  static propTypes = {
    product: PropTypes.object.isRequired,
    showDiscount: PropTypes.bool,
    priceTextStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    discountTextStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ])
  };

  onPressItem(id) {
    this.props.onPressItem(id);
  }

  render() {
    const { product, showDiscount, priceTextStyle, discountTextStyle } = this.props;
    const price = _.get(product, 'price');
    const regularPrice = _.get(product, 'regular_price');
    const onSale = _.get(product, 'on_sale', false);
    return (
      <View style={styles.container}>
        <CustomText weight={700} style={[styles.priceTextStyle, priceTextStyle]}>{`$${price}`}</CustomText>
        {
          onSale && showDiscount && <CustomText weight={500} style={{ ...styles.discountTextStyle, ...discountTextStyle }}>{`$${regularPrice}`}</CustomText>
        }
      </View>
    );
  }
}

ProductPrice.defaultProps = {
  priceTextStyle: {},
  discountTextStyle: {},
  showDiscount: true
};

export default ProductPrice;
