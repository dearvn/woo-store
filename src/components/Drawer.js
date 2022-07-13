import React, { PureComponent, Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import { COLORS, fontMaker } from './../theme/common';
import { closeDrawer } from '../constants/defaultValues';
import Images from '../constants/images';
import CustomText from './CustomText';

const styles = StyleSheet.create({
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 0.6,
    borderColor: '#484848',
    alignSelf: 'center'
  },
  name: {
    flex: 1,
    color: '#fff',
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    overflow: 'hidden',
    borderBottomWidth: 1,
    height: 50
  },
  icon: {
    textAlign: 'center',
    marginRight: 5,
    width: 22
  },
  text: {
    flex: 1,
    color: '#1B1B1B',
    paddingVertical: 2
    // ...fontMaker({ weight: '400', family: 'Roboto' })
  },
  notificationIcon: {
    backgroundColor: '#de0933',
    height: 24,
    borderRadius: 12,
    justifyContent: 'center'
  },
  textNumber: {
    backgroundColor: 'transparent',
    paddingVertical: 2,
    paddingHorizontal: 8,
    textAlign: 'center',
    color: '#fff'
  },
  banner: {
    width: '100%',
    height: 180,
    paddingTop: 50
  },
  bannerContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class DrawerComponent extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onLogout: PropTypes.func,
    userProfile: PropTypes.object,
    wishListCount: PropTypes.number,
    orderCount: PropTypes.number,
  };
  
  goToScreen(routerName) {
    const { navigation } = this.props;
    navigation.navigate(routerName);
    closeDrawer();
  }
  
  logout() {
    this.props.onLogout();
    closeDrawer();
  }
  
  render() {
    const { userProfile, wishListCount, orderCount } = this.props;
    const userAvatar = { uri: `http://graph.facebook.com/v2.5/${Math.floor(Math.random() * (10000 - 5)) + 6}/picture?height=350&height=350` };
    const displayName = _.get(userProfile, 'displayname', '');
    
    const buttons = [
      {
        text: 'Home',
        onPress: () => this.goToScreen('Home'),
        fontIcon: <Ionicons name={'ios-home-outline'} size={20} color={COLORS.MAIN_RED} style={styles.icon} />
      },
      {
        text: 'Profile',
        onPress: () => this.goToScreen('Profile'),
        fontIcon: <Ionicons name={'ios-contact-outline'} size={20} color={COLORS.MAIN_RED} style={styles.icon} />
      },
      {
        text: 'Wishlist',
        onPress: () => this.goToScreen('Wishlist'),
        fontIcon: <Ionicons name={'ios-heart-outline'} size={20} color={COLORS.MAIN_RED} style={styles.icon} />,
        number: wishListCount
      },
      {
        text: 'My orders',
        onPress: () => this.goToScreen('MyCart'),
        fontIcon: <Ionicons name={'ios-cart-outline'} size={20} color={COLORS.MAIN_RED} style={styles.icon} />,
        number: orderCount
      }
    ];
    
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.banner}
          contentContainerStyle={styles.bannerContent}
          source={Images.BG_RED}
          resizeMode={'cover'}
          blurRadius={3}
        >
          <TouchableOpacity onPress={() => this.goToScreen('Profile')}>
            <Image style={styles.avatar} source={userAvatar} resizeMode={'cover'}/>
          </TouchableOpacity>
          <CustomText weight={700} style={styles.name}>{displayName}</CustomText>
        </ImageBackground>
        <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ flex: 1 }}
        >
          {
            buttons.map((item, index) => (
              <DrawerButton key={index} {...item} />
            ))
          }
          
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.logout()}
          style={[styles.row, { borderBottomWidth: 0, borderTopWidth: 1, borderTopColor: COLORS.DARK_COLOR }]}>
          <Ionicons name="ios-power-outline" size={22} style={styles.icon} color={COLORS.MAIN_RED}/>
          <Text style={styles.text}>Logout!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class DrawerButton extends Component {
  
  render() {
    const { text, onPress, icon, number, fontIcon } = this.props;
    return (
      <TouchableOpacity
        style={[btnStyles.container]}
        onPress={onPress}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {
            fontIcon ?
              fontIcon
              : <Image source={icon} style={{ resizeMode: 'contain', width: 20, height: 20 }}/>
          }
          
          <Text style={[styles.text]}>{text}</Text>
        </View>
        {!number ? null :
          <Animatable.View ref="menu" style={btnStyles.numberWrap}>
            <CustomText style={[btnStyles.number]}>{number}</CustomText>
          </Animatable.View>}
      </TouchableOpacity>
    );
  }
}

const btnStyles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  text: {
    marginLeft: 20,
    color: COLORS.TEXT_DARK,
    fontSize: 16
  },
  numberWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 8 : 15,
    right: Platform.OS === 'ios' ? 3 : 10,
    height: 18, minWidth: 18,
    backgroundColor: COLORS.RED_HIGH_LIGHT,
    borderRadius: 9
  },
  number: {
    color: 'white',
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3
  }
};
