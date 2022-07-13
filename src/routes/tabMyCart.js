import React from 'react';
import { Image, Text, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MyCart from '../screens/versionOne/MyCart';
import ProductDetail from '../screens/versionOne/ProductDetail';
import Checkout from '../screens/versionOne/Checkout';
import CheckoutSuccess from '../screens/versionOne/CheckoutSuccess';
import TransitionConfiguration from '../utils/transitionConfiguration';
import { navigationBarOptions } from '../navigator';
import Images from '../constants/images';
import CartBadgeIcon from '../components/CartBadgeIcon';

const styles = {
  tabBarIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain'
  }
};

const stackNavigatorConfig = {
  initialRouteName: 'MyCart',
  navigationOptions: () => ({
    /* eslint-disable react/prop-types */
    tabBarIcon: ({ focused }) => {
      let icon = focused ? Images.CART_ICON : Images.CART_INACTIVE_ICON;
      // return <Image source={icon} style={styles.tabBarIcon} />
      return <CartBadgeIcon size={22} active={focused} />
    },
    /* eslint-disable react/prop-types */
    tabBarLabel: ({ focused, tintColor }) => {
      return <Text style={{ color: tintColor, fontSize: 8, marginBottom: Platform.OS === 'android' ? 5 : 0 }}>My cart</Text>;
    },
    ...navigationBarOptions
  }),
  transitionConfig: TransitionConfiguration
};

const TabMyCartRoutes = {
  MyCart: {
    screen: MyCart,
    navigationOptions: () => ({
      headerTitle: (
        <Image style={{ alignSelf: 'center', width: 140, height: 25, resizeMode: 'contain' }} source={require('../../assets/images/logo-text.png')} />
      )
    })
  },
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: () => ({
      tabBarVisible: false
    })
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: () => ({
      tabBarVisible: false
    })
  },
  CheckoutSuccess: {
    screen: CheckoutSuccess,
    navigationOptions: () => ({
      tabBarVisible: false,
      header: null
    })
  }
};

export default StackNavigator(TabMyCartRoutes, stackNavigatorConfig);
