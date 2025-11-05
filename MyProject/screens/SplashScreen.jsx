import splashImage from '../assets/realestate-app_assets-constants/assets/images/splash.png';
import {View, Image, StyleSheet} from 'react-native';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image 
                source={splashImage}
                style={styles.image}
                resizeMode='contain'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 300,
        height: 300,
    },
});