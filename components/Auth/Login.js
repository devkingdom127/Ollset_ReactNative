import  * as React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Image, ScrollView, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Header from './header'
import { TextInput } from 'react-native-paper';
import { AuthenticationService } from "../server/auth.service";
import { connect } from 'react-redux';
import { saveUser } from '../../actions/save';

const Login = (props) => {
   const authService = new AuthenticationService();
   const [submit, setSubmit] = React.useState(false);
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [eye, setEye] = React.useState(true);
   const goToRegister = () => {
      Actions.register1()
   }
   const goToReset = () => {
      Actions.resetPassword()
   }
   const onPressLogin =() =>{
      setSubmit(true);
      if(email!="" && password!=""){
         authService.login(email, password).then((response) => {
            props.loginUser(response.data.createLogin);
            Actions.invite()
         }).catch((err) => {
            Alert.alert("Error! Please try again.")
         });
      }
   }

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
                  onChangeText={(email) => setEmail(email)}
               />
               <Text style={styles.error}>{email=="" && submit? "Please enter your mobile number/E-mail or username.":""}</Text>
               <TextInput
                  label="Password"
                  style={password=="" && submit? styles.password_error:styles.password}
                  value={password}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  secureTextEntry={eye?true:false}
                  onChangeText={password => setPassword(password)}
               />
               <Text style={styles.error}>{password=="" && submit? "Please enter Password!":""}</Text>
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
               >
                  <Image source={require('../../images/twitter.png')} style={styles.google}/>
                  <Text style={styles.socialButton}>Continue with Twitter</Text>
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
   forgotPass: {
      width: 120,
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
   },
   forgot: {
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
   },
   eye: {
       width: 16,
       height: 12,
       alignSelf: 'flex-end',
       position: "relative",
       right: 18
   },
   touch:{
       height:50,
       width: 50,
       alignSelf: 'flex-end',
       position: "relative",
       top: -50
   },
})

const mapStateToProps = state => ({
   user: state.user,
});

const mapDispatchToProps = dispatch => ({
   loginUser: (data) => dispatch(saveUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)