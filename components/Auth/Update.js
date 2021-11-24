import  * as React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Alert,ScrollView, Image } from 'react-native'
import Header from './header'
import { Actions } from 'react-native-router-flux'
import { TextInput } from 'react-native-paper';
import { AuthenticationService } from "../server/auth.service";
import { connect } from 'react-redux';

const Update = (props) => {
   const passcode = props.user.user1.passcode;
   console.log(passcode)
   const authService = new AuthenticationService();
   const [submit, setSubmit] = React.useState(false);
   const [email, setEmail] = React.useState('');
   const [emailVal, setEmailVal] = React.useState(true);
   const [phoneVal, setPhoneVal] = React.useState(true);
   const [password, setPassword] = React.useState('');
   const [passwordVal, setPasswordVal] = React.useState(true);
   const [eye, setEye] = React.useState(true);
   const goToUpdate = () => {
      setSubmit(true);
      if(email!=""&&password!=""&&passwordVal&&emailVal&&phoneVal){
         authService.updatePassword(email, passcode, password).then((response) => {
            console.log(response);
            if(response.data.createAccountResetPassword.isSuccess){
               Actions.updateSuccess() 
            }else{
               Alert.alert("Error! "+response.data.createAccountResetPassword.reason);
            }
         }).catch((err) => {
            Alert.alert("Error! Please try again.")
			});
      }
   }

   const validate=(email)=>{
      console.log(email);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let pattern = new RegExp(/^[0-9\b]+$/);
      if(email==""){
          setPhoneVal(true);
          setEmailVal(true);
          setEmail( email );
      }
      else if(email!=""&&isNaN(email)){
          setPhoneVal(true);
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
      else{
          setEmailVal(true);
          if(!pattern.test(email)){
              setEmail( email );
              setPhoneVal(false);
          }
          else if(email.length!=10){
              setEmail( email );
              setPhoneVal(false);
          }
          else {
              setEmail( email );
              setPhoneVal(true);
              console.log("setPhoneVal is Correct");
          }
      }
  }

   const passwordCheck = () =>{
      let lowerCaseLetters = /[a-z]/g;
      let upperCaseLetters = /[A-Z]/g;
      let numbers = /[0-9]/g;
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if(password.match(lowerCaseLetters)&&password.match(upperCaseLetters)&&password.match(numbers)&&password.length >= 8&&format.test(password)){
          setPasswordVal(true)
      }
      else{
          setPasswordVal(false);
      }
  }

   return (
      <ScrollView style = {styles.whole}>
         <View style = {styles.password_main}>
            <Header />
            <View style={styles.password_input}>
               <Text style={styles.password_head}>Set New Password</Text>
               <TextInput
                  label="Email or Phone Number"
                  style={email=="" && submit? styles.email_error:styles.email}
                  value={email}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  onChangeText={(email) => validate(email)}
               />
               <Text style={styles.error}>{email=="" && submit? "Please enter Email or Phone Number!":!emailVal?"Email is Not Correct":!phoneVal?"Phone Number is Not Correct.":""}</Text>
               <TextInput
                  label="New Password"
                  style={password=="" && submit?styles.password_error:styles.password}
                  value={password}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  secureTextEntry={eye?true:false}
                  onChangeText={password => setPassword(password)}
                  onBlur={passwordCheck}
               />
               <TouchableOpacity
                  onPress={()=>setEye(!eye)}
                  style={styles.touch}
               >
                  {eye?
                     <Image 
                        style={styles.eye}
                        source={require('../../images/eye.png')}
                     />:
                     <Image 
                        style={styles.eye}
                        source={require('../../images/uneye.png')}
                     />
                  }
               </TouchableOpacity>
               <Text style={styles.error1}>{password=="" && submit? "Please enter New Password!":!passwordVal?"Password should have minimum 8 characters, 1 upper case, 1 lower case, 1 special character and 1 number":""}</Text>
               <TouchableOpacity
                  style={styles.passwordbtn}
                  onPress={goToUpdate}
               >
                  <Text style={styles.button}>Update Password</Text>
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
   password_main: {
      backgroundColor: "#FFFFFF",
      marginTop: 30,
   },
   password_input: {
      padding: 28
   },
   password_head: {
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
   password: {
        borderWidth: 1,
        borderColor: "#EAEAEA",
        borderStyle: "solid",
        backgroundColor: "#fff",
        borderRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        marginTop: 5,
        height: 48
   },
   password_error: {
      borderWidth: 1,
      borderColor: "red",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: 5,
      height: 48
 },
   passwordbtn: {
      marginTop:-24,
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
   eye: {
       width: 16,
       height: 12,
       alignSelf: 'flex-end',
       position: "relative",
       right: 18,
       top: 20
   },
   touch:{
       height:50,
       width: 50,
       alignSelf: 'flex-end',
       position: "relative",
       top: -50
   },
   error: {
      color: "red"
   },
   error1: {
      color: "red",
      top: -48
   }
})

const mapStateToProps = state => ({
   user: state.user1,
});

export default connect(mapStateToProps)(Update)