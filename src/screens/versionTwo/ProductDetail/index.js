import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  Image,
  StatusBar,
  Platform,
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
import * as Animatable from 'react-native-animatable';

import styles from './styles';
import Loading from '../../../components/Loading';
import ImageLoad from '../../../components/ImageLoad';
import CartBadgeIcon from '../../../components/CartBadgeIcon';
import ProductPrice from '../../../components/ProductPrice';
import commonStyles from '../../../theme/styles';
import { COLORS } from "../../../theme/common";
import { getProducFromCategories } from '../../../utils/general';
import { addToCart } from "../../../actions/cart";
import { fetchProductById, fetchReviewByProductId } from "../../../actions/product";
import { toggleWishList } from "../../../actions/wishList";
import { ATTR_COLORS, PRODUCT_ATTR_COLOR, PRODUCT_ATTR_SIZE } from "../../../constants/defaultValues";
import CustomText from '../../../components/CustomText';
import ReviewTab from './ReviewTab';
import { navigationHeaderWithBackButtonV2 } from '../../../navigator';

const banner = require('../../../../assets/images/banner-5.jpg');
const PRODUCT_IMAGE_HEIGHT = 300;
const NAVI_HEIGHT = 64;
const { width } = Dimensions.get('window');

class ProductDetail extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => {
    return ({
      headerTitle: (
        <CustomText style={[commonStyles.titleCenter, { color: COLORS.TEXT_WHITE }]}>Product Detail</CustomText>
      ),
      ...navigationHeaderWithBackButtonV2({ navigation })
    });
  };

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
    const { navigation, productByCategories, fetchProductById, fetchReviewByProductId } = this.props;
    const categoryId = _.get(navigation, 'state.params.categoryId');
    const productId = _.get(navigation, 'state.params.productId');
    const product = getProducFromCategories(productByCategories.result, categoryId, productId);
    if (!product) {
      fetchProductById(productId, categoryId)
        .then(() => {
          fetchReviewByProductId(productId, categoryId);
        });
    } else {
      fetchReviewByProductId(productId, categoryId);
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
            <View key={'renderHeaderProductImage-' + index} style={styles.bannerContainer}>
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
        <CustomText style={styles.title}>{name}</CustomText>
        <ProductPrice product={product} showDiscount={true} />
      </View>
    )
  }

  _renderContent(product) {
    const descriptionHTML = _.get(product, 'description', '<div></div>');
    return (
      <ScrollableTabView
        ref={(tabView) => { this.tabView = tabView; }}
        initialPage={this.state.tabIndex}
        renderTabBar={() => <DefaultTabBar
          activeTextColor={COLORS.MAIN_RED}
          inactiveTextColor={COLORS.TEXT_DARK}
          underlineStyle={[commonStyles.underlineTwoTab, { backgroundColor: COLORS.MAIN_RED }]}
          backgroundColor={COLORS.BACKGROUND}
          tabStyle={commonStyles.tabTwoStyle}
          style={commonStyles.tabBarStyle}
        />}
      >
        <View tabLabel={'Description'} style={{ flex: 1 }}>
          <AutoHeightWebView scalesPageToFit={Platform.OS === 'android'} source={{ html: descriptionHTML }} hasIframe={true} />
        </View>
        <View tabLabel={'Reviews'} style={{ flex: 1 }}>
          { this._renderReview() }
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
            <CustomText style={[styles.lblSize, { color: option.toLowerCase() === this.state.attrSize ? COLORS.TEXT_WHITE : COLORS.TEXT_GRAY }]}>{option.toUpperCase()}</CustomText>
          </TouchableOpacity>
        )}
      </View>
      : <View />
  }

  _renderDetail (product) {
    const description = striptags(product.description);
    const isLike = this.props.ids.indexOf(product.id) !== -1;

    return (
      <View key={"render-detail"} style={styles.productContainer}>
        <CustomText style={[styles.productTitle]}>{product.name}</CustomText>
        <View style={styles.description}>
          <CustomText style={[styles.productSubTitle, {color: '#c3c2c2', fontSize: 12}]} numberOfLines={3}>{description}</CustomText>
        </View>
        <View style={styles.divider} />

        <ProductPrice product={product} priceTextStyle={{ color: COLORS.MAIN_RED }} showDiscount={true} />
        <View style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: 'center',
          marginTop: 2,
          marginBottom: 4,
          flexWrap: "wrap"
        }}>
          <CustomText style={[styles.productSubTitle, { marginRight: 3 }]}>SKU:</CustomText>
          <CustomText
            style={[styles.productSubTitle, { marginRight: 5, color: COLORS.TEXT_DARK }]}>{product.sku && product.sku.length ? product.sku : 'N/A'}</CustomText>
          <CustomText style={[styles.productSubTitle, { marginRight: 3 }]}>Categories:</CustomText>
          {product.categories && product.categories.map((item, index) => {
            return <View
              key={"catelogy-" + item.id}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: 'center',
                marginTop: 2,
                marginBottom: 4
              }}>
              <CustomText style={[styles.productSubTitle, {color: COLORS.TEXT_DARK}]}>{item.name}</CustomText>
              {index !== product.categories.length - 1 && <CustomText>, </CustomText>}
            </View>
          })}
        </View>

        <TouchableOpacity style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: 'center'
        }} onPress={() => this.props.toggleWishList(product)}>
          {
            isLike
              ? <MaterialCommunityIcons name="heart" size={22} color={COLORS.MAIN_RED} />
              : <MaterialCommunityIcons name="heart-outline" size={22} color={COLORS.TEXT_GRAY} />
          }
          <CustomText style={[styles.productSubTitle, {color: COLORS.TEXT_DARK, marginHorizontal: 5}]}>Add to wishlist</CustomText>
        </TouchableOpacity>

        {
          !!Number(product.average_rating) &&
          <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: 'center',
            marginTop: 2,
            marginBottom: 20,
            flexWrap: "wrap"
          }}>
            <View style={{
              flexDirection: 'row',
              width: 50,
              "borderRadius": 5,
              "backgroundColor": COLORS.RED_HIGH_LIGHT,
              "justifyContent": "center",
              "alignItems": "center",
              padding: 2.5
            }}>
              <CustomText style={[styles.productSubTitle, {color: 'white'}]}>{Number(product.average_rating).toFixed(1)}</CustomText>
              <Ionicons name='ios-star' color={'white'}/>
            </View>
            <CustomText style={{ ...styles.productSubTitle, color: '#878585' }}>  {product.rating_count} rating &
              reviews</CustomText>
          </View>
        }
      </View>
    )
  }

  sendReview (product) {
    // const image = product.images[0];
    // const imageSource = { uri: getProductImage(image.src, Styles.width) }
    // const config = {
    //   id: product.id,
    //   name: product.name,
    //   image: imageSource
    // };
    // BlockTimer.execute(
    //   () => {
    //     this.props.navigation.navigate("WriteReviewScreen", { config });
    //   }, 500);
  };

  _renderReview() {
    const { navigation, productByCategories } = this.props;
    const categoryId = _.get(navigation, 'state.params.categoryId');
    const productId = _.get(navigation, 'state.params.productId');
    const product = getProducFromCategories(productByCategories.result, categoryId, productId);
    return (
    <View key={"render-reviews"} style={[styles.productContainer, { paddingHorizontal: 20 }]}>
      <View key={"review-container"} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <CustomText style={[styles.productTitle, { color: 'black', fontSize: 18, marginBottom: 10 }]}>Rating & Reviews</CustomText>
        {/*<TouchableOpacity*/}
          {/*key={"write-review"}*/}
          {/*onPress={() => this.sendReview(product)}*/}
          {/*style={{*/}
            {/*marginBottom: 14,*/}
            {/*width: 120,*/}
            {/*borderRadius: 30,*/}
            {/*borderColor: COLORS.MAIN_RED,*/}
            {/*borderWidth: 1,*/}
            {/*justifyContent: 'center',*/}
            {/*alignItems: 'center'*/}
          {/*}}>*/}
          {/*<CustomText style={[styles.productSubTitle, { color: COLORS.MAIN_RED }]}>Write Review</CustomText>*/}
        {/*</TouchableOpacity>*/}
      </View>

      <ReviewTab product={product}/>
    </View>)
  }

  render() {
    const { navigation, productByCategories } = this.props;
    const categoryId = _.get(navigation, 'state.params.categoryId');
    const productId = _.get(navigation, 'state.params.productId');
    const product = getProducFromCategories(productByCategories.result, categoryId, productId);

    return (
      <View style={{ flex: 1, backgroundColor: COLORS.BACKGROUND }}>
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
           {this._renderDetail(product)}
           {this._renderProductColor(product)}
           {this._renderProductSize(product)}
           {this._renderContent(product)}
           </View>
           : <Loading />
          }
        </Animated.ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.footerQualityContainer} onPress={() => this.setState({ quantity: this.state.quantity + 1 })}>
            <CustomText style={styles.lblQuality}>Qty: {this.state.quantity}</CustomText>
            <MaterialCommunityIcons name={"chevron-down"} size={20} color={COLORS.TEXT_GRAY} style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButtonContainer} onPress={() => this.addToCart(product, categoryId)}>
            <CustomText style={styles.lblAddToCart}>ADD TO CART</CustomText>
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
    toggleWishList,
    fetchReviewByProductId
  }, dispatch)
)(ProductDetail);
