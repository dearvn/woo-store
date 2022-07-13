import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WishList from '../../../components/WishList';
import { addToCart } from "../../../actions/cart";
import { userLogout } from "../../../actions/user";
import { toggleWishList } from "../../../actions/wishList";
import { navigationHeaderWithoutBackButtonV2 } from '../../../navigator';
import { COLORS } from '../../../theme/common';

class Wishlist extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  
  static navigationOptions = ({ navigation }) => navigationHeaderWithoutBackButtonV2({ navigation });
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const { user, userLogout } = this.props;
    if (!user || !user.id) {
      return userLogout();
    }
  }
  
  render() {
    return (
      <WishList
        navigation={this.props.navigation}
        wishList={this.props.wishList}
        toggleWishList={this.props.toggleWishList}
        mainColor={COLORS.MAIN_RED}
        addToCart={this.props.addToCart} />
    );
  }
}

export default connect(
  state => ({
    user: state.user.login.result,
    wishList: state.wishList
  }),
  dispatch => bindActionCreators({
    addToCart,
    userLogout,
    toggleWishList
  }, dispatch)
)(Wishlist);