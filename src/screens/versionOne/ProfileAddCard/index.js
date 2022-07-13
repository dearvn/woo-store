import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ActivityIndicator,
  InteractionManager
} from 'react-native';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DropdownAlert from 'react-native-dropdownalert';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import CardValidator from 'card-validator';

import _ from 'lodash';

import styles from './styles';
import DropDownModal from '../../../components/DropDownModal';
import Images from '../../../constants/images';
import { getMetaData } from "../../../utils/general";
import { addCard } from "../../../actions/user";

const cardIcon = Images.CARD_DEFAULT;
const cvvIcon  = Images.CARD_CVV;

const countries = require('../../../../data/country-language.json');

class ProfileAddCard extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      card: {
        number: '4000000000000077',
        expiryDate: '12/21',
        cvc: '123',
        name: 'Viet Chaien',
        address: '10 Tran Tong',
        city: 'Da Nang',
        country: 'VN',
        state: 'Hai Chau',
        postalCode: '550000'
      },
      countries: countries || [],
      selectedCountry: null,
      isShowCountryList: false,
      isProcessingAddCard: false,
      addButtonPosition: {
        bottom: 0
      }
    };
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  _keyboardWillShow(e) {
    this.setState({ addButtonPosition: { bottom: e.endCoordinates.height } });
  }

  _keyboardDidShow(e) {
    this.setState({ addButtonPosition: { bottom: e.endCoordinates.height } });
  }

  _keyboardWillHide(e) {
    this.setState({ addButtonPosition: { bottom: 0 } });
  }

  _keyboardDidHide(e) {
    this.setState({ addButtonPosition: { bottom: 0 } });
  }

  setCountry(country) {
    this.setState({ selectedCountry: country });
    this.setCardInfo(country.code, 'COUNTRY');
  }

  setCardInfo(value, type) {
    switch (type) {
      case 'NUMBER':
        this.setState({
          card: {
            ...this.state.card,
            number: value
          }
        });
        break;

      case 'EXPIRY_DATE':
        this.setState({
          card: {
            ...this.state.card,
            expiryDate: value
          }
        });
        break;

      case 'CVV':
        this.setState({
          card: {
            ...this.state.card,
            cvc: value
          }
        });
        break;

      case 'NAME':
        this.setState({
          card: {
            ...this.state.card,
            name: value
          }
        });
        break;

      case 'ADDRESS':
        this.setState({
          card: {
            ...this.state.card,
            address: value
          }
        });
        break;

      case 'CITY':
        this.setState({
          card: {
            ...this.state.card,
            city: value
          }
        });
        break;

      case 'COUNTRY':
        this.setState({
          card: {
            ...this.state.card,
            country: value
          }
        });
        break;

      case 'STATE':
        this.setState({
          card: {
            ...this.state.card,
            state: value
          }
        });
        break;

      case 'POSTAL_CODE':
        this.setState({
          card: {
            ...this.state.card,
            postalCode: value
          }
        });
        break;

      default:
        return;
    }
  }

  showError(err) {
    this.dropdown.alertWithType('error', 'Add card error', err);
  }

  isValidCard() {
    const {
      number,
      expiryDate,
      cvc,
      name,
      address,
      city,
      country,
      state,
      postalCode
    } = this.state.card;

    const selectedCountry = this.state.selectedCountry;

    if (!CardValidator.number(number).isValid) {
      this.showError('Invalid card number');
      return false;
    }

    if (!CardValidator.expirationDate(expiryDate).isValid) {
      this.showError('Invalid expiry date');
      return false;
    }

    if (!cvc || cvc.length < 3) {
      this.showError('Invalid cvv');
      return false;
    }

    if (!name.match(/^[a-z ,.'-]+$/i)) {
      this.showError('Invalid name on card');
      return false;
    }

    if (!address) {
      this.showError('Invalid address on card');
      return false;
    }

    if (!city) {
      this.showError('Invalid city on card');
      return false;
    }

    if (!country) {
      this.showError('Please choose a country');
      return false;
    }

    if (!state) {
      if (selectedCountry && selectedCountry.code === 'US') {
        this.showError('Invalid state');
        return false;
      }
    }

    return true;
  }

  processToAddCard() {
    const { navigation, addCard } = this.props;
    Keyboard.dismiss();
    this.setState({ isProcessingAddCard: true });
    InteractionManager.runAfterInteractions(() => {
      if (this.isValidCard()) {
        const card = this.state.card;
        const { expiryDate } = card;
        const expiryDateArr = expiryDate.split('/');
        const expMonth = expiryDateArr[0];
        const expYear  = expiryDateArr[1];
        const cardInfo = {
          ...this.state.card,
          exp_month: expMonth,
          exp_year: expYear
        };
        addCard(cardInfo).then(() => {
          navigation.goBack();
        }).catch((error) => {
          this.showError(error);
          this.setState({ isProcessingAddCard: false });
        });
      }
    });

  }

  _handleGoBack() {
    const { navigation } = this.props;
    const screenToGoBack = _.get(navigation, 'state.params.screenToGoBack');

    if (screenToGoBack) {
      return navigation.goBack(screenToGoBack);
    }

    return navigation.goBack();
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.screenWrapper}>
        <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={60}>
          <ScrollView style={{ paddingBottom: 70 }}>
            <View style={styles.addCardWrapper}>
              <View>
                <Text style={styles.addCardInfoLabel}>CARD NUMBER</Text>
                <View style={{ ...styles.addCardInputWrapper, marginTop: 10 }}>
                  <TextInputMask
                    type={'credit-card'}
                    maxLength={19}
                    value={this.state.card.number}
                    style={styles.addCardInput}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setCardInfo(text, 'NUMBER')}
                  />
                  <Image source={cardIcon} />
                </View>
              </View>

              <View style={{ paddingHorizontal: 0, paddingVertical: 0, marginTop: 10, flexDirection: 'row' }}>
                <View style={{ marginRight: 5, flex: 1 }}>
                  <Text style={styles.addCardInfoLabel}>EXPIRY DATE</Text>
                  <View style={{ ...styles.addCardInputWrapper, marginTop: 5 }}>
                    <TextInputMask
                      type={'datetime'}
                      options={{ format: 'MM/YY' }}
                      maxLength={5}
                      value={this.state.card.expiryDate}
                      style={styles.addCardInput}
                      underlineColorAndroid="transparent"
                      onChangeText={text => this.setCardInfo(text, 'EXPIRY_DATE')}
                      placeholder="MM/YY"
                      selectionColor="#079c90"
                    />
                  </View>
                </View>

                <View style={{ marginLeft: 5, flex: 1 }}>
                  <Text style={styles.addCardInfoLabel}>CVV</Text>
                  <View style={{ ...styles.addCardInputWrapper, marginTop: 5 }}>
                    <TextInput
                      value={this.state.card.cvc}
                      maxLength={4}
                      style={styles.addCardInput}
                      keyboardType="numeric"
                      underlineColorAndroid="transparent"
                      onChangeText={text => this.setCardInfo(text, 'CVV')}
                      placeholder="CVV"
                      selectionColor="#079c90"
                    />
                    <Image source={cvvIcon} />
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.addCardInfoLabel}>NAME ON CARD</Text>
                <View style={{ ...styles.addCardInputWrapper, marginTop: 10 }}>
                  <TextInput
                    style={styles.addCardInput}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setCardInfo(text, 'NAME')}
                  />
                </View>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.addCardInfoLabel}>ADDRESS</Text>
                <View style={{ ...styles.addCardInputWrapper, marginTop: 10 }}>
                  <TextInput
                    style={styles.addCardInput}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setCardInfo(text, 'ADDRESS')}
                  />
                </View>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.addCardInfoLabel}>CITY</Text>
                <View style={{ ...styles.addCardInputWrapper, marginTop: 10 }}>
                  <TextInput
                    style={styles.addCardInput}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setCardInfo(text, 'CITY')}
                  />
                </View>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.addCardInfoLabel}>COUNTRY</Text>

                <TouchableOpacity style={styles.addCardInfoDropdown} onPress={() => this.setState({ isShowCountryList: true })}>
                  <Text style={styles.addCardInfoDropdownLabel} multiline={false} numberOfLines={1}>
                    {this.state.selectedCountry ? this.state.selectedCountry.name : ''}
                  </Text>
                  <Ionicons name="md-arrow-dropdown" size={24} color="#484848" />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: 5 }}>
                  <Text style={styles.addCardInfoLabel}>STATE/PROVINCE</Text>
                  <View style={{ ...styles.addCardInputWrapper, marginTop: 10 }}>
                    <TextInput
                      style={styles.addCardInput}
                      underlineColorAndroid="transparent"
                      onChangeText={text => this.setCardInfo(text, 'STATE')}
                    />
                  </View>
                </View>

                <View style={{ flex: 1, marginLeft: 5 }}>
                  <Text style={styles.addCardInfoLabel}>ZIP/POSTAL CODE</Text>
                  <View style={{ ...styles.addCardInputWrapper, marginTop: 10 }}>
                    <TextInput
                      style={styles.addCardInput}
                      underlineColorAndroid="transparent"
                      onChangeText={text => this.setCardInfo(text, 'POSTAL_CODE')} />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>

        <DropDownModal
          visible={this.state.isShowCountryList}
          onClose={() => this.setState({ isShowCountryList: false })}
          options={this.state.countries}
          selectedOption={this.state.selectedCountry ? this.state.selectedCountry : this.state.countries[0]}
          onOptionSelected={country => this.setCountry(country)}
          placeholderText="Country"
          searchField="name"
          labelField="name"
        />

        <TouchableOpacity
          style={styles.btnAdd}
          disabled={this.state.isProcessingAddCard}
          onPress={() => this.processToAddCard()}>
          { this.state.isProcessingAddCard ? <ActivityIndicator color="#fff" /> : <Text style={styles.lblAdd}>ADD</Text> }
        </TouchableOpacity>

        <DropdownAlert ref={ref => this.dropdown = ref} errorColor="#fe6c6c" translucent updateStatusBar={false} closeInterval={8000} />
      </View>
    );
  }
}

export default connect(
  state => ({
    user: state.user.login.result
  }),
  dispatch => bindActionCreators({
    addCard
  }, dispatch)
)(ProfileAddCard);
