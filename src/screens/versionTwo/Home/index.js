import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  Image,
  StatusBar,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Swiper from '../../../libs/react-native-swiper/index';

import styles from './styles';
import Loading from '../../../components/Loading';
import CategoryOneColumnItem from '../../../components/CategoryOneColumnItem';
import SearchBox from '../../../components/SearchBox';
import CustomText from '../../../components/CustomText';
import ImageLoad from '../../../components/ImageLoad';

import ProductCard from './ProductCard';

import { navigationHeaderWithoutBackButtonV2 } from "../../../navigator";
import { COLORS } from "../../../theme/common";

const banner = require('../../../../assets/images/banner-5.jpg');
const bannerTwo = require('../../../../assets/images/banner-2.jpg');
const bannerThree = require('../../../../assets/images/banner-3.jpg');

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => navigationHeaderWithoutBackButtonV2({ navigation });

  constructor(props) {
    super(props);
  }

  _keyExtractor = (item, index) => item.id;

  _listFooterComponent = () => {
    const { categories } = this.props;
    return (
      <View>
        {categories.requesting && <Loading />}
      </View>
    );
  };

  onPressCategories (id, name, isHaveSub) {
    const { navigation } = this.props;
    navigation.navigate('HomeCategories', { categoryId: id, title: name, isHaveSub });
  }

  _renderItem = (item, index) => {
    const isHaveSub = !!item.child;
    return (
      <CategoryOneColumnItem category={item} onPressItem={() => this.onPressCategories(item.id, item.name, isHaveSub)} />
    )
  };

  _renderListCategory(categories) {

    return (
      <View style={styles.categoriesContainer}>
        <View style={styles.headerContainer}>
          <CustomText style={styles.title} weight={'600'}>List category</CustomText>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Categories')}>
            <CustomText style={styles.link} weight={'500'}>View all</CustomText>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ marginVertical: 5, flex: 1 }}
          data={categories}
          contentContainerStyle={[styles.fullWidth, { marginBottom: 5 }]}
          keyExtractor={this._keyExtractor}
          extraData={categories}
          horizontal={true}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => {
            const categoryId = _.get(item, 'id');
            const image = { uri: _.get(item, 'image.src') };
            const name = _.get(item, 'name');
            const isHaveSub = !!item.child && item.child.length > 1;
            return (
              <TouchableOpacity style={styles.categoryContainer} key={'category-' + index} onPress={() => this.onPressCategories(categoryId, name, isHaveSub)}>
                <CustomText style={styles.subTitle} numberOfLines={1}  weight={'500'}>{name}</CustomText>
                <ImageLoad
                  style={styles.image}
                  loadingStyle={{ size: 'small', color: COLORS.MAIN_COLOR }}
                  source={image}
                  resizeMethod={'resize'}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  _renderIntroCategory(categories) {

    return (
      <FlatList
        style={{ marginTop: 20 }}
        data={categories}
        contentContainerStyle={[styles.fullWidth, { marginBottom: 5 }]}
        keyExtractor={this._keyExtractor}
        extraData={categories}
        removeClippedSubviews={false}
        renderItem={({ item, index }) => {
          const { navigation } = this.props;
          const categoryId = _.get(item, 'id');
          const name = _.get(item, 'name');
          const isHaveSub = !!item.child && item.child.length > 1;
          return (
            <ProductCard
              key={'card-' + index}
              isEnd={index === categories.length - 1}
              navigation={navigation}
              categoryId={categoryId}
              title={name}
              viewAll={() => this.onPressCategories(categoryId, name, isHaveSub)}
            />
          );
        }}
      />
    )
  }

  onPressCategories (id, name, isHaveSub) {
    const { navigation } = this.props;
    navigation.navigate('HomeCategories', { categoryId: id, title: name, isHaveSub });
  }

  render() {
    let categories = _.get(this.props, 'categories.result');
    categories = categories && categories.map(item => {
      if (!item.image) {
        _.set(item, 'image.src', 'http://lorempixel.com/400/400/fashion');
      }
      return item;
    });
    return (
      <View style={{ flex: 1 }} contentContainerStyle={[styles.container]}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Search')}>
          <View style={styles.searchContainer} pointerEvents='none'>
            <SearchBox
              ref='searchProduct'
              keyword={''}
              delay={1000}
              autoSearch={false}
              hideBtn={true}
              onSearch={() => {}}
              onChangeText={() => {}}
            />
          </View>
        </TouchableOpacity>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.container]}>
          <View style={styles.bannerContainer}>
            <Swiper
              style={styles.bannerContainer}
              autoplay={true}
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.dotStyle}
              removeClippedSubviews={false}
              dotColor={COLORS.TEXT_GRAY}
              activeDotColor={COLORS.TEXT_WHITE}
            >
              <View style={styles.bannerContainer}><Image source={bannerThree} style={styles.bannerImage} resizeMethod={'resize'} /></View>
              <View style={styles.bannerContainer}><Image source={bannerTwo} style={styles.bannerImage} resizeMethod={'resize'} /></View>
              <View style={styles.bannerContainer}><Image source={banner} style={styles.bannerImage} resizeMethod={'resize'} /></View>
            </Swiper>
          </View>
          { this._renderListCategory(categories)}
          { this._renderIntroCategory(categories && categories.length && categories.slice(0, 5))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    categories: state.product.categories
  }),
  dispatch => bindActionCreators({
  }, dispatch)
)(Home);
