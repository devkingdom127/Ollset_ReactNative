import  * as React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Alert,ScrollView } from 'react-native'
import Header from './header'
import { Actions } from 'react-native-router-flux';
import { TextInput } from 'react-native-paper';
import { AuthenticationService } from "../server/auth.service";
import { connect } from 'react-redux';

const VerifyUser = (props) => {
   const user1 = props.user1;
   const user2 = props.user2;
   const authService = new AuthenticationService();
   const [submit, setSubmit] = React.useState(false);
   const [code1, setCode1] = React.useState('');
   const [code2, setCode2] = React.useState('');
   const [code3, setCode3] = React.useState('');
   const [code4, setCode4] = React.useState('');
   const [code5, setCode5] = React.useState('');
   const [code6, setCode6] = React.useState('');
   const [code, setCode] = React.useState('');
   
   const goToVerify= ()=>{
      setSubmit(true);
      if(code1!=""&&code2!=""&&code3!=""&&code4!=""&&code5!=""&&code6!=""){
         const user={
            "dob":user2.user2.dob,
            "emailOrPhone":user1.user1.email,
            "firstName":user2.user2.firstname,
            "lastName":user2.user2.lastname,
            "gender":"male",
            "password":user1.user1.password,
            "username":user2.user2.username,
            "verificationCode":code
         }
         authService.registerUser(user).then((response) => {
            Alert.alert("Success! After a few seconds you will be taken to the login page.");
            setTimeout(function(){Actions.login()}, 4000);            
         }).catch((err) => {
            console.log(err);
            Alert.alert("Error! Please check your verification code.");
         });
      }
   }
   const codeInsert=()=>{
      setCode(code1+code2+code3+code4+code5+code6);
   }

   return (
      <ScrollView style = {styles.whole}>
         <View style = {styles.code_main}>
            <Header />
            <View style={styles.code_input}>
               <Text style={styles.code_head}>Verify User</Text>
               <Text style={styles.code_level}>Verification Code</Text>
               <View style={styles.code_box}>
                  <TextInput
                     style={(code1==""||code2==""||code3==""||code4==""||code5==""||code6=="")&&submit? styles.split_input_error:styles.split_input}
                     maxLength={1}
                     selectionColor='#4FB0F5'
                     value={code1}
                     onChangeText={code1 => setCode1(code1)}
                     onBlur={codeInsert}
                  />
                  <TextInput
                     style={(code1==""||code2==""||code3==""||code4==""||code5==""||code6=="")&&submit? styles.split_input_error:styles.split_input}
                     maxLength={1}
                     selectionColor='#4FB0F5'
                     value={code2}
                     onChangeText={code2 => setCode2(code2)}
                     onBlur={codeInsert}
                  />
                  <TextInput
                     style={(code1==""||code2==""||code3==""||code4==""||code5==""||code6=="")&&submit? styles.split_input_error:styles.split_input}
                     maxLength={1}
                     selectionColor='#4FB0F5'
                     value={code3}
                     onChangeText={code3 => setCode3(code3)}
                     onBlur={codeInsert}
                  />
                  <TextInput
                     style={(code1==""||code2==""||code3==""||code4==""||code5==""||code6=="")&&submit? styles.split_input_error:styles.split_input}
                     maxLength={1}
                     selectionColor='#4FB0F5'
                     value={code4}
                     onChangeText={code4 => setCode4(code4)}
                     onBlur={codeInsert}
                  />
                  <TextInput
                     style={(code1==""||code2==""||code3==""||code4==""||code5==""||code6=="")&&submit? styles.split_input_error:styles.split_input}
                     maxLength={1}
                     selectionColor='#4FB0F5'
                     value={code5}
                     onChangeText={code5 => setCode5(code5)}
                     onBlur={codeInsert}
                  />
                  <TextInput
                     style={(code1==""||code2==""||code3==""||code4==""||code5==""||code6=="")&&submit? styles.split_input_error:styles.split_input}
                     maxLength={1}
                     selectionColor='#4FB0F5'
                     value={code6}
                     onChangeText={code6 => setCode6(code6)}
                     onBlur={codeInsert}
                  />
               </View>
                  <TouchableOpacity
                     style={styles.codebtn}
                     onPress={goToVerify}
                     
                  >
                  <Text style={styles.button}>Verify</Text>
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
   code_main: {
      backgroundColor: "#FFFFFF",
      marginTop: 30,
   },
   code_input: {
      padding: 28
   },
   code_head: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#474453",
      marginTop: 12
   },
   code_level: {
      marginTop: 24,
      color: "#A2A3C5"
   },
   code_box: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: 24
   },
   split_input: {
      height: 48,
      width: 44,
      borderWidth: 1,
      borderColor: "#EAEAEA",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      textAlign: "center"
   },
   split_input_error: {
      height: 48,
      width: 44,
      borderWidth: 1,
      borderColor: "red",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      textAlign: "center"
   },
   codebtn: {
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
   }
})

const mapStateToProps = state => ({
   user1: state.user1,
   user2: state.user2,
});


export default connect(mapStateToProps)(VerifyUser)