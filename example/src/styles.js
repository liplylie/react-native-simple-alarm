import {StyleSheet, Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('window');

export const HEIGHT = height;
export const WIDTH = width;
export const IOS = Platform.OS === 'ios';

export const Convert = (dp) => {
  if (width <= 350) {
    return dp * 0.8;
  }
  return dp * 0.93;
};

export const Colors = {
  actionGreen: 'rgb(126, 229, 169)',
  badRed: 'rgb(208, 2, 27)',
  bgWhite: '#ffffff',
  dummyTextGray: 'rgba(34, 34, 34, 0.25)',
  dummyTextGrayDarkTheme: '#bbbbbb',
  facebookBlue: 'rgb(59, 89, 152)',
  gold: 'rgb(245, 166, 35)',
  goodGreen: 'rgb(80, 169, 59)',
  gradientLightGreen: 'rgb(164, 234, 193)',
  gray113: 'rgb(113, 113, 113)',
  gray220: 'rgb(220, 220, 220)',
  gray26: '#1d1d26',
  gray26Opacity: 'rgba(29, 29, 38, 0.1)',
  gray38: 'rgba(29, 29, 38, 0.1)',
  halfOpacity: 'rgba(0, 0, 0, 0.5)',
  lightGray: 'rgb(247, 247, 247)',
  lightTeal: 'rgb(126, 229, 169)',
  midGray: 'rgb(155, 155, 155)',
  orange: '#f5a623',
  subactionBlue: '#4a90e2',
  tan: 'rgb(245, 245, 245)',
  tenthOpacity: 'rgba(0, 0, 0, 0.1)',
  textBlack10: 'rgba(34, 34, 34, 0.1)',
  textBlack35: 'rgba(34, 34, 34, 0.35)',
  textBlack50: 'rgba(34, 34, 34, 0.50)',
  textBlack75: 'rgba(34, 34, 34, 0.75)',
  textBlack: '#222222',
  textWhite: '#ffffff',
  transparent: 'rgba(0, 0, 0, 0)',
  vdivGray: 'rgb(181, 181, 181)',
  specialGreen: 'rgb(126, 229, 169)',
  specialGreenDisabled: 'rgba(126, 229, 169, 0.5)',
  inputPlaceholderGray: 'rgba(39, 39, 51, 0.25)',
  buttonGray: 'rgb(248, 248, 249)',
  buttonGrayBorder: 'rgba(141, 141, 141, 0.2)',
  gray108: 'rgb(108, 108, 108)',
  gray210: 'rgb(210, 210, 210)',
  gray151: 'rgb(151, 151, 151)',
  gray207: 'rgb(207, 207, 207)',
};

export const Styles = StyleSheet.create({
  flatListItem: {
    height: height >= 667 ? height * 0.08 : height * 0.1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  flatList: {
    marginVertical: 0,
  },
  row: {
    flexDirection: 'row',
  },
  scroll: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});
