import { StyleSheet, Dimensions, Platform } from 'react-native';
import { fontMaker, COLORS } from '../../../theme/common';

const { width, height } = Dimensions.get('window');

const btnSaveWidth = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navigation: {
    height: 80,
    width,
    flexDirection: 'row'
  },
  imageView: {
    flex: 1
  },
  imageShopcart: {
    flex: 1,
    width: 170,
    marginLeft: 20,
    marginTop: 3,
    resizeMode: 'contain'
  },
  buttonSkip: {
    height: 74,
    width: 100,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textSkip: {
    ...fontMaker({weight: '400', family: 'Roboto'}),
    fontSize: 17,
    color: COLORS.TEXT_GRAY,
    backgroundColor: 'transparent'
  },
  signInContainer: {
    width: '100%',
    paddingHorizontal: 10
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  swiperImage: {
    width: width,
    flex: 1,
    resizeMode: 'cover'
  },
  //content
  content: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10
  },
  //Swiper styles
  textSignIn: {
    margin: 5,
    ...fontMaker({weight: '600', family: 'Roboto'}),
    fontSize: 22,
    backgroundColor: 'transparent',
    color: COLORS.TEXT_DARK
  },
  swiper: {
    width,
    marginTop: 20
  },
  dot: {
    backgroundColor:'rgba(0,0,0,.2)',
    width: 30,
    height: 3,
    margin: 3
  },
  activeDot: {
    backgroundColor: COLORS.MAIN_COLOR,
    width: 30,
    height: 3,
    margin: 3
  },
  dotStyle: {
    // position: 'absolute',
    // top: -height / 2 - 110,
    top: -height / 2 - 110,
    alignSelf: 'flex-end'
  },
  // Textinput
  textinputContainer: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageIcon: {
    margin: 8,
    marginTop: 23,
    width: 22,
    height: 22,
    resizeMode: 'contain'
  },
  containerInput :{
    marginLeft: 5,
    marginRight: 5,
    flex: 1
  },
  buttonForgot: {
    width: 200,
    alignSelf: 'flex-end',
    margin: 5
  },
  textForgot: {
    ...fontMaker({weight: '400', family: 'Roboto'}),
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    color: COLORS.TEXT_DARK,
    fontSize: 15
  },
  buttonLogin: {
    margin: 20,
    marginTop: 40,
    padding: 20,
    alignItems: 'center',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.BUTTON_BACKGROUND
  },
  textLogin: {
    ...fontMaker({weight: '700', family: 'Roboto'}),
    backgroundColor: 'transparent',
    color: COLORS.TEXT_WHITE,
    fontSize: 16
  },
  footer: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: 30
  },
  footerTextLogin: {
    ...fontMaker({weight: '400', family: 'Roboto'}),
    backgroundColor: 'transparent',
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    flex: 1,
    marginLeft: 40
  },
  socialButton: {
    height: 45,
    width: width / 5,
    alignItems: 'center',
  },
  socialIcon: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  modalContainer: {
    width: 280,
    height: 180,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonForgotContainer: {
    marginTop: 10,
    padding: 10,
    width: '60%',
    alignItems: 'center',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.HIGH_LIGHT
  },
  lblForgot: {
    ...fontMaker({weight: '700', family: 'Roboto'}),
    backgroundColor: 'transparent',
    color: COLORS.TEXT_WHITE,
    fontSize: 16
  },
  headerRight: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  closeIcon: {
    paddingHorizontal: 10
  }
});

export default styles;