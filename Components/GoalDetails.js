import React from 'react';
import { View, Text, Button } from 'react-native';

const GoalDetails = ({ navigation, route }) => {
    console.log(route.params);
    return (
        <View>
            { route.params ? (
            <Text>You are seeing the details of the goal with text :
                {route.params.goalObj.text} and
                id: {route.params.goalObj.id}
            </Text> 
            ) : (
                <Text> More Details </Text>
            )
            }
            <Button title="More Details"
                onPress={() => {
                    navigation.navigate('Details', { goalObj: pressedGoal })
                }} />
        </View>
    );
};

export default GoalDetails;