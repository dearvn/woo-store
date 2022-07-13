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
import WishList from '../../../components/WishList';
import ProfileSaved from '../../../components/ProfileSaved';
import ProfileInfo from '../../../components/ProfileInfo';
import { addToCart } from "../../../actions/cart";
import { fetchOrder, userLogout, stripeDeleteCard } from "../../../actions/user";
import { toggleWishList } from "../../../actions/wishList";

import styles from './styles';

class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
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
          activeTextColor={COLORS.MAIN_COLOR}
          inactiveTextColor={COLORS.TEXT_DARK}
          underlineStyle={styles.underlineStyle}
          backgroundColor={COLORS.BACKGROUND}
          tabStyle={commonStyles.tabStyle}
          style={commonStyles.tabBarStyle}
        />}
      >
        <ProfileInfo
          tabLabel="Profile"
          navigation={this.props.navigation}
          stripeDeleteCard={(stripeCustomerId, stripeCardId) => this.props.stripeDeleteCard(stripeCustomerId, stripeCardId)}
          user={this.props.user} />
        <MyOrder
          orders={this.props.orders}
          tabLabel="My Orders" />
        <WishList
          tabLabel="Wishllist"
          navigation={this.props.navigation}
          wishList={this.props.wishList}
          toggleWishList={this.props.toggleWishList}
          addToCart={this.props.addToCart} />
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