import React from 'react';
import { View, Text } from 'react-native';

const GoalDetails = ({ navigation, route }) => {
    console.log(route.params);
    return (
        <View>
            <Text>You are seeing the details of the goal with text :
                {route.params.goalObj.text} and
                id: {route.params.goalObj.id}</Text>
        </View>
    );
};

export default GoalDetails;