import  * as React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Image, ScrollView, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Header from './header'
import { TextInput } from 'react-native-paper';
import { AuthenticationService } from "../server/auth.service";
import { connect } from 'react-redux';
import { saveUser } from '../../actions/save';
import * as Google from "expo-google-app-auth";

const Login = (props) => {
   const authService = new AuthenticationService();
   const [submit, setSubmit] = React.useState(false);
   const [email, setEmail] = React.useState('');
   const [emailVal, setEmailVal] = React.useState(true);
   const [phoneVal, setPhoneVal] = React.useState(true);
   const [password, setPassword] = React.useState('');
   const goToRegister = () => {
      Actions.register1()
   }
   const goToReset = () => {
      Actions.resetPassword()
   }
   const onPressLogin =() =>{
      setSubmit(true);
      if(email!="" && password!=""&&emailVal&&phoneVal){
         authService.login(email, password).then((response) => {
            props.loginUser(response.data.createLogin);
            Actions.invite()
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

   const signInAsync = async () => {
      console.log("LoginScreen.js 6 | loggin in");
      try {
        const { type, user } = await Google.logInAsync({

         //  iosClientId: `<YOUR_IOS_CLIENT_ID>`,
          androidClientId: `866541219983-fqi0i766olvioqgeb71elgsds41nijus.apps.googleusercontent.com`,
          redirectUrl: 'com.ollset:/Login',
          scopes: [
            'openid',
            'profile'
          ],
        }).then(           
           console.log(user)
        );

        Alert.alert(type);
  
        if (type === "success") {
          // Then you can use the Google REST API
          console.log("LoginScreen.js 17 | success, navigating to profile");
          Actions.register1()
         //  navigation.navigate("Profile", { user });
        }
      } catch (error) {
        console.log("LoginScreen.js 19 | error with login", error);
      }
   };

   return (
      <ScrollView style = {styles.whole}>
         <View style = {styles.login_main}>
            <Header />
            <View style={styles.login_input}>
               <Text style={styles.login_head}>Login</Text>
               <TextInput
                  label="Phone No / E-mail or username"
                  style={email=="" && submit? styles.email_error:styles.email}
                  value={email}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  onChangeText={(email) => validate(email)}
               />
               <Text style={styles.error}>{email=="" && submit? "Please enter your email address or mobile number.":!emailVal?"Email is Not Correct":!phoneVal?"Phone Number is Not Correct.":""}</Text>
               <TextInput
                  label="Password"
                  style={password=="" && submit? styles.password_error:styles.password}
                  value={password}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  secureTextEntry={true}
                  onChangeText={password => setPassword(password)}
               />
               <Text style={styles.error}>{password=="" && submit? "Please enter Password!":""}</Text>
               <TouchableOpacity style = {styles.forgotPass} onPress = {goToReset}>
                  <Text style={styles.forgot} >Forgot password?</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.loginbtn}
                  onPress={onPressLogin}
               >
                  <Text style={styles.button}>Log in</Text>
               </TouchableOpacity>
               <View style={styles.line}>
                  <View style={styles.left_line}></View>
                  <Text style={styles.or}>Or</Text>
                  <View style={styles.right_line}></View>
               </View>
               <TouchableOpacity
                  style={styles.loginSocial}
                  onPress={signInAsync}
               >
                  <Image source={require('../../images/google.png')} style={styles.google}/>
                  <Text style={styles.socialButton}>Continue with Google</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.loginSocial}
               >
                  <Image source={require('../../images/facebook.png')} style={styles.facebook}/>
                  <Text style={styles.socialButton}>Contiune with Facebook</Text>
               </TouchableOpacity>
               <Text style={styles.account}>Don’t have an account? 
                  <TouchableOpacity style = {styles.registerGo} onPress = {goToRegister}>
                     <Text style = {styles.registerGoText}>Register</Text>
                  </TouchableOpacity>
               .</Text>
            </View>
         </View>
      </ScrollView>
   )
}

const styles = StyleSheet.create ({
   whole: {
      backgroundColor: "#FFFFFF"
   },
   login_main: {
      backgroundColor: "#FFFFFF",
      marginTop: 30,
   },
   login_input: {
      padding: 28
   },
   login_head: {
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
   forgot: {
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
      marginTop: -3,
      color: "#4FB0F5"
   },
   loginbtn: {
      marginTop: 24,
      height: 48,
      alignItems: "center",
      backgroundColor: "#4FB0F5",
      padding: 14,
      borderRadius: 12
   },
   loginSocial: {
      marginTop: 24,
      height: 48,
      backgroundColor: "#FFF",
      padding: 14,
      borderRadius: 12,
      borderColor: "#4FB0F5",
      borderWidth: 1,
      flexDirection: 'row'
   },
   button: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "700"
   },
   socialButton: {
      color: "#4FB0F5",
      fontSize: 14,
      fontWeight: "700",
      marginLeft: 14
   },
   account: {
      textAlign: "center",
      marginTop: 24,
      fontSize: 14,
      fontWeight: "400",
      color:  "#474453"
   },
   registerGoText: {
      color: "#4FB0F5",
      position: "relative",
      top: 5,
      left: 5
   },
   error: {
      color: "red"
   },
   line: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 14
   },
   left_line: {
      width: "45%",
      height: 1,
      borderBottomColor: "#E5E5E5",
      borderBottomWidth: 1
   },
   right_line: {
      width: "45%",
      height: 1,
      borderBottomColor: "#E5E5E5",
      borderBottomWidth: 1
   },
   or: {
      position: "relative",
      top: 8,
      color: "#474453"
   },
   google: {
      width: 20,
      height: 20,
      marginLeft: "23%"
   },
   facebook: {
      width: 20,
      height: 20,
      marginLeft: "21%"
   }
})

const mapStateToProps = state => ({
   user: state.user,
});

const mapDispatchToProps = dispatch => ({
   loginUser: (data) => dispatch(saveUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)