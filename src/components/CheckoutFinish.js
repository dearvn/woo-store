import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image, StyleSheet,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import Images from '../constants/images';
import { COLORS } from '../theme/common';
import CustomText from './CustomText';

export default class CheckoutFinish extends Component {
  
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  
  constructor(props) {
    super(props);
  }
  
  shoppingNow() {
    this.props.navigation.navigate('Home');
  }
  
  goToHistoryOrder() {
    this.props.navigation.navigate('Profile', { goToHistoryOrder: true });
  }
  
  render() {
    const { navigation, orderId, createdAt } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.fullWidthCenter}>
            <CustomText weight={900} style={styles.lblThanks}>THANK YOU</CustomText>
            <CustomText weight={400} style={styles.lblForYourOrder}>FOR YOUR ORDER</CustomText>
          </View>
          <CustomText weight={400} style={styles.lblOrderNumber}>
            Order number: <CustomText weight={700} style={styles.lblOrderNumberBold}>#{orderId}</CustomText>
          </CustomText>
          <Image
            source={Images.CHECKOUT_CAR}
            style={styles.image}
            resizeMethod={'resize'}
          />
          <View style={styles.fullWidthCenter}>
            <CustomText weight={700} style={styles.lblEstimated}>ESTIMATED DELIVERY</CustomText>
            <CustomText weight={400}
                        style={styles.lblForYourOrder}>{moment(createdAt).format('DD/MM/YYYY')}</CustomText>
          </View>
          <TouchableOpacity style={styles.trackOrderContainer} onPress={() => this.goToHistoryOrder()}>
            <CustomText weight={700} style={styles.lblTrackOrder}>TRACK YOUR ORDER HERE</CustomText>
          </TouchableOpacity>
          <CustomText weight={400} style={[styles.lblForYourOrder, { marginBottom: 30 }]}>or</CustomText>
        </View>
        <TouchableOpacity
          style={styles.buttonNext}
          onPress={() => this.shoppingNow()}
        >
          <CustomText weight={700} style={styles.textNext}>CONTINUE TO PAYMENT</CustomText>
          <Ionicons style={styles.nextIcon} name="ios-arrow-round-forward-outline" color={COLORS.TEXT_WHITE} size={30}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.BACKGROUND
  },
  fullWidthCenter: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND
  },
  lblThanks: {
    color: COLORS.HIGH_LIGHT,
    backgroundColor: 'transparent',
    fontSize: 30,
    marginTop: 60
  },
  lblForYourOrder: {
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent',
    fontSize: 17
  },
  lblOrderNumber: {
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent',
    fontSize: 15
  },
  lblOrderNumberBold: {
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent',
    fontSize: 15
  },
  image: {
    width: width / 3 * 2,
    resizeMode: 'contain'
  },
  lblEstimated: {
    color: COLORS.HIGH_LIGHT,
    backgroundColor: 'transparent',
    fontSize: 20
  },
  trackOrderContainer: {
    width: width - 40,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.TEXT_DARK
  },
  lblTrackOrder: {
    color: COLORS.TEXT_WHITE,
    backgroundColor: 'transparent',
    fontSize: 20
  },
  buttonNext: {
    height: 50,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MAIN_RED
  },
  textNext: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  nextIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  }
});