import React from 'react';
import { Image, Text, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Search from '../screens/versionOne/Search';
import TransitionConfiguration from '../utils/transitionConfiguration';
import { navigationBarOptions } from '../navigator';
import Images from '../constants/images';
import ProductDetail from "../screens/versionOne/ProductDetail";

const styles = {
  tabBarIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain'
  }
};

const stackNavigatorConfig = {
  initialRouteName: 'Search',
  navigationOptions: () => ({
    /* eslint-disable react/prop-types */
    tabBarIcon: ({ focused }) => {
      let icon = focused ? Images.SEARCH_ICON : Images.SEARCH_INACTIVE_ICON;
      return <Image source={icon} style={styles.tabBarIcon} />
    },
    /* eslint-disable react/prop-types */
    tabBarLabel: ({ focused, tintColor }) => {
      return <Text style={{ color: tintColor, fontSize: 8, marginBottom: Platform.OS === 'android' ? 5 : 0 }}>Search</Text>;
    },
    ...navigationBarOptions
  }),
  transitionConfig: TransitionConfiguration
};

const TabSearchRoutes = {
  Search: {
    screen: Search,
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
  }
};

export default StackNavigator(TabSearchRoutes, stackNavigatorConfig);
