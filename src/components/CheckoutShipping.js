import React, { Component } from 'react';
import {
  View,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { TextField } from 'react-native-material-textfield';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import { COLORS, fontMaker } from '../theme/common';
import Images from '../constants/images';
import validate from '../utils/validate';
import CustomText from './CustomText';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  tabContainer: {
    width: 280,
    height: 35,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  // Textinput
  containerInput: {
    marginLeft: 18,
    marginRight: 18,
    flex: 1
  },
  viewContentTwoInput: {
    height: 55,
    flexDirection: 'row',
    width
  },
  viewDelivery: {
    height: 200,
    width,
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT,
    marginTop: 15
  },
  textDelivery: {
    color: COLORS.TEXT_DARK,
    backgroundColor: 'transparent',
    fontSize: 17,
    marginLeft: 10,
    padding: 10
  },
  // Cell
  itemWrapper: {
    width: 120,
    height: 100,
    margin: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 3,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemWrapperHighlight: {
    borderColor: COLORS.MAIN_COLOR,
    borderWidth: 1
  },
  itemShippingFee: {
    color: COLORS.MAIN_GREEN,
    backgroundColor: 'transparent',
    fontSize: 18
  },
  itemDate: {
    color: COLORS.TEXT_GRAY,
    backgroundColor: 'transparent',
    fontSize: 12,
    textAlign: 'center'
  },
  wrapperAddressSaved: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonNext: {
    height: 50,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MAIN_COLOR
  },
  textNext: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  saveAddressWrap: {
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveAddressContainer: {
    margin: 6,
    padding: 10,
    width: width / 2 - 12,
    borderColor: COLORS.TEXT_GRAY,
    borderWidth: 1
  },
  nextIcon: {
    position: 'absolute',
    right: 10,
    top: 10
  }
};

class Shipping extends Component {
  
  static propTypes = {
    mainColor: PropTypes.string
  };
  
  constructor(props) {
    super(props);
    const { orderInfo } = props;
    const billing = _.get(orderInfo, 'billing');
    this.state = {
      selectedTab: 0,
      firstName: billing ? billing['first_name'] : '',
      lastName: billing ? billing['last_name'] : '',
      address: billing ? billing['address_1'] : '',
      phoneNumber: billing ? billing['phone'] : '',
      city: billing ? billing['city'] : '',
      state: billing ? billing['state'] : '',
      country: billing ? billing['country'] : '',
      zipCode: billing ? billing['postcode'] : '',
      selectedIndex: 0
    };
  }
  
  validateInputs = () => {
    const { firstName, lastName, address, phoneNumber, city, country } = this.state;
    const validateFields = {
      firstName: validate(firstName, 'firstName'),
      lastName: validate(lastName, 'lastName'),
      address: validate(address, 'address'),
      phoneNumber: validate(phoneNumber, 'phoneNumber'),
      city: validate(city, 'city'),
      country: validate(country, 'country')
    };
    return _.pickBy(validateFields, value => !_.isEmpty(value));
  };
  
  renderTexinput(icon, placeHolder, textValue, bindingFunction, keyboardType = 'default') {
    const { mainColor } = this.props;
    
    return (
      <TextField
        textColor={COLORS.TEXT_DARK}
        labelHeight={20}
        tintColor={mainColor ? mainColor : COLORS.MAIN_COLOR}
        containerStyle={styles.containerInput}
        lineWidth={1}
        label={placeHolder}
        value={textValue}
        onChangeText={bindingFunction}
        keyboardType={keyboardType}
      />
    );
  }
  
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedTab: index
    });
  };
  
  _renderItem = (item, index) => {
    const wrapperType = index !== this.state.selectedIndex ? styles.itemWrapper : [styles.itemWrapper, styles.itemWrapperHighlight, { borderColor: this.props.mainColor ? this.props.mainColor : COLORS.MAIN_COLOR }];
    const itemDateStyle = index !== this.state.selectedIndex ? styles.itemDate : [styles.itemDate, { color: this.props.mainColor ? this.props.mainColor : COLORS.MAIN_COLOR }];
    return (
      <TouchableOpacity
        style={wrapperType}
        onPress={() => this._onPressItem(index)}
      >
        <CustomText weight={700}
                    style={styles.itemShippingFee}>{item.total === 0 ? 'Free' : ('$' + item.total)}</CustomText>
        <CustomText weight={400} style={itemDateStyle}>{item['method_title']}</CustomText>
      </TouchableOpacity>
    );
  };
  _keyExtractor = (item, index) => index;
  _onPressItem = (index) => {
    this.setState({ selectedIndex: index });
  };
  
  validateOnNext() {
    const { updateOrderInfo, orderInfo, shippingMethod } = this.props;
    const { firstName, lastName, address, phoneNumber, city, state, country, zipCode } = this.state;
    const errorFields = this.validateInputs();
    if(!_.isEmpty(errorFields)) {
      return this.props.showErrors(errorFields);
    }
    const billing = {
      'first_name': firstName.trim(),
      'last_name': lastName.trim(),
      'address_1': address.trim(),
      'phone': phoneNumber.trim(),
      'city': city.trim(),
      'state': state.trim(),
      'country': country.trim(),
      'postcode': zipCode.trim()
    };
    let newOrderInfo = { ...orderInfo };
    newOrderInfo['billing'] = { ...newOrderInfo['billing'], ...billing };
    newOrderInfo['shipping'] = { ...newOrderInfo['shipping'], ..._.omit(billing, 'phone') };
    const delivery = shippingMethod[this.state.selectedIndex];
    const amount = _.get(delivery, 'total', 0);
    newOrderInfo['shipping_lines'] = [_.omit(delivery, 'total')];
    newOrderInfo['amountShipping'] = amount;
    updateOrderInfo(newOrderInfo);
    setTimeout(() => this.props.onNext(), 1000);
  }
  
  handlePressAddress(address) {
    this.setState({
      selectedTab: 0,
      firstName: address['first_name'],
      lastName: address['last_name'],
      address: address['address_1'],
      phoneNumber: address['phone'],
      city: address['city'],
      state: address['state'],
      country: address['country'],
      zipCode: address['postcode']
    });
  }
  
  render() {
    const { shippingMethod, mainColor } = this.props;
    const tabsName = ['New Address', 'Saved Address'];
    
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <SegmentedControlTab
            values={tabsName}
            tabsContainerStyle={[styles.tabContainer]}
            tabStyle={[{ borderColor: mainColor ? mainColor : COLORS.MAIN_COLOR }]}
            tabTextStyle={{ color: mainColor ? mainColor : COLORS.MAIN_COLOR }}
            activeTabStyle={{
              backgroundColor: mainColor ? mainColor : COLORS.MAIN_COLOR,
              borderColor: mainColor ? mainColor : COLORS.MAIN_COLOR
            }}
            selectedIndex={this.state.selectedTab}
            onTabPress={this.handleIndexChange}
          />
          {
            this.state.selectedTab === 0 ?
              <View style={{ flex: 1 }}>
                <View style={styles.viewContentTwoInput}>
                  {this.renderTexinput(null, 'First name', this.state.firstName, (firstName) => this.setState({ firstName }))}
                  {this.renderTexinput(null, 'Last name', this.state.lastName, (lastName) => this.setState({ lastName }))}
                </View>
                {this.renderTexinput(Images.ICON_EMAIL, 'Address', this.state.address, (address) => this.setState({ address }))}
                {this.renderTexinput(Images.ICON_EMAIL, 'Phone number', this.state.phoneNumber, (phoneNumber) => this.setState({ phoneNumber }), 'phone-pad')}
                <View style={styles.viewContentTwoInput}>
                  {this.renderTexinput(Images.ICON_EMAIL, 'City', this.state.city, (city) => this.setState({ city }))}
                  {this.renderTexinput(Images.ICON_EMAIL, 'State', this.state.state, (state) => this.setState({ state }))}
                </View>
                <View style={styles.viewContentTwoInput}>
                  {this.renderTexinput(Images.ICON_EMAIL, 'Country', this.state.country, (country) => this.setState({ country }))}
                  {this.renderTexinput(Images.ICON_EMAIL, 'Zipcode', this.state.zipCode, (zipCode) => this.setState({ zipCode }))}
                </View>
                {
                  !!shippingMethod.length &&
                  <View style={styles.viewDelivery}>
                    <CustomText weight={600} style={styles.textDelivery}>Delivery</CustomText>
                    <FlatList
                      style={{ marginVertical: 15, marginLeft: 20 }}
                      data={shippingMethod}
                      extraData={shippingMethod}
                      keyExtractor={this._keyExtractor}
                      horizontal
                      removeClippedSubviews={false}
                      renderItem={({ item, index }) => this._renderItem(item, index)}
                    />
                  </View>
                }
              </View> :
              <View style={styles.wrapperAddressSaved}>
                <FlatList
                  data={this.props.address.result}
                  contentContainerStyle={{ flex: 1, width }}
                  numColumns={2}
                  keyExtractor={this._keyExtractor}
                  removeClippedSubviews={false}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={styles.saveAddressWrap}>
                        <TouchableOpacity style={[styles.saveAddressContainer, {
                          marginLeft: index % 2 ? 3 : 6,
                          marginRight: index % 2 ? 6 : 3
                        }]} onPress={() => this.handlePressAddress(item)}>
                          <CustomText>{`${item['first_name']} ${item['last_name']}\n${item['address_1']}\n${item['city']} - ${item['country']}\n${item['state']}`}</CustomText>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
          }
        </KeyboardAwareScrollView>
        <TouchableOpacity
          style={[styles.buttonNext, { backgroundColor: mainColor ? mainColor : COLORS.MAIN_COLOR }]}
          onPress={() => this.validateOnNext()}
        >
          <CustomText weight={700} style={styles.textNext}>CONTINUE TO PAYMENT</CustomText>
          <Ionicons style={styles.nextIcon} name="ios-arrow-round-forward-outline" color={COLORS.TEXT_WHITE} size={30}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Shipping;