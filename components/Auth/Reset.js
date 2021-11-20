import  * as React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Alert,ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Header from './header'
import { TextInput } from 'react-native-paper';
import { AuthenticationService } from "../server/auth.service";
import { connect } from 'react-redux';
import { userData1 } from '../../actions/userdata1';

const Reset = (props) => {
   const user1 = props.user;
   console.log(user1)
   const authService = new AuthenticationService();
   const [submit, setSubmit] = React.useState(false);
   const [email, setEmail] = React.useState('');
   const [emailVal, setEmailVal] = React.useState(true);
   const goToPasscode = () => {
      setSubmit(true);
      if(email!="" && emailVal){
         authService.sendResetLink(email).then((response) => {
            if(response.data.createSendPasswordResetCode.isSent){
               props.userSave({"resetEmail":email});
               Actions.passcode();
               console.log(response);
            }else{
               Alert.alert("Invalide Email! please try again.")
            }
         }).catch((err) => {
            Alert.alert("Invalide Email! please try again.")
         });
      }
   }
   const validate=(email)=>{
      console.log(email);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(email==""){
          setEmailVal(true);
          setEmail( email );
      }
      else if(email!=""){
          if (reg.test(email) === false) {
              console.log("Email is Not Correct");
              setEmail( email );
              setEmailVal(false);
          }
          else {
              setEmail( email );
              setEmailVal(true);
              console.log("Email is Correct");
          }
      }
   }
   return (
      <ScrollView style = {styles.whole}>
         <View style = {styles.reset_main}>
            <Header />
            <View style={styles.reset_input}>
               <Text style={styles.reset_head}>Reset password</Text>
               <TextInput
                  label="E-mail"
                  style={email=="" && submit? styles.email_error:styles.email}
                  value={email}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  onChangeText={(email) => validate(email)}
               />
               <Text style={styles.error}>{email=="" && submit? "Please enter your email address.":!emailVal?"Email is Not Correct":""}</Text>
               <TouchableOpacity
                  style={styles.resetbtn}
                  onPress={goToPasscode}
               >
                  <Text style={styles.button}>Send reset link</Text>
               </TouchableOpacity>
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
   reset_head: {
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
   resetbtn: {
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
   account: {
      textAlign: "center",
      marginTop: 24,
      fontSize: 14,
      fontWeight: "400",
      color:  "#474453"
   },
   error: {
      color: "red"
   }
})

const mapStateToProps = state => ({
   user: state.user1,
});

const mapDispatchToProps = dispatch => ({
   userSave: (data) => dispatch(userData1(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reset)