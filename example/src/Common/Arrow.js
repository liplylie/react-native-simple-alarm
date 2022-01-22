import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';

const Arrow = React.memo((props) => {
  const {height, direction, color, style} = props;

  const width = (8.8 / 16.7) * height;
  const sideLength = Math.sqrt(width * width + (height / 2) * (height / 2));

  const angle = useMemo(() => {
    if (direction === 'left') {
      return '-45deg';
    } else if (direction === 'right') {
      return '135deg';
    }
  }, [direction]);

  return (
    <View style={style}>
      <View
        style={[
          styles.arrow,
          {
            width: sideLength,
            height: sideLength,
            borderColor: color,
          },
          {
            transform: [{rotate: angle}, {translateY: 0}],
          },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  arrow: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
});
export {Arrow};
export default Arrow;
