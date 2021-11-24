import  * as React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Alert,ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Header from '../Auth/header'
import { Chip } from 'react-native-paper';
import { AuthenticationService } from "../server/auth.service";
import RemovableChips from 'react-native-chip/RemovableChips'

const Invite = () => {
   const authService = new AuthenticationService();
   return (
      <ScrollView style = {styles.whole}>
         <View style = {styles.invite_main}>
            <Header />
            <View style={styles.invite_input}>
               <Text style={styles.invite_head}>Invite people</Text>
               <View style={styles.emalInvite}>
                  <RemovableChips 
                     label="E-mails" 
                     onChangeChips={(chips) => console.log(chips)}
                  />
               </View>
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
   invitebtn: {
      marginTop: 24,
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
   emalInvite: {
      borderWidth: 1,
      borderColor: "#EAEAEA",
      borderRadius: 12,
      paddingLeft: 16,
      paddingBottom: 10,
      paddingRight: 10,
      marginTop: 24
   }
})