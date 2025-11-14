import {  View, Text, StyleSheet } from 'react-native';

export default function Home(){
    const getTimeOfDay = () => {
        const date = new Date();
        if (date.getHours() < 12) {
            return 'Morning';
        } else if (date.getHours() < 18) {
            return 'Afternoon';
        } else {
            return 'Evening';
        }
    }

    return (
        <View style={styles.container}>
            <Text>{`Good ${getTimeOfDay()}!`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})