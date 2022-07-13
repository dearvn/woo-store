import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import _ from 'lodash';
import DropdownAlert from 'react-native-dropdownalert';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Signup from '../Signup/index';

import { TextField } from 'react-native-material-textfield';
import Swiper from '../../../libs/react-native-swiper/index';
import Images from '../../../constants/images';
import { COLORS } from '../../../theme/common';
import styles from './styles';
import { userLogin, forgotPassword } from '../../../actions/user';
import Loading from '../../../components/Loading';
import validate from '../../../utils/validate';
import { validateLoggedIn } from "../../../actions/user";

const { width } = Dimensions.get('window');

class Signin extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };
  
  componentDidMount() {
    const { validateLoggedIn } = this.props;
    validateLoggedIn();
  }

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      email: 'levanthanhviet267dn@gmail.com',
      password: 'pass4now',
      isSignIn: true,
      modalVisible: false,
      emailForgot: '',
      page: 0
    }
  }

  renderTexinput(icon, placeHolder, textValue, bindingFunction, index = 1) {
    return (
      <View style={styles.textinputContainer}>
        <Image
          source={icon}
          style={[styles.imageIcon, { tintColor: this.state.index === index ? COLORS.MAIN_COLOR : COLORS.TEXT_DARK }]}
        />
        <TextField
          textColor={COLORS.TEXT_DARK}
          labelHeight={20}
          tintColor={COLORS.MAIN_COLOR}
          containerStyle={styles.containerInput}
          lineWidth={1}
          label={placeHolder}
          secureTextEntry={index === 2}
          value={textValue}
          onChangeText={bindingFunction}
          onFocus={() => this.setState({ index: index })}
          onEndEditing={() => this.setState({ index: 0 })}
        />
      </View>
    )
  }

  showErrors(errors) {
    this.dropDownAlert.alertWithType('error', 'Validate error', _.values(errors).join('\n'));
  }

  validateInputs = () => {
    const { password, email } = this.state;
    const validateFields = {
      password: validate(password, 'password'),
      email: validate(email, 'email')
    };

    return _.pickBy(validateFields, value => !_.isEmpty(value));
  };

  handleLogin(type = '') {
    const { userLogin, user } = this.props;
    if (user.login.requesting) return;
    if (type === 'facebook') {
      userLogin('', '', type).catch(() => {
        this.dropDownAlert.alertWithType('error', 'Login failed', 'Please check your input or connection');
      });
    } else {
      const errorFields = this.validateInputs();
      if (!_.isEmpty(errorFields)) {
        this.showErrors(errorFields);
      } else {
        userLogin(this.state.email, this.state.password).catch(() => {
          this.dropDownAlert.alertWithType('error', 'Login failed', 'Please check your input or connection');
        });
      }
    }
  }

  forgotPassword() {
    const { forgotPassword } = this.props;
    forgotPassword(this.state.emailForgot).then(() => {
      this.setState({ emailForgot: '', modalVisible: false });
      this.dropDownAlert.alertWithType('success', 'Send email', 'Successfully!');
    }).catch(() => {
      this.setState({ emailForgot: '', modalVisible: false });
      this.dropDownAlert.alertWithType('error', 'Send email', 'Email invalid');
    });
  }

  render() {
    const { user } = this.props;
    const requesting = _.get(user, 'login.requesting', false);
    return (
      <View style={styles.container}>
        {/* Navigation */}
        <View style={styles.navigation}>
          <View style={styles.imageView}>
            <Image
              style={styles.imageShopcart}
              source={Images.LOGO_WITH_CART}
            />
          </View>
          <TouchableOpacity style={styles.buttonSkip}
                            onPress={() => {this.props.navigation.navigate('MainNavigator')}}>
            <Text style={styles.textSkip}>Skip</Text>
          </TouchableOpacity>
        </View>
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.textSignIn}>{this.state.isSignIn ? 'Sign In' : 'Sign Up'}</Text>
          <Swiper showsButtons={false}
                  ref={(ref) => {this.swiper = ref;}}
                  style={styles.swiper}
                  loop={false}
                  index={this.state.page}
                  onMomentumScrollEnd={(e, state, context) => this.setState({ isSignIn: state.index === 0 })}
                  paginationStyle={styles.dotStyle}
                  paginationTop={true}
                  dot={<View style={styles.dot} />}
                  activeDot={<View style={styles.activeDot} />}
          >
            {/* Sign In */}
            <ScrollView contentContainerStyle={styles.signInContainer}>
              {this.renderTexinput(Images.ICON_EMAIL, 'Email', this.state.email, (email) => this.setState({ email }), 1)}
              {this.renderTexinput(Images.ICON_PASSWORD, 'Password', this.state.password, (password) => this.setState({ password }), 2)}
              <TouchableOpacity style={styles.buttonForgot} onPress={() => this.setState({ modalVisible: true })}>
                <Text style={styles.textForgot}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonLogin} onPress={() => this.handleLogin()}>
                <Text style={styles.textLogin}>LOGIN</Text>
                {
                  requesting && <Loading style={{ marginHorizontal: 10 }} />
                }
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonForgot} onPress={() => this.swiper.scrollBy(1)}>
                <Text style={styles.textForgot}>Sign up now!</Text>
              </TouchableOpacity>
            </ScrollView>
            {/* Sign Up */}
            <ScrollView contentContainerStyle={styles.signInContainer}>
              <Signup dropDownAlert={this.dropDownAlert} />
            </ScrollView>
          </Swiper>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTextLogin}>Or login by</Text>
          <TouchableOpacity style={styles.socialButton} onPress={() => this.handleLogin('facebook')}>
            <Image
              source={Images.ICON_FACEBOOK}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          {/*Do later*/}
          {/*<TouchableOpacity style={styles.socialButton}>*/}
            {/*<Image*/}
              {/*source={Images.ICON_GPLUS}*/}
              {/*style={styles.socialIcon}*/}
            {/*/>*/}
          {/*</TouchableOpacity>*/}
        </View>
        <Modal isVisible={this.state.modalVisible}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.headerRight} onPress={() => this.setState({ modalVisible: false })}>
              <MaterialCommunityIcons style={styles.closeIcon} name="close" size={30} color={COLORS.TEXT_GRAY} />
            </TouchableOpacity>
            {this.renderTexinput(Images.ICON_EMAIL, 'Email', this.state.emailForgot, (emailForgot) => this.setState({ emailForgot }), 3)}
            <TouchableOpacity style={styles.buttonForgotContainer} onPress={() => this.forgotPassword()}>
              <Text style={styles.lblForgot}>Send email</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <DropdownAlert ref={ref => this.dropDownAlert = ref} closeInterval={5000} messageNumOfLines={7} errorColor="#fe6c6c" translucent updateStatusBar={false} />
      </View>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  dispatch => bindActionCreators({
    userLogin,
    forgotPassword,
    validateLoggedIn
  }, dispatch)
)(Signin);

