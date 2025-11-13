import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import onboardingImage from '../assets/realestate-app_assets-constants/assets/images/onboarding.png';
import googleIcon from '../assets/realestate-app_assets-constants/assets/icons/google.png';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useState, useEffect } from 'react';

// allows the web browser to redirect back to the app after authentication
WebBrowser.maybeCompleteAuthSession();

export default function Auth({ navigation }) {
    // useAuthRequest hook to initiate the Google authentication request
    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: '511120655589-540bfthakbmp3164jbni7q5oip3jc2vn.apps.googleusercontent.com',
        iosClientId: '511120655589-1io9u5v9pvpl4vvont1i24lh1k7cdn84.apps.googleusercontent.com',
        androidClientId: '511120655589-qqb7sqf24bds14mak2is6r2pmmisld30.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
    });

    // useEffect to handle the authentication response and extract the token
    useEffect(() => {
        if (response?.type === 'success'){
            const token = response.authentication.accessToken;
            fetchUserInfo(token);
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }],
            })
        }
    }, [response]);

    // Function to fetch user info using the obtained token
    const fetchUserInfo = async (token) => {
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: {Authorization: `Bearer ${token}`},
            });
            const userInfo = await response.json();
            console.log("User Info:", userInfo);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }

    return (
        <View style={styles.container}>
            <Image 
                source={onboardingImage} 
                style={styles.image} 
                resizeMode='contain' 
            />
            <View style={styles.textContainer}>
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, width: 390, height: 169, }}>
                    <Text style={{width: 230, height: 29, fontWeight: '400', fontSize: 16, letterSpacing: 0.1, color: '#666876',  }}>WELCOME TO REAL SCOUT</Text>
                    <Text style={{width: 390, height: 84, fontWeight: '600', fontSize: 32, lineHeight: 41.6, maxWidth: 300 }}>Let's Get You Closer to <Text style={{fontStyle: 'semibold', color: '#0061FF'}}>Your Ideal Home</Text></Text>
                    <Text style={{width: 266, height: 32, fontWeight: '400', fontSize: 18, lineHeight: 32.4, color: '#666876'}}>Login to Real Scout with Google</Text>
                </View>
                <Pressable 
                    style={{backgroundColor: 'white', width: 350, height: 59, borderRadius: 30, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,}}
                    onPress={promptAsync}
                    disabled={!request}
                >
                    <Image source={googleIcon} style={{width: 22, height: 22, position: 'absolute', left: 76}} />
                    <Text style={{fontWeight: '500', fontStyle: 'medium', lineHeight: 23.4, color: '#191D31'}}>Sign Up with Google</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    image: {
        width: 390,
        height: 552,
        margin: 16,
        position: 'absolute',
        top: 65,
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        position: 'absolute',
        top: 560,
    },
})