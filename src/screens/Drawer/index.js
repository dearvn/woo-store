import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DrawerComponent from '../../components/Drawer';
import { userLogout } from '../../actions/user';

class Drawer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  
  logout = () => {
    this.props.userLogout(_.get(this.props, 'user.result.provider'));
  };
  
  render() {
    const { navigation, wishListCount, orderCount } = this.props;
    return <DrawerComponent
      navigation={navigation}
      onLogout={this.logout}
      userProfile={_.get(this.props, 'user.result', {})}
      wishListCount={wishListCount}
      orderCount={orderCount}
    />
  }
}

export default connect(
  state => ({
    user: state.user.login,
    wishListCount: state.wishList.ids.length,
    orderCount: state.cart.totals
  }),
  dispatch => bindActionCreators({ userLogout }, dispatch)
)(Drawer);