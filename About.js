import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from './TopBar'
export const About = () =>{
    return(
    <View>
        <View style={{height:40}}></View>
        <TopBar></TopBar>
    <Text>
        About Page
    </Text>
    </View>
    );

}