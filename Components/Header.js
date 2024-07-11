import { StyleSheet, View, Text } from "react-native";
import React from "react";

const Header = ({ children, name }) => {
    console.log(name);

    return (
        <View style={styles.headerStyle}>
            <Text>Welcome to {name}</Text>
            {children}
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    headerStyle: {
        borderWidth: 2,
        borderColor: 'purple',
        borderRadius: 5,
        fontSize: 30,
        color: 'purple',
        padding: 5,
    },
});
