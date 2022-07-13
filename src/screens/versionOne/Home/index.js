import React, { Component } from 'react';
import _ from 'lodash';
import { View, Image, StatusBar, FlatList, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Swiper from '../../../libs/react-native-swiper/index';

import styles from './styles';
import Loading from '../../../components/Loading';
import CategoryTwoColumnItem from '../../../components/CategoryTwoColumnItem';

import { navigationHeaderWithoutBackButton } from "../../../navigator";
import { COLORS } from "../../../theme/common";

const banner = require('../../../../assets/images/banner-5.jpg');
const bannerTwo = require('../../../../assets/images/banner-2.jpg');
const bannerThree = require('../../../../assets/images/banner-3.jpg');

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => navigationHeaderWithoutBackButton({ navigation });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
      <CategoryTwoColumnItem category={item} onPressItem={() => this.onPressCategories(item.id, item.name, isHaveSub)} />
    )
  };

  render() {
    let categories = _.get(this.props, 'categories.result');
    categories = categories && categories.map(item => {
      if (!item.image) {
        _.set(item, 'image.src', 'http://lorempixel.com/400/400/fashion');
      }
      return item;
    });
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.container]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
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
        <FlatList
          style={{ marginVertical: 5 }}
          data={categories}
          keyExtractor={this._keyExtractor}
          extraData={categories}
          numColumns={2}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => this._renderItem(item, index)}
          ListFooterComponent={this._listFooterComponent()}
        />

      </ScrollView>
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
