import React, { Component } from 'react';
import { View, Text, StatusBar, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import styles from './styles';
import { navigationHeaderWithoutBackButton } from '../../../navigator';
import { fetchAllOfferProduct } from '../../../actions/product';
import { toggleWishList } from "../../../actions/wishList";
import ProductTwoColumnItem from '../../../components/ProductTwoColumnItem';
import Loading from '../../../components/Loading';

class HotOffer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => navigationHeaderWithoutBackButton({ navigation });

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
  }

  componentDidMount() {
    const { fetchAllOfferProduct } = this.props;
    fetchAllOfferProduct();
  }

  _listFooterComponent = () => {
    const { fetchAllOfferProductData } = this.props;
    const requesting = _.get(fetchAllOfferProductData, 'requesting', false);
    return (
      <View>
        {requesting && <Loading />}
      </View>
    );
  };

  _onRefresh() {
    const { fetchAllOfferProduct, fetchAllOfferProductData } = this.props;
    const requesting = _.get(fetchAllOfferProductData, 'requesting', false);
    !requesting && fetchAllOfferProduct();
    this.setState({ refreshing: false });
  }

  gotoProductDetail(product) {
    const { navigation } = this.props;
    console.log("_.get(product, 'categories.0.id'):", _.get(product));
    navigation.navigate('ProductDetail', { categoryId: _.get(product, 'categories.0.id'), productId: product.id });
  }

  _renderItem = (item, index) => {
    const isLike = this.props.ids.indexOf(item.id) !== -1;
    return (
      <ProductTwoColumnItem
        product={item}
        onPressItem={(productId) => this.gotoProductDetail(productId)}
        isLike={isLike}
        onPressLike={(product) => this.props.toggleWishList(product)}
      />
    );
  };

  _onEndReached(distanceFromEnd) {
    if (distanceFromEnd > 0) {
      this.loadMore();
    }
  }

  loadMore() {
    const { fetchAllOfferProductData, fetchAllOfferProduct } = this.props;
    const requesting = _.get(fetchAllOfferProductData, 'requesting', false);
    const canLoadMore = _.get(fetchAllOfferProductData, 'canLoadMore', true);
    const page = _.get(fetchAllOfferProductData, 'page', 1);
    !requesting && canLoadMore && fetchAllOfferProduct('', page + 1);
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    const { fetchAllOfferProductData } = this.props;
    const products = _.get(fetchAllOfferProductData, 'result', []);

    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
        <FlatList
          style={{ marginVertical: 5 }}
          contentContainerStyle={styles.fullWidth}
          data={products}
          keyExtractor={this._keyExtractor}
          extraData={products}
          numColumns={2}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => this._renderItem(item, index)}
          ListFooterComponent={this._listFooterComponent()}
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          onEndReached={({ distanceFromEnd }) => this._onEndReached(distanceFromEnd)}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    fetchAllOfferProductData: state.product.fetchAllOfferProduct,
    ids: state.wishList.ids
  }),
  dispatch => bindActionCreators({
    fetchAllOfferProduct,
    toggleWishList
  }, dispatch)
)(HotOffer);
