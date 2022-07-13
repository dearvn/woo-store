import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Animated, Platform, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TabScene } from 'react-navigation';
import { COLORS } from "../theme/common";

const styles = StyleSheet.create({
  tabbar: {
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .1)',
    flexDirection: 'row'
  },
  tab: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class TabBar extends PureComponent {
  static propTypes = {
    activeTintColor: PropTypes.string,
    activeBackgroundColor: PropTypes.string,
    inactiveTintColor: PropTypes.string,
    inactiveBackgroundColor: PropTypes.string,
    navigation: PropTypes.object,
    position: PropTypes.instanceOf(Animated.Value),
    jumpToIndex: PropTypes.func,
    getLabel: PropTypes.func,
    getOnPress: PropTypes.func,
    renderIcon: PropTypes.func,
    style: PropTypes.object,
    labelStyle: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  _keyboardDidShowSub = undefined;
  _keyboardDidHideSub = undefined;

  componentWillMount() {
    this._keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this._keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this._keyboardDidShowSub !== undefined && this._keyboardDidShowSub.remove();
    this._keyboardDidHideSub !== undefined && this._keyboardDidHideSub.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ isVisible: false });
  };

  _keyboardDidHide = () => {
    this.setState({ isVisible: true });
  };

  _handleTabPress = (index) => {
    const { jumpToIndex, navigation } = this.props;

    //if tabPress is currentTab then we will scroll to top
    if (navigation.state.index === index) { // inside 1st screen of StackNavigator
      const stackNavigation = navigation.state.routes[index].routes[index]; // same as 'this.props.navigation.state' inside component
      if (!!stackNavigation && !!stackNavigation.params && !!stackNavigation.params.scrollToTop) {
        stackNavigation.params.scrollToTop();
      }
    } else {
      jumpToIndex(index);
    }
  };

  render() {
    const {
      navigation,
      renderIcon,
      activeTintColor,
      inactiveTintColor,
      getLabel,
      labelStyle,
      style
    } = this.props;

    const { routes } = navigation.state;

    return (
      <View style={[styles.tabbar, style]}>
        {routes && routes.map((route, index) => {
          const focused = index === navigation.state.index;
          const tintColor = focused ? activeTintColor : inactiveTintColor;
          if (route.routeName === 'TabHidden') {
            return null;
          }
          return (
            <TouchableWithoutFeedback
              key={route.key}
              style={[styles.tab, { backgroundColor: focused ? COLORS.MAIN_COLOR : COLORS.DARK_COLOR }]}
              onPress={() => this._handleTabPress(index)}
            >
              <Animatable.View animation="pulse" style={[styles.tab, { backgroundColor: focused ? COLORS.MAIN_COLOR : COLORS.DARK_COLOR }]}>
                {renderIcon({ route, index, focused, tintColor })}
                <Text style={[labelStyle, { color: activeTintColor }]}>
                  {getLabel({ route, index, focused, tintColor })}
                </Text>
              </Animatable.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    );
  }
}
