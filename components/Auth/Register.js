import * as React from 'react'
import { TouchableOpacity,Alert, Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Header from './header'
import { TextInput, RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-neat-date-picker'
import { AuthenticationService } from "../server/auth.service";

const Register = () => {
   const authService = new AuthenticationService();
   const [submit, setSubmit] = React.useState(false);
   const [checked, setChecked] = React.useState('male');
   const [Fname, setFname] = React.useState('');
   const [Lname, setLname] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [dob, setDob] = React.useState('');
   const [age, setAge] = React.useState(true);
   const [Uname, setUname] = React.useState('');
   const [checkUserName, setCheckUserName] = React.useState(false);
   const [checkUserResult, setCheckUserResult] = React.useState(false);
   const [password, setPassword] = React.useState('');
   const [eye, setEye] = React.useState(true);
   const [showDatePicker, setShowDatePicker] = React.useState(false);
   const goToLogin = () => {
      Actions.login()
   }
   const goToVerify = () => {
      setSubmit(true);
      if(Fname!=""&&Lname!=""&&email!=""&&dob!=""&&Uname!=""&&password!=""&&age){
         Actions.verify()
      }
   }
   const checkUser = ()=>{
      setCheckUserName=(true)
      authService.userAvailable(Uname).then((response) => {
         if(response.data.checkUserName.isAvailable){
            setCheckUserResult=(true);
         }
         else{
            setCheckUserResult=(false);
         }
      }).catch((err) => {
         setCheckUserResult=(false);
      });
   }

   const openDatePicker = () => {
      setShowDatePicker(true)
    }
  
    const onCancel = () => {
      setShowDatePicker(false)
    }
  
    const onConfirm = ( date ) => {
      setShowDatePicker(false);
      let d= new Date(date);
      let td=new Date();
      let age = td.getFullYear() - d.getFullYear();
      if(age<13){
         setAge(false);
      }
      else{
         setAge(true);
      }
      let bith=date.getDate() + "/"+ parseInt(date.getMonth()+1) +"/"+date.getFullYear();
      setDob(bith);
    }

   return (
      <ScrollView style = {styles.whole}>
         <View style = {styles.register_main}>
            <Header />
            <View style={styles.register_input}>
               <Text style={styles.register_head}>Register</Text>
               <View style={styles.nameFL}>
                  <View style={styles.Fname}>
                     <TextInput
                        label="First name"
                        style={Fname=="" && submit? styles.Fname_text_error:styles.Fname_text}
                        value={Fname}
                        mode="flat"
                        underlineColor="#fff"
                        selectionColor='#4FB0F5'
                        onChangeText={Fname => setFname(Fname)}
                     />
                     <Text style={styles.error}>{Fname=="" && submit?"Please enter First Name!":""}</Text>
                  </View>
                  <View style={styles.Lname}>
                     <TextInput
                        label="Last name"
                        style={Fname=="" && submit? styles.Lname_text_error:styles.Lname_text}
                        value={Lname}
                        underlineColor="#fff"
                        selectionColor='#4FB0F5'
                        onChangeText={Lname => setLname(Lname)}
                     />
                     <Text style={styles.error}>{Lname=="" && submit? "Please enter Last Name!":""}</Text>
                  </View>
               </View>
               <TextInput
                  label="Email or Phone Number"
                  style={Fname=="" && submit?styles.email_error:styles.email}
                  value={email}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  onChangeText={email => setEmail(email)}
               />
               <Text style={styles.error}>{email=="" && submit? "Please enter Email or Phone Number!":""}</Text>
               <Text style={styles.gender}>Gender</Text>
               <View style={styles.sex}>
                  <View style={styles.male}>
                     <RadioButton
                        value="male"
                        color = "#4FB0F5"
                        status={ checked === 'male' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('male')}
                     />
                  </View>
                  <Text style={styles.male_text}>Male</Text>
                  <View style={styles.female}>
                     <RadioButton
                        value="female"
                        color = "#4FB0F5"
                        status={ checked === 'female' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('female')}
                     />
                  </View>
                  <Text style={styles.female_text}>Female</Text>
               </View>
               <TextInput
                  label="Date of Birth"
                  style={(dob=="" && submit)||!age?styles.dob_error:styles.dob}
                  value={dob}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  onChangeText={dob => setDob(dob)}
               />
               <Text style={styles.error}>{dob==""&& age && submit? "Please enter Date of Birth!":!age && submit? "Age must be at least 13 years":""}</Text>
               <View>
                  <DatePicker
                  isVisible={showDatePicker}
                  mode={'single'}
                  onCancel={onCancel}
                  onConfirm={onConfirm}
                  />
               </View>
               <TouchableOpacity
                  style={styles.touchCal}
                  onPress={openDatePicker}
               >
                  <Image 
                     style={styles.calendar}
                     source={require('../../images/calendar.png')}
                  />
               </TouchableOpacity>
               <TextInput
                  label="Username"
                  style={Uname=="" && submit?styles.Uname_error:styles.Uname}
                  value={Uname}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  onChangeText={Uname => setUname(Uname)}
                  onBlur={checkUser}
               />
               <Text style={styles.error}>{Uname=="" && submit? "Please enter Username!":checkUserName&&Uname!=""&&!checkUserResult?"Username not available!":""}</Text>
               <TextInput
                  label="Password"
                  style={password=="" && submit?styles.password_error:styles.password}
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
               <TouchableOpacity
                  style={styles.registerbtn}
                  onPress={goToVerify}
               >
                  <Text style={styles.button}>Create account</Text>
               </TouchableOpacity>
               <Text style={styles.account}>Already have an account? 
                  <TouchableOpacity style = {styles.loginGo} onPress = {goToLogin}>
                     <Text style = {styles.loginGoText}>Login.</Text>
                  </TouchableOpacity>
               </Text>
            </View>
         </View>
      </ScrollView>
   )
}
export default Register

const styles = StyleSheet.create ({
   whole: {
      backgroundColor: "#FFFFFF"
   },
   register_main: {
      backgroundColor: "#FFFFFF",
      marginTop: 30,
   },
   register_input: {
      padding: 28
   },
   register_head: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#474453",
      marginTop: 12
   },
   Fname: {
      height: 48,
      width: "47.5%"
   },
   Fname_text: {
      borderWidth: 1,
      borderColor: "#EAEAEA",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: 24,
      height: 48,
   },
   Fname_text_error: {
      borderWidth: 1,
      borderColor: "red",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: 24,
      height: 48,
   },
   Lname: {
      height: 48,
      width: "47.5%",
      marginLeft: "5%"
   },
   Lname_text: {
      borderWidth: 1,
      borderColor: "#EAEAEA",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: 24,
      height: 48,
   },
   Lname_text_error: {
      borderWidth: 1,
      borderColor: "red",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: 24,
      height: 48,
   },
   nameFL: {
      flexDirection: "row"
   },
   email: {
      borderWidth: 1,
      borderColor: "#EAEAEA",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: 48,
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
      marginTop: 48,
      height: 48,

   },
   male: {
      width: 40
   },
   female: {
      width: 40,
      marginLeft: "27%"
   },
   sex: {
      flexDirection: "row"
   },
   gender: {
      color: "#474453",
      fontWeight: "600",
      fontSize: 14
   },
   male_text: {
      position: "relative",
      top: 7,
      color: "#474453"
   },
   female_text: {
      position: "relative",
      top: 7,
      color: "#474453"
   },
   Uname: {
      borderWidth: 1,
      borderColor: "#EAEAEA",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: -48,
      height: 48
   },
   Uname_error: {
      borderWidth: 1,
      borderColor: "red",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: -48,
      height: 48
   },
   dob: {
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
   dob_error: {
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
      // marginTop: 24,
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
      // marginTop: 24,
      height: 48
   },
   registerbtn: {
      marginTop: -48,
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
   loginGoText: {
      color: "#4FB0F5",
      position: "relative",
      top: 5,
      left: 5
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
   calendar: {
      width: 14,
      height: 14,
      alignSelf: 'flex-end',
      position: "relative",
      right: 18,
   },
   touchCal: {
      width: 50,
      height: 50,
      alignSelf: 'flex-end',
      position: "relative",
      top: -50
   },
   error: {
      color: "red"
   }
})