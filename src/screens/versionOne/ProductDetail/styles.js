import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { fontMaker, COLORS, randomColor } from '../../../theme/common';

const { width } = Dimensions.get('window');
const bannerHeight = 300;
const searchBox = 36;

const styles = StyleSheet.create({
  container: {
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  bannerContainer: {
    width,
    height: bannerHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerImage: {
    width,
    height: bannerHeight
  },
  dotStyle: {
    width: 8,
    height: 8
  },
  titleContainer: {
    width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10
  },
  title: {
    paddingHorizontal: 10,
    color: COLORS.TEXT_GRAY,
    fontSize: 18,
    ...fontMaker({ weight: '400', family: 'Roboto' }),
  },
  price: {
    color: COLORS.MAIN_COLOR,
    fontSize: 24,
    ...fontMaker({ weight: '700', family: 'Roboto' }),
  },
  descriptionContainer: {
    width,
    padding: 20,
    justifyContent: 'flex-start'
  },
  webView: {
    width: '100%',
    backgroundColor: COLORS.BACKGROUND
  },
  descriptionTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    ...fontMaker({ weight: '500', family: 'Roboto' }),
  },
  descriptionContent: {
    color: COLORS.TEXT_GRAY,
    fontSize: 16,
    ...fontMaker({ weight: '500', family: 'Roboto' }),
  },
  footerContainer: {
    height: 50,
    flexDirection: 'row'
  },
  footerQualityContainer:{
    flex: 3,
    flexDirection: 'row',
    backgroundColor: COLORS.MAIN_DARK_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lblQuality: {
    color: COLORS.TEXT_GRAY,
    fontSize: 16,
    ...fontMaker({ weight: '400', family: 'Roboto' })
  },
  lblAddToCart: {
    color: '#FFF',
    fontSize: 16,
    ...fontMaker({ weight: '500', family: 'Roboto' })
  },
  footerButtonContainer:{
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MAIN_COLOR
  },
  headerLeft: {
    justifyContent: 'center'
  },
  backIcon: {
    width: 22,
    height: 32,
    marginTop: 10,
    marginLeft: 10
  },
  headerRight: {
    padding: 10
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    elevation: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    height: 60,
    marginBottom: 10,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND
  },
  titleCenter: {
    alignSelf: 'center',
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    ...fontMaker({ weight: '400', family: 'Roboto' }),
    width: 200
  },
  rowProductColor: {
    width: '90%',
    backgroundColor: COLORS.BACKGROUND,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  colorContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  sizeContainer: {
    width: 40,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.TEXT_GRAY,
    marginHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  lblSize: {
    color: COLORS.TEXT_DARK,
    fontSize: 16,
    ...fontMaker({ weight: '400', family: 'Roboto' }),
    backgroundColor: 'transparent'
  }
});

export default styles;
