import  * as React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Alert,ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Header from '../Auth/header'
import { Chip } from 'react-native-paper';
import { AuthenticationService } from "../server/auth.service";

const Invite = () => {
   const authService = new AuthenticationService();
   return (
      <ScrollView style = {styles.whole}>
         <View style = {styles.invite_main}>
            <Header />
            <View style={styles.invite_input}>
               <Text style={styles.invite_head}>Invite people</Text>
               <Chip 
                  icon="information" 
                  onPress={() => console.log('Pressed')}
                  selected={true}
               >
                  Example Chip
               </Chip>
               <TouchableOpacity
                  style={styles.invitebtn}
               >
                  <Text style={styles.button}>Send invites</Text>
               </TouchableOpacity>
            </View>
         </View>
      </ScrollView>
   )
}
export default Invite

const styles = StyleSheet.create ({
   whole: {
      backgroundColor: "#FFFFFF"
   },
   invite_main: {
      backgroundColor: "#FFFFFF",
      marginTop: 30,
   },
   invite_input: {
      padding: 28
   },
   invite_head: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#474453",
      marginTop: 12
   },
   email: {
      borderWidth: 1,
      borderColor: "#EAEAEA",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: 24,
      height: 48
   },
   email_error: {
      borderWidth: 1,
      borderColor: "red",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: 24,
      height: 48
   },
   invitebtn: {
      marginTop: 5,
      height: 48,
      alignItems: "center",
      backgroundColor: "#4FB0F5",
      padding: 14,
      borderRadius: 12
   },
   button: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "700"
   },
})