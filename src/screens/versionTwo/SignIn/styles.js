import { Dimensions, Platform, StatusBar } from 'react-native';
import { COLORS } from '../../../theme/common'

const { width } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  header: {
    width,
    flexDirection: 'row',
    marginTop: 10,
    position: 'relative'
  },
  welcomeBack: {
    width: '100%',
    color: COLORS.TEXT_WHITE,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18
  },
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 10
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgotPassword: {
    color: COLORS.TEXT_WHITE,
    marginBottom: 50
  },
  btnLogin: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    width: width * 0.6,
    marginVertical: 20
  },
  btnLoginActive: {
    width: width * 0.6,
    marginVertical: 20
  },


  iconInput: {
    resizeMode: 'contain',
    width: 20,
    height: 20
  },
  mainText: {
    color: COLORS.MAIN_RED,
    fontSize: 20,
    marginVertical: 5,
    paddingTop: 10
  },
  logoWrap: {
    justifyContent: 'center'
  },
  logo: {
    width,
    height: width * 352 / 900,
    marginBottom: 10
  },
  subContain: {
    paddingHorizontal: width * 0.1,
    paddingBottom: 50,
  },
  loginForm: {},
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.DARK_COLOR,
    borderBottomWidth: 1,
  },
  input: {
    borderColor: '#9B9B9B',
    height: 40,
    marginTop: 10, marginLeft: 10,
    paddingHorizontal: 10, paddingTop: 0, paddingBottom: 8,
    flex: 1,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: COLORS.MAIN_RED,
    borderWidth: 0,
    borderRadius: 5,
    elevation: 1,
  },
  separatorWrap: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    borderBottomWidth: 1,
    flexGrow: 1,
    borderColor: COLORS.TEXT_GRAY,
  },
  separatorText: {
    color: COLORS.TEXT_GRAY,
    paddingHorizontal: 10,
  },
  fbButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 1,
  },
  // ggButton: {
  //     marginVertical: 10,
  //     backgroundColor: Color.google,
  //     borderRadius: 5,
  // },
  signUp: {
    color: COLORS.MAIN_RED,
    marginTop: 20
  },
  highlight: {
    color: COLORS.MAIN_RED
  }
};

export default styles;
