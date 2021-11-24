import  * as React from 'react'
import { Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import Header from './header'
import { Actions } from 'react-native-router-flux';

const RegisterSeccess = () => {
   
   setTimeout(function(){Actions.login()}, 4000);

   return (
      <ScrollView style = {styles.whole}>
         <View style = {styles.reset_main}>
            <Header />
            <View style={styles.reset_input}>
                <Image source={require('../../images/success.png')} style={styles.success}/>
                <Text style={styles.successText}>Success!</Text>
                <Text style={styles.text1}>Your account has been successfully created.</Text>
                <Text style={styles.text2}>After a few seconds you will be taken the login page</Text>
            </View>
         </View>
      </ScrollView>
   )
}

const styles = StyleSheet.create ({
   whole: {
      backgroundColor: "#FFFFFF"
   },
   reset_main: {
      backgroundColor: "#FFFFFF",
      marginTop: 30,
   },
   reset_input: {
      padding: 28
   },
   success: {
       width: 82.5,
       height: 82.5,
       marginLeft: "auto",
       marginRight: "auto"
   },
   successText: {
       fontWeight: "700",
       fontSize: 24,
       color: "#474453",
       textAlign: "center",
       marginTop: 26.75
   },
   text1: {
       fontSize: 15,
       fontWeight: "400",
       color: "#737893",
       textAlign: "center",
       width: 335,
       marginTop: 12,
       marginLeft: "auto",
       marginRight: "auto"
   },
   text2: {
       fontSize: 15,
       fontWeight: "400",
       color: "#737893",
       textAlign: "center",
       width: 300,
       marginLeft: "auto",
       marginRight: "auto"
   }
})

export default RegisterSeccess