import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ScrollView,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropdownAlert from 'react-native-dropdownalert';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import _ from 'lodash';

import styles from './styles';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';

import Images from '../../../constants/images';
import { COLORS } from '../../../theme/common';
import validate from '../../../utils/validate';

import { userLogin, forgotPassword } from '../../../actions/user';
import { resetHome } from '../../../actions/nav';

const commonInputProps = {
  style: styles.input,
  underlineColorAndroid: 'transparent',
  placeholderTextColor: COLORS.TEXT_GRAY
};

class SignIn extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      email: 'levanthanhviet267dn@gmail.com',
      password: 'pass4now'
    }
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

  skip = () => {
    this.props.resetHome();
  }

  render() {
    const { email, password } = this.state;

    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={40}
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
      >
        <View style={styles.logoWrap}>
          <Image source={Images.BANNER_LOGIN} style={styles.logo} resizeMode={'contain'} />
        </View>
        <View style={styles.subContain}>
          <View style={styles.loginForm}>
            <CustomText style={styles.mainText}>EMAIL</CustomText>
            <View style={styles.inputWrap}>
              <Image source={Images.ICON_USER_LOGIN} style={styles.iconInput} />
              <TextInput
                {...commonInputProps}
                placeholder={'Your email'}
                keyboardType={'email-address'}
                onChangeText={(email) => this.setState({ email })}
                returnKeyType={'next'}
                value={email}
              />
              {
                !!email && email.length &&
                <TouchableOpacity onPress={() => this.setState({ email: '' })}>
                  <MaterialIcons name="close" size={17} color={COLORS.DARK_COLOR} />
                </TouchableOpacity>
              }
            </View>
            <CustomText style={styles.mainText}>PASSWORD</CustomText>
            <View style={styles.inputWrap}>
              <Image source={Images.ICON_USER_PASSWORD} style={styles.iconInput} />
              <TextInput
                {...commonInputProps}
                placeholder={'*****'}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
                returnKeyType={'go'}
                value={password}
              />
              {/*<TouchableOpacity onPress={() => this.forgotPassword()}>*/}
                {/*<CustomText style={[styles.mainText, { fontSize: 14 }]}>Forgot?</CustomText>*/}
              {/*</TouchableOpacity>*/}
            </View>

            <CustomButton
              textStyle={{ fontSize: 18 }}
              onPress={() => this.handleLogin()}
              text={'Login'}
              btnStyle={styles.loginButton}
            />

            <TouchableOpacity
              style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, marginRight: 40 }}
              onPress={() => this.props.navigation.navigate('SignUp')}
            >
              <CustomText style={{ fontSize: 16, color: COLORS.MAIN_RED }}>Sign Up</CustomText>
            </TouchableOpacity>

          </View>

          {/*<TouchableOpacity*/}
          {/*style={{ alignItems: 'center' }}*/}
          {/*onPress={this.onSignUpHandle}>*/}
          {/*<CustomText style={styles.signUp}>*/}
          {/*Don't have an account? <Text style={styles.highlight}>Sign Up</Text>*/}
          {/*</CustomText>*/}
          {/*</TouchableOpacity>*/}
        </View>

        <TouchableOpacity
          style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 30, marginRight: 30 }}
          onPress={this.skip}
        >
          <CustomText style={{ fontSize: 22, color: COLORS.MAIN_RED }}>Skip >></CustomText>
        </TouchableOpacity>


        <DropdownAlert ref={ref => this.dropDownAlert = ref} closeInterval={5000} messageNumOfLines={7} errorColor="#fe6c6c" translucent updateStatusBar={false} />
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  dispatch => bindActionCreators({
    userLogin,
    forgotPassword,
    resetHome
  }, dispatch)
)(SignIn);
