import {  View, Text, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { fetchUsers } from '../database';
import bellIcon from '../assets/realestate-app_assets-constants/assets/icons/bell.png';

export default function Home({ route }){
    const email = route?.params?.email;
    const [user, setUser] = useState([]);

    useEffect(
        () => {
            const getUserData = async () => {
                try {
                    if (!email){
                        console.log("No email provided");
                        return;
                    } else {
                        console.log("Fetching data for email:", email);
                        const result = await fetchUsers(email);
                        setUser(result[0]);
                        console.log("User data fetched:", result);
                    }
                    
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
            getUserData();
        }, [email]
    );


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
            <View style={styles.header}>
                <View style={styles.profile}>
                    <Image source={{uri: user.profile_picture}} style={{width: 50, height: 50, borderRadius: 25}}></Image>
                    <View>
                        <Text>Good {getTimeOfDay()}</Text>
                        <Text>{user.name}</Text>
                    </View>
                </View>
                <Image source={bellIcon} style={{width: 44, height: 44}}></Image>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {

    },
    profile: {

    }
})