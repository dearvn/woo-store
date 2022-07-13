import React, { Component } from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Images from '../constants/images';
import { COLORS } from '../theme/common';
import { getMetaData } from "../utils/general";
import CustomText from './CustomText';

const { width } = Dimensions.get('window');
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerView: {
    height: 150,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    resizeMode: 'cover',
    borderColor: 'green',
    borderWidth: 1
  },
  viewTabInfo: {
    height: 50,
    width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconTabInfo: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginLeft: 18,
    tintColor: COLORS.MAIN_COLOR
  },
  textInfo: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: COLORS.TEXT_DARK,
    marginLeft: 18
  },
  separatorView: {
    width,
    height: 1,
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT
  },
  cardWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1
  },
  cardInfoBlockWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    height: 60,
    marginLeft: 20
  },
  cardInfoWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  cardInfoLabel: {
    fontSize: 14,
    color: '#484848'
  },
  cardInfoValue: {
    fontSize: 17,
    color: '#484848'
  },
  btnDelete: {
    borderRadius: 4,
    backgroundColor: '#fe6c6c',
    paddingVertical: 15
  },
  deleteText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center'
  },
  lblNoPayment: {
    fontSize: 14,
    color: '#484848'
  },
  addPaymentTitleWrapper: {
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 40
  },
  lblAddPayment: {
    fontSize: 19,
    color: '#484848'
  },
  addCardContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const cardIcons = {
  'Visa': Images.CARD_VISA,
  'MasterCard': Images.CARD_MASTER,
  'American Express': Images.CARD_AMERICAN,
  'Diners Club': Images.CARD_DINERS,
  'JCB': Images.CARD_JCB,
  'Discover': Images.CARD_DISCOVER,
  'default': Images.CARD_DEFAULT
};

class ProfileInfo extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    user: PropTypes.object,
    mainColor: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  renderTabInfo(icon, info) {
    const { mainColor } = this.props;
    const color = mainColor ? mainColor : COLORS.MAIN_COLOR;
    return (
      <View style={styles.viewTabInfo}>
        <Image
          source={icon}
          style={[styles.iconTabInfo, { tintColor: color }]}
        />
        <CustomText weight={400} style={styles.textInfo}>{info}</CustomText>
      </View>
    )
  }

  _renderCard(cardInfo, customerInfo) {
    return (
      <View style={styles.cardWrapper}>
        <View style={{ marginBottom: 30, flexDirection: 'row' }}>
          <Image source={cardIcons[cardInfo['brand']] || cardIcons.default} style={{ width: 76, height: 50 }} />

          <View style={styles.cardInfoBlockWrapper}>
            <View style={styles.cardInfoWrapper}>
              <CustomText weight={400} style={styles.cardInfoLabel}>Credit</CustomText>
              <CustomText weight={400} style={styles.cardInfoValue}>••••{cardInfo['last4']}</CustomText>
            </View>

            <View style={styles.cardInfoWrapper}>
              <CustomText weight={400} style={styles.cardInfoLabel}>Expiry date</CustomText>
              <CustomText weight={400} style={styles.cardInfoValue}>{cardInfo['exp_month']}/{cardInfo['exp_year']}</CustomText>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnDelete}
          onPress={() => this.props.stripeDeleteCard(customerInfo.id, cardInfo.id)}>
          <CustomText weight={600} style={styles.deleteText}>DELETE CARD</CustomText>
        </TouchableOpacity>
      </View>
    );
  }

  _renderAddCard() {
    const { navigation } = this.props;
    const screenToGoBack = _.get(navigation, 'state.key');
    return (
      <View style={styles.addCardContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileAddCard', { screenToGoBack })}>
          <View style={styles.addPaymentTitleWrapper}>
            <CustomText weight={400} style={styles.lblAddPayment}>Add card</CustomText>
            <MaterialCommunityIcons name={'chevron-right'} color={COLORS.TEXT_DARK} size={30} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const user = this.props.user;
    const metaData = _.get(user, 'meta_data', []);
    const card = getMetaData(metaData, 'stripeCard', null);
    const customer = getMetaData(metaData, 'stripeCustomer', null);
    const cardInfo = JSON.parse(card);
    const customerInfo = JSON.parse(customer);
    const avatar = (user && user.avatar) ? { uri: user.avatar } : Images.BANNER;
    const firstname = _.get(user, 'firstname', '');
    const lastname = _.get(user, 'lastname', '');
    const displayname = _.get(user, 'displayname', '');
    let userName = displayname;
    if (!displayname) {
      userName = firstname + ' ' + lastname;
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerView}>
          <Image
            style={styles.headerAvatar}
            source={avatar}
          />
        </View>
        <View style={styles.separatorView} />
        {this.renderTabInfo(Images.PROFILE_ICON, userName)}
        <View style={styles.separatorView} />
        {this.renderTabInfo(Images.ICON_EMAIL, _.get(user, 'email', ''))}
        <View style={styles.separatorView} />
        {this.renderTabInfo(Images.ICON_PHONE, _.get(user, 'billing.phone', ''))}
        <View style={styles.separatorView} />
        {/*Do later*/}
        {/*<TouchableOpacity style={styles.viewTabInfo}>*/}
          {/*{this.renderTabInfo(Images.ICON_PASSWORD, "Change Password")}*/}
        {/*</TouchableOpacity>*/}
        <View style={styles.separatorView} />
        {
          card
            ? this._renderCard(cardInfo, customerInfo)
            : this._renderAddCard()
        }
      </ScrollView>
    )
  }
}

export default ProfileInfo;