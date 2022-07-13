import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import _ from 'lodash';

import validate from '../../../utils/validate';
import { TextField } from 'react-native-material-textfield';
import styles from './styles';
import Images from '../../../constants/images';
import { COLORS } from '../../../theme/common';
import { userSignUp } from '../../../actions/user';
import Loading from '../../../components/Loading';

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      email: 'lol6789@email.com',
      name: 'Viet Ahihi',
      password: '123',
      confirmPassword: '123'
    }
  }

  componentWillMount() {

  }

  renderTexinput(icon, placeHolder, textValue, bindingFunction, index = 1) {
    return (
      <View style={styles.textinputContainer}>
        <Image
          source={icon}
          style={[styles.imageIcon, { tintColor: this.state.index === index ? COLORS.MAIN_COLOR : COLORS.TEXT_DARK }]}
        />
        <TextField
          labelHeight={20}
          tintColor={COLORS.MAIN_COLOR}
          containerStyle={styles.containerInput}
          lineWidth={1}
          label={placeHolder}
          secureTextEntry={index === 3 || index === 4}
          value={textValue}
          onChangeText={bindingFunction}
          onFocus={() => this.setState({ index: index })}
          onEndEditing={() => this.setState({ index: 0 })}
        />
      </View>
    )
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

  handleSignUp() {
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

  showErrors(errors) {
    this.props.dropDownAlert.alertWithType('error', 'Validate error', _.isObject(errors) ? _.values(errors).join('\n') : errors);
  }

  render() {
    const { user } = this.props;
    const requesting = _.get(user, 'signUp.requesting', false);

    return (
      <View style={styles.container}>
        {this.renderTexinput(Images.ICON_EMAIL, 'Name', this.state.name, (name) => this.setState({ name }), 1)}
        {this.renderTexinput(Images.ICON_EMAIL, 'Email', this.state.email, (email) => this.setState({ email }), 2)}
        {this.renderTexinput(Images.ICON_PASSWORD, 'Password', this.state.password, (password) => this.setState({ password }), 3)}
        {this.renderTexinput(Images.ICON_PASSWORD, 'Confirm', this.state.confirmPassword, (confirmPassword) => this.setState({ confirmPassword }), 4)}
        <TouchableOpacity style={styles.buttonSignup} onPress={() => this.handleSignUp()}>
          <Text style={styles.textSignup}>SIGN UP</Text>
          {
            requesting && <Loading style={{ marginHorizontal: 10 }} />
          }
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  dispatch => bindActionCreators({
    userSignUp
  }, dispatch)
)(Signup);

