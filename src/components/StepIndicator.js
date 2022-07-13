import React, { Component } from 'react';
import { View, Image, Platform, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../theme/common';
import CustomText from './CustomText';

const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: 74,
    backgroundColor: '#fff',
    paddingBottom: 6
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    color: COLORS.TEXT_GRAY,
    fontSize: 12,
    textAlign: 'center'
  },
  labelActive: {
    color: COLORS.TEXT_DARK
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8
  }
});


export default class StepIndicator extends Component {
  
  constructor(props) {
    super(props);
    const defaultStyles = {
      stepIndicatorSize: 30,
      borderPadding: 6,
      color: COLORS.MAIN_RED
    };
    
    this.customStyles = Object.assign(defaultStyles, props.customStyles);
    this.stepStrokeWidth = 50;
    this.imageMargin = this.customStyles.stepIndicatorSize / 2;
    
    let allIndicatorWidth = props.steps.length * this.customStyles.stepIndicatorSize + 2 * props.steps.length * this.customStyles.borderPadding;
    this.marginContent = widthScreen - allIndicatorWidth - (props.steps.length - 1) * this.stepStrokeWidth;
    
    this.containerWidth = widthScreen;
    if(this.marginContent >= 50) {
      this.containerWidth = widthScreen - this.marginContent + 50;
      this.marginContent = 25;
    } else if(this.marginContent < 20) {
      this.marginContent = 10,
        this.stepStrokeWidth = (widthScreen - allIndicatorWidth - this.marginContent * 2) / (props.steps.length - 1);
    }
    
    
    if(Platform.OS === 'ios') {
      this.labelWidth = this.marginContent * 2 + this.customStyles.stepIndicatorSize + 2 * this.customStyles.borderPadding;
    }
    else {
      this.labelWidth = this.marginContent * 2;
    }
  }
  
  render() {
    let content = [];
    let label = [];
    
    for(let i = 0; i < this.props.steps.length; i++) {
      let item = this.props.steps[i];
      content.push(this.renderStepIndicator(i, item.icon));
      label.push(<CustomText key={i}
                       style={[styles.label,
                         { width: this.labelWidth },
                         i <= this.props.currentIndex && { color: COLORS.TEXT_DARK }]}>{item.label}</CustomText>);
      if(i !== this.props.steps.length - 1) {
        content.push(this.renderProgressBar(i));
      }
    }
    
    return (
      <View style={[styles.container, { width: this.containerWidth }]}>
        <View style={styles.labelContainer}>
          {label}
        </View>
        <View style={styles.indicatorContainer}>
          {content}
        </View>
      </View>
    );
  }
  
  renderStepIndicator(index, icon) {
    let isCurrent = index === this.props.currentIndex;
    
    let indicatorContainer = {
      width: this.customStyles.stepIndicatorSize + this.customStyles.borderPadding * 2,
      height: this.customStyles.stepIndicatorSize + this.customStyles.borderPadding * 2,
      borderWidth: 0.5,
      borderColor: '#CED7DD',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: (this.customStyles.stepIndicatorSize + this.customStyles.borderPadding * 2) / 2
    };
    
    let indicatorStyle = {
      backgroundColor: index < this.props.currentIndex ? this.customStyles.color : '#CED7DD',
      width: this.customStyles.stepIndicatorSize,
      height: this.customStyles.stepIndicatorSize,
      borderRadius: this.customStyles.stepIndicatorSize
    };
    
    let indicatorCurrent = {
      backgroundColor: 'white',
      borderWidth: 1.5,
      borderColor: this.customStyles.color
    };
    
    let imageSize = isCurrent === false ? this.customStyles.stepIndicatorSize - this.imageMargin : this.customStyles.stepIndicatorSize - this.imageMargin - 3;
    let imageStyle = {
      width: imageSize,
      height: imageSize,
      position: 'absolute',
      top: this.imageMargin / 2,
      left: this.imageMargin / 2,
      tintColor: isCurrent === false ? 'white' : this.customStyles.color
    };
    
    return (
      <TouchableOpacity onPress={() => index < this.props.currentIndex && this.props.onChangeTab(index)}
                        style={indicatorContainer}
                        key={'indicator-' + index}>
        <View style={[indicatorStyle, isCurrent && indicatorCurrent]}>
          <Image
            resizeMode="contain"
            source={icon}
            style={imageStyle}/>
        </View>
      </TouchableOpacity>
    );
  }
  
  renderProgressBar(index) {
    let progressBarContainer = {
      height: this.customStyles.borderPadding * 2 + 2,
      width: this.stepStrokeWidth,
      justifyContent: 'center',
      zIndex: 3
    };
    
    let progressBarBorder = {
      height: this.customStyles.borderPadding * 2 + 2,
      width: this.stepStrokeWidth + 4,
      position: 'absolute',
      top: 0,
      left: -2,
      right: -2,
      backgroundColor: 'white',
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: '#CED7DD'
    };
    
    let progressBar = {
      width: this.stepStrokeWidth + this.customStyles.borderPadding * 2 + 3,
      height: 2,
      backgroundColor: this.customStyles.color,
      position: 'absolute',
      top: this.customStyles.borderPadding,
      left: -this.customStyles.borderPadding
    };
    return (
      <View style={progressBarContainer} key={'progress-' + index}>
        <View style={progressBarBorder}>
          {index < this.props.currentIndex && <View style={progressBar} />}
        </View>
      </View>
    );
  }
}

StepIndicator.defaultProps = {
  steps: [],
  currentIndex: 0
};
