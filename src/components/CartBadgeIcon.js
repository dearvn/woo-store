import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';

import Images from '../constants/images';
import { COLORS } from "../theme/common";
import CustomText from './CustomText';

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerWrap: {
    margin: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: COLORS.TEXT_GRAY
  },
  image: {
    width: '100%',
    height: '100%'
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: COLORS.HIGH_LIGHT,
    width: 16,
    height: 16,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lblBadge: {
    fontSize: 10,
    color: COLORS.TEXT_WHITE
  }
};

class CartBadgeIcon extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    isHeader: PropTypes.bool,
    textColor: PropTypes.string
  };

  render() {
    const { active, size, number, isHeader, bgColor, icon, textColor } = this.props;
    let source = active ? Images.CART_ICON : Images.CART_INACTIVE_ICON;
    if (isHeader) {
      source = Images.CART_HEADER
    }
    return (
      <View style={[styles.container, { height: size, width: size }]}>
        {
          icon
            ? icon
            : <Image source={source} style={{ width: size, height: size, resizeMode: 'contain' }} />
        }
        {
          !!number &&
          <View style={[styles.badge, { backgroundColor: bgColor ? bgColor : COLORS.HIGH_LIGHT }]}>
            <CustomText style={[styles.lblBadge, { color: textColor }]}>{number}</CustomText>
          </View>
        }
      </View>
    );
  }
}

export default connect(
  state => ({ number: state.cart.totals }),
  dispatch => bindActionCreators({}, dispatch)
)(CartBadgeIcon);

