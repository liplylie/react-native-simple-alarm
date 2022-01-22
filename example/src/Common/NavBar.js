// libs
import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// local
import {Convert, Colors} from '../styles';
import Arrow from './Arrow';
import Button from './Button';
import SuperText from './SuperText';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

export default class NavBar extends Component {
  renderLeftButton = () => {
    const {
      leftButtonTitle,
      leftButtonIcon,
      leftButtonTextStyle,
      onLeftButtonPress,
    } = this.props;

    let icon;
    if (leftButtonIcon === 'left') {
      icon = (
        <Arrow
          width={Convert(10)}
          height={Convert(20)}
          direction="left"
          color={this.props.leftArrowColor}
        />
      );
    } else if (leftButtonIcon === 'menu') {
      icon = (
        <Image
          source={require('../../assets/images/menuIcon.png')}
          style={styles.menu}
        />
      );
    }

    return (
      <Button
        style={[this.leftButtonStyle, styles.leftBtn]}
        onPress={onLeftButtonPress}
        accessibilityLabel={
          leftButtonTitle || leftButtonIcon || 'left nav button'
        }>
        {icon}
        <SuperText style={[styles.leftBtnText, leftButtonTextStyle]}>
          {leftButtonTitle}
        </SuperText>
      </Button>
    );
  };

  renderRightButton = () => {
    const {
      rightButtonTitle,
      rightButtonIcon,
      rightButtonTextStyle,
      onRightButtonPress,
    } = this.props;

    let icon;
    if (rightButtonIcon === 'right') {
      icon = (
        <Arrow width={Convert(8.8)} height={Convert(16.7)} direction="right" />
      );
    } else if (rightButtonIcon === 'close') {
      icon = (
        <Image
          source={require('../../assets/images/buttonClose.png')}
          style={{
            width: Convert(18),
            height: Convert(18),
          }}
        />
      );
    } else if (rightButtonIcon === 'search') {
      icon = (
        <Ionicons
          name="ios-search-outline"
          size={Convert(27)}
          color={Colors.textBlack}
          style={{
            transform: [{translateY: Convert(2)}],
          }}
        />
      );
    } else if (rightButtonIcon === 'list') {
      icon = (
        <Ionicons
          name="ios-list"
          size={Convert(36)}
          color={Colors.textBlack}
          style={{
            transform: [{translateY: Convert(2)}, {translateX: -Convert(0)}],
          }}
        />
      );
    } else if (rightButtonIcon === 'plus') {
      icon = (
        <FontAwesome
          size={Convert(30)}
          name="plus"
          color={'dodgerblue'}
          style={{marginLeft: Convert(10), marginTop: Convert(10)}}
        />
      );
    }

    return (
      <Button
        style={styles.rightBtn}
        onPress={onRightButtonPress}
        accessibilityLabel={
          rightButtonTitle || rightButtonIcon || 'right nav button'
        }>
        <SuperText style={[styles.rightButtonText, rightButtonTextStyle]}>
          {rightButtonTitle}
        </SuperText>
        {icon}
      </Button>
    );
  };

  renderTitle = () => {
    const {title} = this.props;
    return <SuperText style={styles.title}>{title}</SuperText>;
  };

  render() {
    const {
      leftButtonTitle,
      rightButtonTitle,
      leftButtonIcon,
      rightButtonIcon,
      showDivider,
      top,
    } = this.props;

    const setToTopStyle = this.props.setToTop
      ? {
          position: 'absolute',
          top: top,
          zIndex: 1000,
        }
      : {};

    if (this) {
      return (
        <View
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              borderBottomColor: showDivider
                ? Colors.textBlack10
                : 'transparent',
            },
            setToTopStyle,
            styles.navBar,
          ]}>
          <View style={styles.container}>
            {(leftButtonTitle || leftButtonIcon) && this.renderLeftButton()}

            {this.renderTitle()}

            {(rightButtonTitle || rightButtonIcon) && this.renderRightButton()}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  navBar: {
    height: Height * 0.1,
    width: Width,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: Width * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: Width * 0.08,
    width: Width * 0.1,
  },
  leftBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Convert(18),
    paddingRight: Convert(18),
    position: 'absolute',
    left: 0,
    top: Width * 0.025,
    height: Height * 0.05,
  },
  leftBtnText: {
    fontSize: Convert(16),
    letterSpacing: -0.4,
  },
  rightBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: Convert(18),
    paddingRight: Convert(18),
    position: 'absolute',
    right: 0,
    top: Width * 0.025,
    height: Height * 0.05,
  },
  TitleText: {
    fontSize: Convert(20),
    height: Convert(20),
    letterSpacing: Convert(5.5),
    textAlign: 'center',
    color: 'black',
  },
  menu: {
    marginRight: Convert(8),
    height: Convert(16),
    resizeMode: 'contain',
  },
  rightButtonText: {
    fontSize: Convert(16),
    letterSpacing: -0.4,
    top: Convert(1),
  },
  title: {
    fontSize: Convert(21.3),
    letterSpacing: Convert(-0.5),
    textAlign: 'center',
  },
});
