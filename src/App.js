import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BackHandler, View } from 'react-native';
import { NavigationActions, addNavigationHelpers } from 'react-navigation/src/react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppNavigator from './navigator';
import { addListener } from './middlewares/navigation';
import MenuOverlay from './components/MenuOverlay';
import MenuScale from './components/MenuScale';
import { COLORS } from "./theme/common";
import { VERSION } from './utils/general';

import { changeApp } from './actions/nav';

const MenuSide = VERSION === 2 ? MenuOverlay : MenuScale;

class AppWithNavigationState extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.dispatch(NavigationActions.back());
      return true;
    });
    this.props.changeApp(VERSION);
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({ dispatch, state: nav, addListener });
    const styleApp = {
      flexGrow: 1,
      marginLeft: 0,
      backgroundColor: COLORS.MAIN_COLOR
    };

    return (
      <MenuSide
        navigation={navigation}
        routes={
          <View style={styleApp}>
            <AppNavigator navigation={navigation}/>
          </View>
        }
      />
    )
  }
}

export default connect(
  state => ({
    nav: state.nav,
    version: state.nav.appVersion
  }),
  dispatch => ({
    dispatch,
    ...bindActionCreators({
      changeApp
    }, dispatch)
  })
)(AppWithNavigationState);
