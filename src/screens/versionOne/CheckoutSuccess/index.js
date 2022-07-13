import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import styles from './styles';
import Images from '../../../constants/images';
import { COLORS } from "../../../theme/common";

class CheckoutSuccess extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  shoppingNow() {
    this.props.navigation.navigate('MainNavigator');
  }

  goToHistoryOrder() {
    this.props.navigation.navigate('Profile', { goToHistoryOrder: true });
  }

  render() {
    const { navigation } = this.props;
    const orderId = _.get(navigation, 'state.params.orderId');
    const createdAt = _.get(navigation, 'state.params.createdAt');
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.fullWidthCenter}>
            <Text style={styles.lblThanks}>THANK YOU</Text>
            <Text style={styles.lblForYourOrder}>FOR YOUR ORDER</Text>
          </View>
          <Text style={styles.lblOrderNumber}>
            Order number: <Text style={styles.lblOrderNumberBold}>#{orderId}</Text>
          </Text>
          <Image
            source={Images.CHECKOUT_CAR}
            style={styles.image}
            resizeMethod={'resize'}
          />
          <View style={styles.fullWidthCenter}>
            <Text style={styles.lblEstimated}>ESTIMATED DELIVERY</Text>
            <Text style={styles.lblForYourOrder}>{moment(createdAt).format('DD/MM/YYYY')}</Text>
          </View>
          <TouchableOpacity style={styles.trackOrderContainer} onPress={() => this.goToHistoryOrder()}>
            <Text style={styles.lblTrackOrder}>TRACK YOUR ORDER HERE</Text>
          </TouchableOpacity>
          <Text style={[styles.lblForYourOrder, { marginBottom: 30 }]}>or</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonNext}
          onPress={() => this.shoppingNow()}
        >
          <Text style={styles.textNext}>CONTINUE TO PAYMENT</Text>
          <Ionicons style={styles.nextIcon} name="ios-arrow-round-forward-outline" color={COLORS.TEXT_WHITE} size={30} />
        </TouchableOpacity>
      </View>
    )
  }
}


export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({
  }, dispatch)
)(CheckoutSuccess);