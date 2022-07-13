import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import Images from '../../../constants/images';
import { COLORS } from "../../../theme/common";
import { NavigationActions } from 'react-navigation';

class Empty extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  }

  navigateToHome() {
    let resetData = {
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })]
    };
    this.props.navigation.dispatch(NavigationActions.reset(resetData));
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.container}>
          <Image style={{ alignSelf: 'center' }} source={Images.CART_EMPTY} resizeMethod={'resize'} resizeMode={'contain'} />
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => this.navigateToHome()}
            style={[styles.btnContainer, { backgroundColor: COLORS.MAIN_RED }]}
          >
            <Text style={styles.lblFooter}>SHOP NOW!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Empty;
