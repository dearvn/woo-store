import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar
} from 'react-native';

import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { changeApp } from '../actions/nav';
import { fetchCategories, fetchCoupons, fetchShippingMethod } from "./../actions/product";
import {COLORS} from '../theme/common';
import { validateLoggedIn } from '../actions/user';

class SelectVersion extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { fetchCategories, fetchCoupons, fetchShippingMethod, version, changeApp } = this.props;
    fetchCategories();
    fetchCoupons();
    fetchShippingMethod();
    if (!version) {
      changeApp(1);
    }
    // console.log("into here");
    // this.changeVersion(2);
    // let resetData = {
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
    // };
    // this.props.navigation.dispatch(NavigationActions.reset(resetData));
  }

  _navigateToMain() {
    const routerName = this.props.version === 1 ? 'SignIn' : 'Welcome';
    // const routerName = 'MainNavigator';

    let resetData = {
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routerName })]
    };
    this.props.navigation.dispatch(NavigationActions.reset(resetData));
  }

  redirectTo(page) {
    this.props.navigation.navigate(page);
  }

  changeVersion(ver) {
    this.setState({ ver });
    window.APP_VERSION = ver;
    this.props.changeApp(ver);
  }

  render() {
    const { version } = this.props;

    return (
      <View style={styles.container}>
        <CustomText style={styles.title} weight={'700'}>Select version</CustomText>
        <View style={styles.selectContainer}>
          <TouchableOpacity style={styles.versionContainer} onPress={() => this.changeVersion(1)}>
            <Image
              style={[styles.versionImage, version === 1 && styles.highLight]}
              source={{ uri: 'https://picsum.photos/g/120/120/?random' }}
            />
            <CustomText style={styles.txtVersion}>Version 1</CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.versionContainer} onPress={() => this.changeVersion(2)}>
            <Image
              style={[styles.versionImage, version === 2 && styles.highLight]}
              source={{ uri: 'https://picsum.photos/120/120/?random' }}
            />
            <CustomText style={styles.txtVersion}>Version 2</CustomText>
          </TouchableOpacity>
        </View>
        <CustomButton
          onPress={() => this._navigateToMain()}
          text={'Go to'}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    version: state.nav.appVersion
  }),
  dispatch => bindActionCreators({
    changeApp,
    fetchCategories,
    validateLoggedIn,
    fetchCoupons,
    fetchShippingMethod
  }, dispatch)
)(SelectVersion);


const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  highLight: {
    borderWidth: 5,
    borderColor: COLORS.MAIN_GREEN
  },
  selectContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  versionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  versionImage: {
    height: 120,
    width: 120,
    margin: 10,
    borderRadius: 60
  },
  title: {
    fontSize: 50,
    color: COLORS.TEXT_DARK,
    paddingTop: 100,
    paddingBottom: 30
  },
  txtVersion: {
    fontSize: 30,
    color: COLORS.TEXT_DARK,
    paddingVertical: 10
  }
};
