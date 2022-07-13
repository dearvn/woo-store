import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import commonStyles from '../../../theme/styles';
import { COLORS } from '../../../theme/common';
import ScrollableTabView, { ScrollableTabBar, } from '../../../libs/react-native-scrollable-tab-view/index';
import MyOrder from '../../../components/MyOrder';
import CustomText from '../../../components/CustomText';
import ProfileSaved from '../../../components/ProfileSaved';
import ProfileInfo from '../../../components/ProfileInfo';
import { addToCart } from "../../../actions/cart";
import { fetchOrder, userLogout, stripeDeleteCard } from "../../../actions/user";
import { toggleWishList } from "../../../actions/wishList";

import styles from './styles';
import { navigationHeaderWithBackButtonV2 } from '../../../navigator';

class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => {
    return ({
      headerTitle: (
        <CustomText style={[commonStyles.titleCenter, { color: COLORS.TEXT_WHITE }]}>Profile</CustomText>
      ),
      ...navigationHeaderWithBackButtonV2({ navigation })
    });
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchOrder, user, navigation, userLogout } = this.props;
    if (!user || !user.id) {
      return userLogout();
    }
    const goToHistoryOrder = _.get(navigation, 'state.params.goToHistoryOrder');
    fetchOrder(user.id).then(() => {
      if (goToHistoryOrder) {
        setTimeout(() => this.tabView.goToPage(1), 500);
      }
    });
  }

  render() {
    return (
      <ScrollableTabView
        ref={(tabView) => { this.tabView = tabView; }}
        renderTabBar={() => <ScrollableTabBar
          activeTextColor={COLORS.MAIN_RED}
          inactiveTextColor={COLORS.TEXT_DARK}
          underlineStyle={styles.underlineStyle}
          backgroundColor={COLORS.BACKGROUND}
          tabStyle={commonStyles.tabStyle}
          style={commonStyles.tabBarStyle}
        />}
      >
        <ProfileInfo
          tabLabel="Profile"
          mainColor={COLORS.MAIN_RED}
          navigation={this.props.navigation}
          stripeDeleteCard={(stripeCustomerId, stripeCardId) => this.props.stripeDeleteCard(stripeCustomerId, stripeCardId)}
          user={this.props.user} />
        <MyOrder
          orders={this.props.orders}
          tabLabel="My Orders" />
        <ProfileSaved
          tabLabel="Saved"
          address={this.props.address} />
      </ScrollableTabView>
    );
  }
}

export default connect(
  state => ({
    user: state.user.login.result,
    wishList: state.wishList,
    address: state.user.address,
    orders: state.user.order.result
  }),
  dispatch => bindActionCreators({
    addToCart,
    fetchOrder,
    userLogout,
    toggleWishList,
    stripeDeleteCard
  }, dispatch)
)(Profile);
