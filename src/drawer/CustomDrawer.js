import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";

export const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props} style={styles.drawerContainer}>
            <View style={styles.drawerImageContainer}>
                <Image
                    source={require('../assets/images/download.png')}
                    style={styles.drawerImage}
                    resizeMode="cover"
                />
                <Text style={{color:'white',fontWeight:'bold',padding:10}}>Indirimbo Zo Guhimbaza Imana</Text>
            </View>
            <View style={{flex: 1, backgroundColor: "#fff", paddingTop: 10}}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerImageContainer: {
        alignItems: 'center',
        backgroundColor:'#3f8296'
    },
    drawerImage: {
        width: 150,
        height: 150,
        borderRadius: 0,
    },
    drawerContainer: {
        backgroundColor: '#3f8296',
    },
});
