import React, { Component } from 'react';
import { View, Text, StatusBar, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import styles from './styles';
import SearchBox from '../../../components/SearchBox';
import Loading from '../../../components/Loading';
import ProductItem from '../../../components/ProductItem';
import { fetchAllProduct } from "../../../actions/product";
import { toggleWishList } from "../../../actions/wishList";
import { COLORS } from '../../../theme/common';

class Search extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      searchText: '',
      refreshing: false
    }
  }

  componentDidMount () {
    const { fetchAllProduct } = this.props;
    fetchAllProduct();
  }

  searchProduct () {
    const { fetchAllProduct } = this.props;
    fetchAllProduct(this.state.searchText);
  };

  onChangeSearchText (text) {
    this.setState({ searchText: text });
  };

  _listFooterComponent = () => {
    const { allProduct } = this.props;
    const requesting = _.get(allProduct, 'requesting', false);
    return (
      <View>
        {requesting && <Loading />}
      </View>
    );
  };

  _onRefresh() {
    const { fetchAllProduct, allProduct } = this.props;
    const requesting = _.get(allProduct, 'requesting', false);    
    !requesting && fetchAllProduct();
  }

  gotoProductDetail(product) {
    const { navigation } = this.props;
    navigation.navigate('ProductDetail', { categoryId: _.get(product, 'categories.0.id'), productId: product.id });
  }

  _renderItem = (item, index) => {
    const isLike = this.props.ids.indexOf(item.id) !== -1;
    return (
      <ProductItem
        product={item}
        mainColor={COLORS.MAIN_RED}
        isLike={isLike}
        onPressLike={(product) => this.props.toggleWishList(product)}
        addToCart={(product) => this.props.addToCart(product, 1, _.get(product, 'categories.0.id'))}
        onPressItem={(product) => this.gotoProductDetail(product)}
      />
    )
  };

  _onEndReached(distanceFromEnd) {
    if (distanceFromEnd > 0) {
      this.loadMore();
    }
  }

  loadMore() {
    const { allProduct, fetchAllProduct } = this.props;
    const requesting = _.get(allProduct, 'requesting', false);
    const canLoadMore = _.get(allProduct, 'canLoadMore', true);
    const page = _.get(allProduct, 'page', 1);
    !requesting && canLoadMore && fetchAllProduct(this.state.searchText, page + 1);
  }

  _keyExtractor = (item, index) => item.id;

  render () {
    const { searchText } = this.state;
    const { allProduct } = this.props;
    const products = _.get(allProduct, 'result', []);
    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
        <SearchBox
          ref='searchProduct'
          keyword={searchText}
          delay={1000}
          autoSearch={true}
          hideBtn={true}
          onSearch={() => this.searchProduct()}
          onChangeText={(text) => this.onChangeSearchText(text)}
        />
        <FlatList
          style={{ marginVertical: 5, flex: 1 }}
          data={products}
          contentContainerStyle={styles.fullWidth}
          keyExtractor={this._keyExtractor}
          extraData={products}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => this._renderItem(item, index)}
          ListFooterComponent={this._listFooterComponent()}
          onRefresh={() => this._onRefresh()}
          refreshing={this.state.refreshing}
          onEndReached={({ distanceFromEnd }) => this._onEndReached(distanceFromEnd)}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    allProduct: state.product.fetchAllProduct,
    ids: state.wishList.ids
  }),
  dispatch => bindActionCreators({
    fetchAllProduct,
    toggleWishList
  }, dispatch)
)(Search);
