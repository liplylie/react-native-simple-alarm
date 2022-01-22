import React from 'react';
import {View, TouchableOpacity} from 'react-native';

const Button = React.memo((props) => {
  const {
    accessible,
    accessibilityLabel,
    onPress,
    disabled,
    style,
    onLayout,
    noAnimation,
    hitSlop,
  } = props;

  if (noAnimation) {
    return (
      <View
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        onStartShouldSetResponder={() => !disabled}
        onResponderGrant={onPress}
        style={style}
        onLayout={onLayout}
        hitSlop={hitSlop}>
        {props.children}
      </View>
    );
  }

  return (
    <TouchableOpacity
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      style={[style]}
      onLayout={onLayout}
      hitSlop={hitSlop}>
      {props.children}
    </TouchableOpacity>
  );
});

export {Button};
export default Button;
