import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Dimensions } from "react-native";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

const Header = ({ children, name }) => {

  return (
    <View style={styles.headerStyle}>
      {/* <Text
        style={[styles.headerStyle, { paddingVertical: windowHeight < 415 ? 0 : 5 }]}
      > */}
      <Text>
        Welcome to {name}
      </Text>
      {children}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerStyle: {
    borderWidth: 2,
    borderColor: "purple",
    borderRadius: 5,
    fontSize: 30,
    color: "purple",
    padding: 5,
  },
});
