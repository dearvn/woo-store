import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList
} from 'react-native';
import _ from 'lodash';

import ProductItem from './ProductItem';
import { COLORS } from "../theme/common";

const styles = {
  container: {
    paddingVertical: 5,
    flex: 1,
    backgroundColor: COLORS.BACKGROUND
  }
};

class WishList extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    wishList: PropTypes.object,
    addToCart: PropTypes.func,
    ids: PropTypes.array,
    toggleWishList: PropTypes.func,
    mainColor: PropTypes.string,
  };

  _keyExtractor = (item, index) => index;

  gotoProductDetail(product) {
    const { navigation } = this.props;
    navigation.navigate('ProductDetail', { categoryId: _.get(product, 'categories.0.id'), productId: product.id });
  }

  _renderItem = (item, index) => {
    const { wishList, mainColor } = this.props;
    const ids = _.get(wishList, 'ids', []);
    const isLike = ids.indexOf(item.id) !== -1;
    return (
      <ProductItem
        product={item}
        mainColor={mainColor}
        isLike={isLike}
        onPressLike={(product) => this.props.toggleWishList(product)}
        addToCart={(product) => this.props.addToCart(product, 1, _.get(product, 'categories.0.id'))}
        onPressItem={(product) => this.gotoProductDetail(product)}
        isWishList={true}
      />
    )
  };

  render () {
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={{ backgroundColor: COLORS.BACKGROUND }}
        data={this.props.wishList.results}
        keyExtractor={this._keyExtractor}
        extraData={this.props.wishList.results}
        removeClippedSubviews={false}
        renderItem={({ item, index }) => this._renderItem(item, index)}
      />
    )
  }
}

export default WishList;