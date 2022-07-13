import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
  InteractionManager
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { fontMaker, COLORS } from '../theme/common';

const styles = {
  wrapperSearchBox: {
    paddingHorizontal: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.BACKGROUND_GRAY_LIGHT,
    paddingLeft: 10
  },
  textInputStyle: {
    flex: 1,
    color: COLORS.TEXT_DARK,
    alignItems: 'center',
    paddingHorizontal: 10,
    textAlignVertical: 'center', // For android
    marginTop: Platform.OS === 'ios' ? 0 : 4,
    height: 40,
    fontSize: 16,
    ...fontMaker({ weight: '400', family: 'Roboto' })
  },
  sendContainer: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  sendIcon: {
    width: 40,
    height: 40
  },
  clearIcon: {
    width: 20,
    height: 20
  }
};

class SearchBox extends Component {
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    keyword: PropTypes.string,
    focus: PropTypes.bool,
    containerStyle: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      placeholder: props.placeholder || 'Search product',
      showClearBtn: false,
      showRedSendIcon: false
    };
    this.onChangeDelayed = _.debounce(this.onSubmitEditing, this.props.delay);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (this.props.focus && this.refs.searchBox) {
        this.refs.searchBox.focus();
      }
    });
  }

  _onChangeText = (text) => {
    const { onChangeText } = this.props;

    onChangeText(text);
    if (this.props.autoSearch && text.length > 2) {
      this.onChangeDelayed();
    }
  };

  onFocus = () => {
    this.setState({ showClearBtn: true, showRedSendIcon: true });
  };

  onBlur = () => {
    this.setState({ showClearBtn: false, showRedSendIcon: false });
  };

  onSubmitEditing = () => {
    const { onSearch } = this.props;

    Keyboard.dismiss();
    onSearch();
  };

  onCancel = () => {
    const { onChangeText } = this.props;

    this.props.autoSearch && Keyboard.dismiss();
    onChangeText('');
  };

  onPressSearchIcon = () => {
    setTimeout(() => {
      this.refs.searchBox.focus();
    }, 500);
  };

  render() {
    const { showClearBtn, showRedSendIcon } = this.state;
    const { keyword, containerStyle } = this.props;

    return (
      <View style={[styles.wrapperSearchBox, containerStyle]}>
        <View style={[styles.inputContainer]}>
          <TouchableWithoutFeedback onPress={() => this.onPressSearchIcon()}>
            <Ionicons style={styles.clearIcon} name="ios-search" size={22} color={COLORS.TEXT_DARK} />
          </TouchableWithoutFeedback>
          <TextInput
            ref='searchBox'
            style={styles.textInputStyle}
            value={keyword}
            placeholder={this.state.placeholder}
            placeholderTextColor={COLORS.TEXT_GRAY}
            selectionColor={COLORS.MAIN_COLOR}
            underlineColorAndroid='transparent'
            autoCorrect={false}
            autoCapitalize='sentences'
            returnKeyType='search'
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onSubmitEditing={this.onSubmitEditing}
            onChangeText={(text) => this._onChangeText(text)}
          />

          {showClearBtn &&
          <TouchableWithoutFeedback style={styles.sendContainer} onPress={this.onCancel}>
            <Ionicons style={styles.clearIcon} name="ios-close-outline" size={22} color={COLORS.TEXT_DARK} />
          </TouchableWithoutFeedback>
          }
        </View>
        {!showRedSendIcon && !this.props.hideBtn &&
        <TouchableOpacity style={styles.sendContainer} onPress={this.onSubmitEditing}>
          <Ionicons style={styles.sendIcon} name="ios-send-outline" size={40} color={COLORS.TEXT_GRAY} />
        </TouchableOpacity>
        }

        {showRedSendIcon && !this.props.hideBtn &&
        <TouchableOpacity style={styles.sendContainer} onPress={this.onSubmitEditing}>
          <Ionicons style={styles.sendIcon} name="ios-send-outline" size={40} color={COLORS.TEXT_DARK} />
        </TouchableOpacity>
        }
      </View>
    );
  }
}

export default SearchBox;
