import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Link} from "expo-router";
import Button from '../components/Button'
const index = () => {
    return (
        <View style={styles.container}>
           <Link href={'/(user)'} asChild>
               <Button text={'User'}/>
           </Link>
            <Link href={'/sign-in'} asChild>
                <Button text={'Sign in'}/>
            </Link>
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        // Add your container styles here
    },
    text: {
        // Add your text styles here
    }
});
