import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  Image,
  StatusBar,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchProductByCategory } from '../../../actions/product';
import { toggleWishList } from '../../../actions/wishList';
import ProductTwoColumnItem from '../../../components/ProductTwoColumnItem';
import CustomText from '../../../components/CustomText';
import Loading from '../../../components/Loading';
import { COLORS } from '../../../theme/common';

const { width } = Dimensions.get('window');

class ProductCard extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    categoryId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    title: PropTypes.string.isRequired,
    isEnd: PropTypes.bool,
    viewAll: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { categoryId, fetchProductByCategory, productByCategories } = this.props;
    const productData = _.find(productByCategories.result, (item) => item.categoryId === categoryId);
    const products = _.get(productData, 'data', []);
    if (!products.length) {
      fetchProductByCategory(categoryId, 1, 4);
    }
  }

  _keyExtractor = (item, index) => item.id;

  onPressItem(product) {
    const { navigation, categoryId } = this.props;
    navigation.navigate('ProductDetail', { categoryId: categoryId, productId: product.id });
  }

  _renderItem = (item, index) => {
    const isLike = this.props.ids.indexOf(item.id) !== -1;
    return (
      <ProductTwoColumnItem color={COLORS.MAIN_RED} product={item} onPressItem={(product) => this.onPressItem(product)} isLike={isLike} onPressLike={(product) => this.props.toggleWishList(product)} />
    );
  };

  _renderProductByCategory() {
    const { productByCategories, categoryId } = this.props;

    const requesting = _.get(productByCategories, 'requesting', false);
    const productData = _.find(productByCategories.result, (item) => item.categoryId === categoryId);
    const products = _.get(productData, 'data', []).slice(0, 4);
    return (
      <View style={{ width }}>
        {
          requesting
            ? <Loading />
            : (
              <FlatList
                style={{ marginVertical: 5 }}
                contentContainerStyle={styles.fullWidth}
                scrollEnabled={false}
                data={products}
                keyExtractor={this._keyExtractor}
                extraData={products}
                numColumns={2}
                removeClippedSubviews={false}
                renderItem={({ item, index }) => this._renderItem(item, index)}
              />
            )
        }
      </View>
    );
  }

  render() {

    const { title, isEnd, viewAll } = this.props;
    const marginBottom = isEnd ? { marginBottom: 0 } : {};

    return (
      <View style={[styles.container, marginBottom]}>
        <CustomText style={styles.title} weight={'600'}>{title.toString()}</CustomText>
        {this._renderProductByCategory()}
        <TouchableOpacity onPress={() => viewAll()}>
          <CustomText style={styles.link} weight={'600'}>VIEW ALL</CustomText>
        </TouchableOpacity>
      </View>
    );
  }

}

export default connect(
  state => ({
    categories: state.product.categories,
    productByCategories: state.product.productByCategories,
    ids: state.wishList.ids
  }),
  dispatch => bindActionCreators({
    fetchProductByCategory,
    toggleWishList
  }, dispatch)
)(ProductCard);

const styles = {
  container: {
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT,
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    padding: 10,
    lineHeight: 18,
    alignSelf: 'flex-start'
  },
  fullWidth: {
    width
  },
  link: {
    fontSize: 18,
    color: COLORS.MAIN_RED,
    padding: 10,
    lineHeight: 18
  }
};
