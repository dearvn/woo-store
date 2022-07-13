'use strict';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import Menu from "../libs/react-native-drawer";

import { COLORS } from '../theme/common';
import Drawer from "./Drawer";
import { SLIDE_MENU_OPEN, SLIDE_MENU_CLOSE, SLIDE_MENU_TOGGLE, Emitter }  from '../constants/defaultValues';

export default class MenuScale extends Component {
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
      drawer: { backgroundColor: COLORS.MAIN_COLOR },
      main: { paddingLeft: 0 },
    };
    return (
      <Menu
        ref={(_drawer) => this.drawer = _drawer}
        type="static"
        isScale={true}
        captureGestures={false}
        backgroundColor={COLORS.MAIN_RED}
        tweenHandler={Menu.tweenPresets.parallax}
        tapToClose={true}
        panCloseMask={0.4}
        onOpen={() => this.setState({ isOpen: true })}
        onClose ={() => this.setState({ isOpen: false })}
        openDrawerOffset={0.4}
        styles={drawerStyles}
        content={<Drawer navigation={this.props.navigation} />}>
        {this.props.routes}
      </Menu>
    );
  }

}
