import React from 'react';
import { Image, Text, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Profile from '../screens/versionOne/Profile';
import ProfileAddCard from '../screens/versionOne/ProfileAddCard';
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
  initialRouteName: 'Profile',
  navigationOptions: () => ({
    /* eslint-disable react/prop-types */
    tabBarIcon: ({ focused }) => {
      let icon = focused ? Images.PROFILE_ICON : Images.PROFILE_INACTIVE_ICON;
      return <Image source={icon} style={styles.tabBarIcon} />
    },
    /* eslint-disable react/prop-types */
    tabBarLabel: ({ focused, tintColor }) => {
      return <Text style={{ color: tintColor, fontSize: 8, marginBottom: Platform.OS === 'android' ? 5 : 0 }}>Profile</Text>;
    },
    ...navigationBarOptions
  }),
  transitionConfig: TransitionConfiguration
};

const TabProfileRoutes = {
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      headerTitle: (
        <Image style={{ alignSelf: 'center', width: 140, height: 25, resizeMode: 'contain' }} source={require('../../assets/images/logo-text.png')} />
      )
    })
  },
  ProfileAddCard: {
    screen: ProfileAddCard,
    navigationOptions: () => ({
      headerTitle: (
        <Image style={{ alignSelf: 'center', width: 140, height: 25, resizeMode: 'contain' }} source={require('../../assets/images/logo-text.png')} />
      ),
      tabBarVisible: false,
    })
  }
};

export default StackNavigator(TabProfileRoutes, stackNavigatorConfig);
