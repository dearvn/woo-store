import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ImageBackground,
  View,
  ScrollView,
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
import {COLORS} from '../../../theme/common';
import validate from '../../../utils/validate';

import {userSignUp} from '../../../actions/user';
import { resetHome } from '../../../actions/nav';

const commonInputProps = {
  style: styles.input,
  underlineColorAndroid: 'transparent',
  placeholderTextColor: COLORS.TEXT_GRAY
};

class SignUp extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    resetHome: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  showErrors(errors) {
    this.dropDownAlert.alertWithType('error', 'Validate error', _.isObject(errors) ? _.values(errors).join('\n') : errors);
  }

  validateInputs = () => {
    const { name, password, confirmPassword, email } = this.state;
    const validateFields = {
      name: validate(name, 'firstName'),
      password: validate(password, 'password'),
      confirmPassword: (password !== confirmPassword) ? 'Confirm password is not equal to password.' : null,
      email: validate(email, 'email')
    };
    return _.pickBy(validateFields, value => !_.isEmpty(value));
  };

  handleRegister() {
    const { userSignUp, user } = this.props;
    const { name, password, email } = this.state;
    if (user.signUp.requesting) return;
    const errorFields = this.validateInputs();
    if (!_.isEmpty(errorFields)) {
      this.showErrors(errorFields);
    } else {
      const params = {
        name,
        password,
        email
      };
      userSignUp(params).catch(error => this.showErrors(error.data ? error.data : error));
    }
  }

  skip = () => {
    this.props.resetHome();
  }


  render() {

    const {
      name,
      email,
      password,
      confirmPassword
    } = this.state;
    const errorFields = this.validateInputs();
    const hasError = !_.isEmpty(errorFields);

    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={40}
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <CustomText style={styles.welcomeBack} weight={500}>Create an account</CustomText>
          <TouchableOpacity style={styles.close} onPress={() => this.props.navigation.goBack()}>
            <MaterialIcons  name={'close'} color={COLORS.TEXT_WHITE} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoWrap}>
          <Image source={Images.BANNER_REGISTER} style={styles.logo} resizeMode={'contain'} />
        </View>
        <View style={styles.subContain}>
          <View style={styles.loginForm}>
            <CustomText style={styles.mainText}>Name</CustomText>
            <View style={styles.inputWrap}>
              <Image source={Images.ICON_USER_LOGIN} style={styles.iconInput} />
              <TextInput
                {...commonInputProps}
                placeholder={'Your name'}
                onChangeText={(name) => this.setState({ name })}
                returnKeyType={'next'}
                value={name}
              />
              {
                !!email && email.length &&
                <TouchableOpacity onPress={() => this.setState({ email: '' })}>
                  <MaterialIcons name="close" size={17} color={COLORS.DARK_COLOR} />
                </TouchableOpacity>
              }
            </View>
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
            </View>


            <CustomButton
              onPress={() => this.handleRegister()}
              text={'Create account'}
              shadow={!hasError}
              btnStyle={styles.loginButton}
            />

          </View>
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
    userSignUp,
    resetHome
  }, dispatch)
)(SignUp);
