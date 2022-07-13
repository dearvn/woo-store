import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  Image,
  StatusBar,
  WebView,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import striptags from 'striptags';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from '../../../libs/react-native-scrollable-tab-view/index';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Swiper from '../../../libs/react-native-swiper/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Loading from '../../../components/Loading';
import ImageLoad from '../../../components/ImageLoad';
import CartBadgeIcon from '../../../components/CartBadgeIcon';
import ProductPrice from '../../../components/ProductPrice';
import commonStyles from '../../../theme/styles';
import { COLORS } from "../../../theme/common";
import { getProducFromCategories } from '../../../utils/general';
import { addToCart } from "../../../actions/cart";
import { fetchProductById } from "../../../actions/product";
import { toggleWishList } from "../../../actions/wishList";
import { ATTR_COLORS, PRODUCT_ATTR_COLOR, PRODUCT_ATTR_SIZE } from "../../../constants/defaultValues";

const banner = require('../../../../assets/images/banner-5.jpg');
const PRODUCT_IMAGE_HEIGHT = 300;
const NAVI_HEIGHT = 64;
const { width } = Dimensions.get('window');

class ProductDetail extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = (options) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      fullDescription: false,
      tabIndex: 0,
      webHeight: 0,
      quantity: 1,
      scrollY: new Animated.Value(0),
      attrColor: '',
      attrSize: ''
    };
    this.productInfoHeight = PRODUCT_IMAGE_HEIGHT;
  }

  componentDidMount() {
    const { navigation, productByCategories, fetchProductById } = this.props;
    const categoryId = _.get(navigation, 'state.params.categoryId');
    const productId = _.get(navigation, 'state.params.productId');
    const product = getProducFromCategories(productByCategories.result, categoryId, productId);
    if (!product) {
      fetchProductById(productId, categoryId);
    }
  }

  _renderHeaderProductImage(images) {
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-300, 0, NAVI_HEIGHT, this.productInfoHeight / 2],
      outputRange: [2, 1, 1, 0.7],
      extrapolate: 'clamp',
    });
    return (
      <Swiper
        style={styles.bannerContainer}
        showsPagination={false}
        removeClippedSubviews={false}
      >
        {
          images.map((image, index) =>
            <View key={'product' + index} style={styles.bannerContainer}>
              <Animated.Image
                source={{ uri: image.src }}
                style={[styles.bannerImage, { transform: [{ scale: imageScale }] }]}
                resizeMode={'contain'}
                resizeMethod={'resize'}
              />
            </View>
          )
        }
      </Swiper>
    )
  }

  _renderTitle(product) {
    const name = _.get(product, 'name', '');
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
        <ProductPrice product={product} showDiscount={true} />
      </View>
    )
  }

  _renderContent(product) {
    const descriptionHTML = _.get(product, 'description', '<div></div>');
    console.log("descriptionHTML", descriptionHTML);
    return (
      <ScrollableTabView
        ref={(tabView) => { this.tabView = tabView; }}
        initialPage={this.state.tabIndex}
        renderTabBar={() => <DefaultTabBar
          activeTextColor={COLORS.MAIN_COLOR}
          inactiveTextColor={COLORS.TEXT_DARK}
          underlineStyle={commonStyles.underlineTwoTab}
          backgroundColor={COLORS.BACKGROUND}
          tabStyle={commonStyles.tabTwoStyle}
          style={commonStyles.tabBarStyle}
        />}
      >
        <View tabLabel={'Description'} style={{ flex: 1 }}>
          <AutoHeightWebView source={{ html: descriptionHTML }} hasIframe={true} />
        </View>
        <View tabLabel={'Reviews'} style={{ flex: 1 }}>
          <AutoHeightWebView source={{ html: descriptionHTML }} hasIframe={true} />
        </View>
      </ScrollableTabView>
    )
  }

  addToCart(product, categoryId) {
    const { addToCart } = this.props;
    addToCart(product, this.state.quantity, categoryId);
    this.setState({ quantity: 1 });
  }

  _renderProductColor(product) {
    const productAttributes = product.attributes;
    const productColor = productAttributes.find((item) => item.name === PRODUCT_ATTR_COLOR);
    return productColor
      ? <View style={styles.rowProductColor}>
        {productColor.options.map((option, index) =>
          <TouchableOpacity
            key={`color-${index}`}
            onPress={() => this.setState({ attrColor: option.toLowerCase() })}
            style={[styles.colorContainer, { backgroundColor: ATTR_COLORS[option.toLowerCase()] }]}>
            {
              option.toLowerCase() === this.state.attrColor
              && <MaterialCommunityIcons name={'check'} color={this.state.attrColor === 'white' ? COLORS.TEXT_GRAY : COLORS.TEXT_WHITE} size={15} />
            }
          </TouchableOpacity>
        )}
      </View>
      : <View />
  }

  _renderProductSize(product) {
    const productAttributes = product.attributes;
    const productSize = productAttributes.find((item) => item.name === PRODUCT_ATTR_SIZE);
    return productSize
      ? <View style={[styles.rowProductColor, { marginBottom: 20 }]}>
        {productSize.options.map((option, index) =>
          <TouchableOpacity
            key={`size-${index}`}
            onPress={() => this.setState({ attrSize: option.toLowerCase() })}
            style={[styles.sizeContainer, { backgroundColor: option.toLowerCase() === this.state.attrSize ? COLORS.HIGH_LIGHT : 'transparent' }]}>
            <Text style={[styles.lblSize, { color: option.toLowerCase() === this.state.attrSize ? COLORS.TEXT_WHITE : COLORS.TEXT_GRAY }]}>{option.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
      </View>
      : <View />
  }

  render() {
    const { navigation, productByCategories } = this.props;
    const categoryId = _.get(navigation, 'state.params.categoryId');
    const productId = _.get(navigation, 'state.params.productId');
    const product = getProducFromCategories(productByCategories.result, categoryId, productId);
    const isLike = this.props.ids.indexOf(productId) !== -1;

    return (
      <View style={{ flex: 1, backgroundColor: COLORS.BACKGROUND }}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
            <Ionicons style={styles.backIcon} name="ios-arrow-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.titleCenter} numberOfLines={1}>{false && _.get(product, 'name', '')}</Text>
          <View style={styles.headerRightContainer}>
            <TouchableOpacity style={styles.headerRight} onPress={() => this.props.toggleWishList(product)}>
              {
                isLike
                  ? <MaterialCommunityIcons name="heart" size={22} color={COLORS.HIGH_LIGHT} />
                  : <MaterialCommunityIcons name="heart-outline" size={22} color={COLORS.TEXT_GRAY} />
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerRight} onPress={() => navigation.navigate('MyCart')}>
              <CartBadgeIcon size={20} active={false} isHeader={true} />
            </TouchableOpacity>
          </View>
        </View>
        <Animated.ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.container]}
          scrollEventThrottle={1}
          onScroll={(event) => {
            this.state.scrollY.setValue(event.nativeEvent.contentOffset.y);
          }}>
          {
            product
              ? <View style={styles.container}>
                {this._renderHeaderProductImage(product.images)}
                {this._renderTitle(product)}
                {this._renderProductColor(product)}
                {this._renderProductSize(product)}
                {this._renderContent(product)}
              </View>
              : <Loading />
          }
        </Animated.ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.footerQualityContainer} onPress={() => this.setState({ quantity: this.state.quantity + 1 })}>
            <Text style={styles.lblQuality}>Qty: {this.state.quantity}</Text>
            <MaterialCommunityIcons name={"chevron-down"} size={20} color={COLORS.TEXT_GRAY} style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButtonContainer} onPress={() => this.addToCart(product, categoryId)}>
            <Text style={styles.lblAddToCart}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    productByCategories: state.product.productByCategories,
    ids: state.wishList.ids
  }),
  dispatch => bindActionCreators({
    addToCart,
    fetchProductById,
    toggleWishList
  }, dispatch)
)(ProductDetail);
