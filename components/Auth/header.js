import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'

const Header = () => {
   const goToLogin = () => {
      Actions.login()
   }
    return (
         <View style = {styles.header}>
            <TouchableOpacity onPress = {goToLogin}>
               <Image source={require('../../images/logo.png')} style={styles.logo}/>
            </TouchableOpacity>
         </View>
    )
}
export default Header

const styles = StyleSheet.create ({
   header: {
      width: "100%",
      height: 64,
      backgroundColor: "#FFFFFF",
      borderBottomWidth: 1,
      borderBottomColor: "#E9F7F5"
   },
   logo: {
      width: 88,
      height: 24,
      marginTop: 19.64,
      marginLeft: 28
   }
})