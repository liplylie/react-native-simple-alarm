'use strict';

import React, {useMemo} from 'react';
import {Text, StyleSheet} from 'react-native';

import {Styles} from '../styles';

const SuperText = React.memo((props) => {
  const {style, type, color, fontSize, numberOfLines, textAlign} = props;

  const family = useMemo(() => {
    if (type === 'regular') {
      return Styles.mainFamily;
    } else if (type === 'medium') {
      return Styles.mediumFamily;
    } else if (type === 'thin' || type === 'light') {
      return Styles.thinFamily;
    } else if (type === 'bold') {
      return Styles.boldFamily;
    } else if (type === 'italic') {
      return Styles.italicFamily;
    }
    return Styles.mainFamily;
  }, [type]);

  return (
    <Text
      style={[family, styles.main, {color, fontSize, textAlign}, style]}
      numberOfLines={numberOfLines}
      allowFontScaling={false}>
      {props.children}
    </Text>
  );
});

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'transparent',
  },
});

export {SuperText};
export default SuperText;
