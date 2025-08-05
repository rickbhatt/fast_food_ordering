import cn from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { CustomButtonProps } from "type";

const CustomButtom = ({
  onPress,
  title = "Click me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
  activityIndicatorColor = "white",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      className={cn("custom-btn", style)}
      onPress={onPress}
    >
      {!isLoading && leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color={activityIndicatorColor} />
        ) : (
          <>
            <Text className={cn("paragraph-semibold", textStyle)}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButtom;
