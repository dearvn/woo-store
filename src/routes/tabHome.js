import React from 'react';
import { Image, Text, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from '../screens/versionOne/Home';
import HomeCategories from '../screens/versionOne/HomeCategories';
import ProductDetail from '../screens/versionOne/ProductDetail';
import TransitionConfiguration from '../utils/transitionConfiguration';
import { navigationBarOptions } from '../navigator';
import Images from '../constants/images';

const styles = {
  tabBarIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain'
  }
};

const stackNavigatorConfig = {
  initialRouteName: 'Home',
  navigationOptions: () => ({
    /* eslint-disable react/prop-types */
    tabBarIcon: ({ focused }) => {
      let icon = focused ? Images.HOME_ICON : Images.HOME_INACTIVE_ICON;

      return <Image source={icon} style={styles.tabBarIcon} />
    },
    /* eslint-disable react/prop-types */
    tabBarLabel: ({ focused, tintColor }) => {
      return <Text style={{ color: tintColor, fontSize: 8, marginBottom: Platform.OS === 'android' ? 5 : 0 }}>Home</Text>;
    },
    ...navigationBarOptions
  }),
  transitionConfig: TransitionConfiguration
};

const TabHomeRoutes = {
  Home: {
    screen: Home,
    navigationOptions: () => ({
      headerTitle: (
        <Image style={{ alignSelf: 'center', width: 140, height: 25, resizeMode: 'contain' }} source={require('../../assets/images/logo-text.png')} />
      )
    })
  },
  HomeCategories: {
    screen: HomeCategories
  },
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: () => ({
      tabBarVisible: false
    })
  }
};

export default StackNavigator(TabHomeRoutes, stackNavigatorConfig);
