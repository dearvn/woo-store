import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import ScrollableTabView, { ScrollableTabBar } from '../../../libs/react-native-scrollable-tab-view/index';
import Loading from '../../../components/Loading';
import commonStyles from '../../../theme/styles';
import { fetchProductByCategory } from '../../../actions/product';
import { toggleWishList } from '../../../actions/wishList';
import ProductTwoColumnItem from '../../../components/ProductTwoColumnItem';
import SearchBox from '../../../components/SearchBox';
import { COLORS } from '../../../theme/common';
import { navigationHeaderWithBackButtonV2 } from '../../../navigator';

class HomeCategories extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => {
    const title = _.get(navigation, 'state.params.title', '');
    return ({
      headerTitle: (
        <Text style={[commonStyles.titleCenter, { color: COLORS.TEXT_WHITE }]}>{title}</Text>
      ),
      ...navigationHeaderWithBackButtonV2({ navigation })
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      refreshing: false,
      searchText: ''
    };
  }

  componentDidMount() {
    const { categories, navigation, fetchProductByCategory, productByCategories } = this.props;
    const categoryId = _.get(navigation, 'state.params.categoryId');
    const isHaveSub = _.get(navigation, 'state.params.isHaveSub');
    const requesting = _.get(productByCategories, 'requesting', false);
    if (isHaveSub) {
      const categoriesData = _.find(categories.result, (category) => category.id === categoryId);
      const child = categoriesData.child;
      const firstCategory = _.get(child, '0.id');
      this.categoryIndex = firstCategory;
      const productData = _.find(productByCategories.result, (item) => item.categoryId === firstCategory);
      const products = _.get(productData, 'data', []);
      !requesting && firstCategory && !products.length && fetchProductByCategory(firstCategory);
    } else {
      const productData = _.find(productByCategories.result, (item) => item.categoryId === categoryId);
      this.categoryIndex = categoryId;
      const products = _.get(productData, 'data', []);
      !requesting && categoryId && !products.length && fetchProductByCategory(categoryId);
    }
  }

  _keyExtractor = (item, index) => item.id;

  _listFooterComponent = () => {
    const { productByCategories } = this.props;
    const requesting = _.get(productByCategories, 'requesting', false);
    return (
      <View>
        {requesting && <Loading />}
      </View>
    );
  };

  onPressItem(product) {
    const { navigation } = this.props;
    navigation.navigate('ProductDetail', { categoryId: this.categoryIndex, productId: product.id });
  }

  _renderItem = (item, index) => {
    const isLike = this.props.ids.indexOf(item.id) !== -1;
    return (
      <ProductTwoColumnItem color={COLORS.MAIN_RED} product={item} onPressItem={(product) => this.onPressItem(product)} isLike={isLike} onPressLike={(product) => this.props.toggleWishList(product)} />
    );
  };

  _renderProductByCategory(id) {
    const { productByCategories } = this.props;

    const productData = _.find(productByCategories.result, (item) => item.categoryId === id);
    const products = _.get(productData, 'data', []);
    return (
      <View style={{ flex: 1 }}>
        {this._renderSearch()}
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

  _onEndReached(distanceFromEnd) {
    if (distanceFromEnd >= 0) {
      this.loadMore();
    }
  }

  loadMore() {
    const { fetchProductByCategory, productByCategories } = this.props;
    const requesting = _.get(productByCategories, 'requesting', false);
    const productData = _.find(productByCategories.result, (item) => item.categoryId === this.categoryIndex);
    const canLoadMore = _.get(productData, 'canLoadMore', true);
    const page = _.get(productData, 'page', 1);
    !requesting && canLoadMore && fetchProductByCategory(this.categoryIndex, page + 1, 6, this.state.searchText);
  }

  _renderContent() {
    const { categories, navigation, fetchProductByCategory, productByCategories } = this.props;
    const categoryId = _.get(navigation, 'state.params.categoryId');
    const requesting = _.get(productByCategories, 'requesting', false);
    const categoriesData = _.find(categories.result, (category) => category.id === categoryId);
    const child = categoriesData.child;
    const productData = _.find(productByCategories.result, (item) => item.categoryId === this.categoryIndex);
    const products = _.get(productData, 'data', []);
    !requesting && this.categoryIndex && !products.length && fetchProductByCategory(this.categoryIndex);
    return (
      child.map(item =>
        <View key={'_renderProductByCategory' + item.id} tabLabel={item.name} style={styles.container}>
          {this._renderProductByCategory(item.id)}
        </View>
      )
    );
  }

  _onChangeTab(key) {
    const { categories, navigation, fetchProductByCategory, productByCategories } = this.props;
    const categoryId = _.get(navigation, 'state.params.categoryId');
    const categoriesData = _.find(categories.result, (category) => category.id === categoryId);
    const child = categoriesData.child;
    const newCategoryId = child[key].id;
    const requesting = _.get(productByCategories, 'requesting', false);
    const productData = _.find(productByCategories.result, (item) => item.categoryId === newCategoryId);
    const products = _.get(productData, 'data', []);
    if (newCategoryId !== this.categoryIndex) {
      this.categoryIndex = newCategoryId;
      !requesting && !products.length && fetchProductByCategory(newCategoryId);
      this.setState({ refreshing: false, searchText: '' });
    }
  }

  _onRefresh = () => {
    const { fetchProductByCategory, productByCategories } = this.props;
    const requesting = _.get(productByCategories, 'requesting', false);
    !requesting && fetchProductByCategory(this.categoryIndex);
    this.setState({ refreshing: false, searchText: '' });
  };

  searchProduct() {
    const { fetchProductByCategory } = this.props;
    fetchProductByCategory(this.categoryIndex, 1, 6, this.state.searchText);
  };

  onChangeSearchText(text) {
    this.setState({ searchText: text });
  };

  _renderSearch() {
    const { searchText } = this.state;

    return (
      <SearchBox
        ref='searchProduct'
        keyword={searchText}
        delay={1000}
        autoSearch={true}
        hideBtn={true}
        onSearch={() => this.searchProduct()}
        onChangeText={(text) => this.onChangeSearchText(text)}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const categoryId = _.get(navigation, 'state.params.categoryId');
    const isHaveSub = _.get(navigation, 'state.params.isHaveSub');

    return (
      <View style={{ flex: 1 }}>
        {
          isHaveSub
            ? <ScrollableTabView
              ref={(tabView) => { this.tabView = tabView; }}
              initialPage={this.state.tabIndex}
              onChangeTab={(arg) => this._onChangeTab(arg.i)}
              renderTabBar={() => <ScrollableTabBar
                activeTextColor={COLORS.TEXT_WHITE}
                inactiveTextColor={COLORS.TEXT_GRAY}
                underlineStyle={commonStyles.underlineTab}
                backgroundColor={COLORS.DARK_COLOR}
                tabStyle={commonStyles.tabStyle}
                style={commonStyles.tabBarStyle}
              />}
            >
              {this._renderContent()}
            </ScrollableTabView>
            : <View style={styles.container}>
              {this._renderProductByCategory(categoryId)}
            </View>
        }
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
)(HomeCategories);
