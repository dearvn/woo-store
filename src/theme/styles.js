import { StyleSheet, Dimensions, Platform } from 'react-native';
import { fontMaker, COLORS } from './common';
import { NUMBER_TABS_ON_SCREEN } from '../constants/defaultValues';

const { width } = Dimensions.get('window');
const tabWidth = (width / NUMBER_TABS_ON_SCREEN) - (width / NUMBER_TABS_ON_SCREEN / NUMBER_TABS_ON_SCREEN / 2);
const underlineWidth = tabWidth - 20;

const themeStyles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 5
  },
  titleLeft: {
    marginLeft: 18,
    color: COLORS.TEXT_DARK,
    fontSize: 16
  },
  titleCenter: {
    alignSelf: 'center',
    color: COLORS.TEXT_DARK,
    fontSize: 18
  },
  imgSeach: {
    width: 20,
    height: 20,
    margin: 10
  },
  imgMenu: {
    width: 20,
    height: 14,
    margin: 10
  },
  tabBarStyle: {
    height: 36,
    position: 'relative',
    borderWidth: 0,
    alignSelf: 'center'
  },
  tabStyle: {
    width: tabWidth,
    height: 35,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  },
  tabTwoStyle: {
    width: width / 2,
    height: 35
  },
  underlineTab: {
    backgroundColor: COLORS.MAIN_COLOR,
    height: 2,
    marginLeft: 10,
    width: underlineWidth
  },
  underlineTwoTab: {
    backgroundColor: COLORS.MAIN_COLOR,
    height: 2,
    width: width / 2
  },
  emptyView: {
    width: 25,
    height: 32
  },
  shadow: Platform.select({
    ios: {
      shadowOpacity: 6,
      shadowColor: COLORS.SHADOW,
      shadowOffset: {
        height: 2,
      },
      shadowRadius: 2.5,
    },
    android: {
      elevation: 2,
    },
  }),
  headerLeft: {
    justifyContent: 'center'
  },
  backIcon: {
    width: 22,
    height: 32,
    margin: 10
  },
});

export default themeStyles;
