import React from 'react';
import { Platform, TouchableOpacity, Image, View, StyleSheet, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Splash from './screens/versionOne/Splash';
import Signin from './screens/versionOne/Signin';
import Signup from './screens/versionOne/Signup';
import TabHome from './routes/tabHome';
import TabOffer from './routes/tabOffer';
import TabMyCart from './routes/tabMyCart';
import TabSearch from './routes/tabSearch';
import TabProfile from './routes/tabProfile';
import TabBarCustom from './utils/tabBarCustom';

import WelcomeV2 from './screens/versionTwo/Welcome';
import SignInV2 from './screens/versionTwo/SignIn';
import SignUpV2 from './screens/versionTwo/SignUp';
import HomeV2 from './screens/versionTwo/Home';
import SearchV2 from './screens/versionTwo/Search';
import HomeCategoriesV2 from './screens/versionTwo/HomeCategories';
import CategoriesV2 from './screens/versionTwo/Categories';
import ProductDetailV2 from './screens/versionTwo/ProductDetail';
import MyCartV2 from './screens/versionTwo/MyCart';
import CheckoutV2 from './screens/versionTwo/Checkout';
import ProfileAddCardV2 from './screens/versionTwo/ProfileAddCard';
import ProfileV2 from './screens/versionTwo/Profile';
import WishlistV2 from './screens/versionTwo/Wishlist';

import SelectVersion from './screens/SelectVersion';

import CartBadgeIcon from './components/CartBadgeIcon';

// Common theme
import { COLORS, fontMaker } from './theme/common';
import { VERSION } from './utils/general';
import commonStyles from './theme/styles';
import { toggleDrawer } from './constants/defaultValues';
import TransitionConfiguration from './utils/transitionConfiguration';
import Search from './screens/versionOne/Search';
import ProductDetail from './screens/versionOne/ProductDetail';

const styles = StyleSheet.create({
  headerLeft: {
    justifyContent: 'center'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingRight: 15,
    height: 32
  },
  headerRightBtn: {
    justifyContent: 'center'
  },
  imgMenu: {
    width: 20,
    height: 14,
    margin: 10
  },
  imgSeach: {
    width: 20,
    height: 20,
    margin: 10
  },
  backIcon: {
    width: 22,
    height: 32,
    margin: 10
  },
  yellowSearchIcon: {
    margin: 10
  }
});

const tabBarOptions = {
  tabBarComponent: TabBarCustom,
  lazy: true,
  animationEnabled: false,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: COLORS.TEXT_WHITE,
    inactiveTintColor: COLORS.TEXT_GRAY,
    showLabel: true,
    upperCaseLabel: true, // Android only
    showIcon: true,
    style: {
      backgroundColor: COLORS.DARK_COLOR
    },
    // Android only
    indicatorStyle: {
      backgroundColor: 'transparent',
      paddingVertical: 0
    },
    labelStyle: {
      letterSpacing: 0.1,
      fontSize: 7
    },
    tabStyle: {
      paddingHorizontal: 0,
      paddingBottom: 0
    }
  }
};

export const navigationBarOptions = {
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: Platform.OS === 'android' ? 66 : 50,
    paddingTop: Platform.OS === 'android' ? 24 : 0
  },
  headerBackTitle: null,
  headerTintColor: COLORS.DARK_COLOR,
  headerTitleStyle: {
    textAlign: 'center'
  },
  headerBackTitleStyle: {
    color: '#999'
  },
  cardStyle: {
    // paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
};

export const navigationHeaderWithoutBackButton = ({ navigation }) => ({
  headerLeft: (
    <TouchableOpacity style={styles.headerRight} onPress={toggleDrawer}>
      <Image style={styles.imgMenu} source={require('../assets/images/menu-burger.png')}/>
    </TouchableOpacity>
  ),
  headerRight: (
    <View style={commonStyles.emptyView}/>
  )
});

const MainNavigator = new TabNavigator({
  TabHome: { screen: TabHome },
  TabOffer: { screen: TabOffer },
  TabMyCart: { screen: TabMyCart },
  TabSearch: { screen: TabSearch },
  TabProfile: { screen: TabProfile }
}, tabBarOptions);

export const navigationBarOptionsV2 = {
  headerStyle: {
    backgroundColor: COLORS.MAIN_RED,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: Platform.OS === 'android' ? 66 : 50,
    paddingTop: Platform.OS === 'android' ? 24 : 0
  },
  headerBackTitle: null,
  headerTintColor: COLORS.TEXT_WHITE,
  headerTitleStyle: {
    alignSelf: 'center',
    ...fontMaker({
      weight: '500',
      family: 'Lato'
    }),
    color: COLORS.TEXT_WHITE,
    fontSize: 22,
    backgroundColor: 'transparent'
  },
  headerBackTitleStyle: {
    color: COLORS.TEXT_WHITE
  },
  cardStyle: {
    // paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
};

export const navigationHeaderWithoutBackButtonV2 = ({ navigation }) => ({
  headerLeft: (
    <TouchableOpacity style={styles.headerRight} onPress={toggleDrawer}>
      <Ionicons style={styles.imgMenu} name={'ios-menu'} size={20} color={COLORS.TEXT_WHITE}/>
    </TouchableOpacity>
  ),
  headerRight: (
    <TouchableOpacity style={[styles.headerRight]} onPress={() => navigation.navigate('MyCart')}>
      <CartBadgeIcon
        icon={<MaterialCommunityIcons name="cart-outline" size={22} color={COLORS.TEXT_WHITE}/>}
        bgColor={COLORS.TEXT_WHITE}
        size={20} active={false}
        textColor={COLORS.MAIN_RED}
        isHeader={true}/>
    </TouchableOpacity>
  )
});

export const navigationHeaderWithBackButtonV2 = ({ navigation }) => ({
  headerLeft: (
    <TouchableOpacity style={[styles.headerLeft]} onPress={() => navigation.goBack()}>
      <Ionicons style={styles.backIcon} name={'ios-arrow-back'} size={20} color={COLORS.TEXT_WHITE}/>
    </TouchableOpacity>
  ),
  headerRight: (
    <TouchableOpacity style={[styles.headerRight, { paddingRight: 10 }]} onPress={() => navigation.navigate('MyCart')}>
      <CartBadgeIcon
        icon={<MaterialCommunityIcons name="cart-outline" size={22} color={COLORS.TEXT_WHITE}/>}
        bgColor={COLORS.TEXT_WHITE}
        size={20} active={false}
        textColor={COLORS.MAIN_RED}
        isHeader={true}/>
    </TouchableOpacity>
  )
});

const MainNavigatorV2 = new StackNavigator({
    HomeV2: {
      screen: HomeV2,
      navigationOptions: () => ({
        headerTitle: 'Explore'
      })
    },
    WishlistV2: {
      screen: WishlistV2,
      navigationOptions: () => ({
        headerTitle: 'Wishlist'
      })
    },
    HomeCategoriesV2: {
      screen: HomeCategoriesV2
    },
    CategoriesV2: {
      screen: CategoriesV2
    },
    MyCartV2: {
      screen: MyCartV2
    },
    CheckoutV2: {
      screen: CheckoutV2
    },
    ProfileAddCardV2: {
      screen: ProfileAddCardV2
    },
    ProfileV2: {
      screen: ProfileV2
    },
    SearchV2: {
      screen: SearchV2
    },
    ProductDetailV2: {
      screen: ProductDetailV2
    }
  }, {
    initialRouteName: 'HomeV2',
    navigationOptions: () => ({
      ...navigationBarOptionsV2
    })
  }
);

export const AppNavigator = new StackNavigator({
  Splash: { screen: Splash },
  SignIn: { screen: Signin },
  SignUp: { screen: Signup },
  SelectVersion: { screen: SelectVersion },
  MainNavigator: { screen: MainNavigator },


  WelcomeV2: { screen: WelcomeV2 },
  SignInV2: { screen: SignInV2 },
  SignUpV2: { screen: SignUpV2 },
  MainNavigatorV2: { screen: MainNavigatorV2 }

}, {
  initialRouteName: VERSION === 1 ? 'Splash' : 'WelcomeV2',
  navigationOptions: {
    header: null
  }
});

// export const AppNavigatorVersionTwo = new StackNavigator({
//   Welcome: { screen: WelcomeV2 },
//   SignIn: { screen: SignInV2 },
//   SignUp: { screen: SignUpV2 },
//   SelectVersion: { screen: SelectVersion },
//   MainNavigator: { screen: MainNavigatorV2 },
// }, {
//   initialRouteName: 'SelectVersion',
//   navigationOptions: {
//     header: null
//   },
//   transitionConfig: TransitionConfiguration
// });

export default AppNavigator;


// export default VERSION === 1 ? AppNavigator : AppNavigatorVersionTwo;
