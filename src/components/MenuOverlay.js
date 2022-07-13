'use strict';
import React, { Component } from "react";
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Menu from "../libs/react-native-drawer";

import { COLORS } from '../theme/common';
import Drawer from "../screens/Drawer";
import { SLIDE_MENU_OPEN, SLIDE_MENU_CLOSE, SLIDE_MENU_TOGGLE, Emitter }  from '../constants/defaultValues';

export default class MenuOverlay extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    this.sideMenuClick = Emitter.addListener(SLIDE_MENU_OPEN, this.openSideMenu);
    this.sideMenuClose = Emitter.addListener(SLIDE_MENU_CLOSE, this.closeSideMenu);
    this.sideMenuToggle = Emitter.addListener(SLIDE_MENU_TOGGLE, this.toggleSideMenu);
  }

  componentWillUnmount() {
    this.sideMenuClick.remove();
    this.sideMenuClose.remove();
    this.sideMenuToggle.remove();
  }

  closeSideMenu = () => this.drawer.close();
  openSideMenu = () => this.drawer.open();
  toggleSideMenu = () => this.state.isOpen ? this.drawer.close() : this.drawer.open();

  render() {
    const drawerStyles = {
      drawer: { backgroundColor: 'rgba(255, 255, 255, 1)' },
      main: { paddingLeft: 0 },
    };
    return (
      <Menu
        ref={(_drawer) => this.drawer = _drawer}
        type="overlay"
        tapToClose={true}
        panCloseMask={0.2}
        openDrawerOffset={0.2}
        styles={drawerStyles}
        content={<Drawer navigation={this.props.navigation} />}>
        {this.props.routes}
      </Menu>
    );
  }

}
