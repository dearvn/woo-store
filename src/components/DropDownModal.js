import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Dimensions,
  FlatList,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import _ from 'lodash';
import CustomText from './CustomText';

const styles = {
  modal: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'rgba(242, 242, 242, 0.97)'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  searchBox: {
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'column'
  },
  txtQuery: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingTop: 7,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  listItem: {
    color: '#999',
    textAlign: 'center',
    paddingVertical: 10
  },
  closeIcon : {
    paddingVertical: 15,
    alignItems: 'center'
  }
};

class ListItem extends Component {
  _onPress(item) {
    this.props.onItemSelect(item);
  }

  render() {
    const { item, labelField } = this.props;

    return (
      <TouchableOpacity onPress={() => this._onPress(item)}>
        <CustomText style={styles.listItem}>{item[labelField]}</CustomText>
      </TouchableOpacity>
    )
  }
}

class DropDownModal extends Component {
  static propTypes = {
    /**
     * Callback that is called when dropdown option is selected
     */
    onOptionSelected: PropTypes.func,
    /**
     * Collection of objects which will be shown as options in DropDownMenu
     */
    options: PropTypes.array.isRequired,
    /**
     * Selected option that will be shown.
     */
    selectedOption: PropTypes.any.isRequired,
    /**
     * Optional render function, for every item in the list.
     * Input parameter should be shaped as one of the items from the
     * options object
     */
    renderOption: PropTypes.func,
    /**
     * Visibility flag, controling the modal visibility
     */
    visible: PropTypes.bool,
    /**
     * Callback that is called when modal should be closed
     */
    onClose: PropTypes.func,
  };

  static defaultProps = {
    renderOption: (option, titleProperty) => (
      <CustomText>{option[titleProperty].toUpperCase()}</CustomText>
    )
  };

  static DEFAULT_VISIBLE_OPTIONS = 8;

  state = { selected: (new Map()) }

  _keyExtractor = (item, index) => index;

  constructor(props) {
    super(props);
    this.state = {
      optionHeight: 0,
      shouldRenderModalContent: false,
    };
    this.close = this.close.bind(this);
    this.emitOnOptionSelectedEvent = this.emitOnOptionSelectedEvent.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.onOptionLayout = this.onOptionLayout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { visible: wasVisible } = this.props;
    const { visible: isVisible } = nextProps;

    if (!wasVisible && isVisible) {
      this.setState({ shouldRenderModalContent: true });
    }
  }

  onOptionLayout(event) {
    const { height } = event.nativeEvent.layout;
    this.setState({ optionHeight: height });
  }

  selectOption(option) {
    this.close();
    if (option !== this.props.selectedOption) {
      this.emitOnOptionSelectedEvent(option);
    }
  }

  close() {
    if (this.props.onClose) {
      this.props.onClose();
      this.setState({ shouldRenderModalContent: false });
    }
  }

  emitOnOptionSelectedEvent(option) {
    if (this.props.onOptionSelected) {
      this.props.onOptionSelected(option);
    }
  }

  renderItem(item, labelField) {
    return (
      <ListItem
        item={item}
        labelField={labelField}
        onItemSelect={this.selectOption} />
    );
  }

  suggest(query) {
    const { options, searchField } = this.props;

    let re = new RegExp(query, 'i');

    let results = _.chain(options)
      .filter(function(o) {
        return re.test(o[searchField]);
      })
      .take(10)
      .value();

    if (results && results.length > 0) {
      this.setState({ suggestions: results });
    }
  }

  render() {
    const { options, placeholderText, labelField } = this.props;
    const { shouldRenderModalContent } = this.state;

    if (_.size(options) === 0) {
      return null;
    }

    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={this.close}
        transparent>
        <View style={styles.modal}>
          { shouldRenderModalContent ? (
            <View style={styles.wrapper}>
              <View style={styles.searchBox}>
                <TextInput
                  underlineColorAndroid="transparent"
                  autoFocus={true}
                  autoCorrect={false}
                  style={styles.txtQuery}
                  placeholder={placeholderText}
                  placeholderTextColor="#999"
                  onChangeText={(q) => this.suggest(q)}
                />
                <FlatList
                  keyboardShouldPersistTaps='always'
                  keyboardDismissMode='on-drag'
                  showsVerticalScrollIndicator={false}
                  data={this.state.suggestions}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => this.renderItem(item, labelField)}
                />
              </View>

              <TouchableOpacity onPress={this.close} style={styles.closeIcon}>
                <Ionicons name="ios-close-outline" size={35} color="#999" />
              </TouchableOpacity>
            </View>
          ) : null }
        </View>
      </Modal>
    );
  }
}

export default DropDownModal;
