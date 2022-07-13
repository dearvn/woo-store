import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  StatusBar
} from 'react-native';

import Swiper from '../../../libs/react-native-swiper/index';
import MyText from '../../../components/CustomText';

import styles from './styles';
import { fetchCategories, fetchCoupons, fetchShippingMethod } from "../../../actions/product";
import { validateLoggedIn } from "../../../actions/user";

import Images from '../../../constants/images';
import { COLORS } from '../../../theme/common';

const { width, height } = Dimensions.get('window');

class Splash extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { fetchCategories, validateLoggedIn, fetchCoupons, fetchShippingMethod } = this.props;
    fetchCategories();
    fetchCoupons();
    fetchShippingMethod();
    validateLoggedIn();
  }

  _navigateToMain() {
    let resetData = {
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
    };
    this.props.navigation.dispatch(NavigationActions.reset(resetData));
  }

  // checkLoggedIn() {
  //   this.props.navigation.navigate('Signin');
  // }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} autoplayTimeout={3}>
          <View style={styles.slide}>
            <Image
              source={Images.SPLASH}
              resizeMethod={'resize'}
              style={styles.swiperImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={Images.BANNER_DEMO}
              resizeMethod={'resize'}
              style={styles.swiperImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={Images.SPLASH}
              resizeMethod={'resize'}
              style={styles.swiperImage}
            />
          </View>
        </Swiper>
        <View style={styles.viewUnder}>
          <Text style={styles.mainText}>Welcome to <Text style={styles.boldText}>Shop Cart</Text></Text>
          {/* Shortline view */}
          <View style={styles.shortline} />
          <Text style={styles.description}>Mot so text tum lum ta la ne moi nguoi co tahy lk, lol lol lol lol</Text>
        </View>
        <TouchableOpacity style={styles.buttonGetstarted}
                          onPress={() => this._navigateToMain()}
        >
          <Text style={styles.textGetstarted}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => bindActionCreators({
    fetchCategories,
    validateLoggedIn,
    fetchCoupons,
    fetchShippingMethod
  }, dispatch)
)(Splash);