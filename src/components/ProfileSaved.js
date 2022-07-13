import React, { Component } from 'react';
import {
  View,
  FlatList,
  Dimensions
} from 'react-native';

import { COLORS } from "../theme/common";
import CustomText from './CustomText';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  saveAddressWrap: {
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveAddressContainer: {
    margin: 6,
    padding: 10,
    width: width / 2 - 12,
    borderColor: COLORS.TEXT_GRAY,
    borderWidth: 1
  }
};

class ProfileSaved extends Component {

  _keyExtractor = (item, index) => index;
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.address.result}
          contentContainerStyle={{ flex: 1, width }}
          numColumns={2}
          extraData={this.props.address.result}
          keyExtractor={this._keyExtractor}
          removeClippedSubviews={false}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.saveAddressWrap}>
                <View style={[styles.saveAddressContainer, { marginLeft: index % 2 ? 3 : 6, marginRight: index % 2 ? 6 : 3 }]} onPress={() => this.handlePressAddress(item)}>
                  <CustomText>{`${item['first_name']} ${item['last_name']}\n${item['address_1']}\n${item['city']} - ${item['country']}\n${item['state']}`}</CustomText>
                </View>
              </View>
            )
          }}
        />
      </View>
    )
  }
}

export default ProfileSaved;