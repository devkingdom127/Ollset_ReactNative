import * as React from 'react'
import { TouchableOpacity,Alert, Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Header from './header'
import { TextInput, RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-neat-date-picker';
import { connect } from 'react-redux';
import { userData2 } from '../../actions/userdata2';
import { AuthenticationService } from "../server/auth.service";
import { maybe } from '@apollo/client/utilities';

const Register2 = (props) => {
   const user1 = props.user1;
   const user2 = props.user2;
   const authService = new AuthenticationService();
   const [submit, setSubmit] = React.useState(false);
   const [Fname, setFname] = React.useState('');
   const [Lname, setLname] = React.useState('');
   const [dob, setDob] = React.useState('');
   const [Uname, setUname] = React.useState('');
   const [ageMe, setAgeMe] = React.useState(0);
   const [dobVal, setDobVal] = React.useState(true);
   const [month, setMonth] = React.useState(true);
   const [showDatePicker, setShowDatePicker] = React.useState(false);
   const goToVerify = () => {
      setSubmit(true);
      if(Fname!=""&&Lname!=""&&dob!=""&&Uname!=""){
         if(ageMe>13 && month){
            setDobVal(true);
            authService.getVerificationCode(user1.user1.email, Fname).then((res) => {
               console.log(res);
               props.userSave({"firstname":Fname, "lastname":Lname, "dob":dob, "username":Uname});
               Actions.verify()
            }).catch((err) => {
               Alert.alert("Invalide User data! Please check again your email or phone number.")
            });
         }else{
            setDobVal(false);
         }
      }
   }
   const ageCheck = (age)=>{
      setDob(age);
      setMonth(true);
      let d = new Date();
      let agelen = age.length;
      let ageCh = age.slice(agelen-4, agelen);
      let ddd = d.getFullYear() - ageCh;
      setAgeMe(ddd);
      if(ddd<13){
         setDobVal(false);
      }
      else{
         setDobVal(true);
      }   
   }
   const checkBirth = () =>{
      const myArray = dob.split("/");
      console.log(myArray[0]);
      if(myArray[0]>=1 && myArray[0]<=12 && myArray[1]>=1 && myArray[1]<=31){
         setMonth(true)
      }
      else{
         setMonth(false)
      }
   }
   const openDatePicker = () => {
      setShowDatePicker(true)
    }
  
    const onCancel = () => {
      setShowDatePicker(false)
    }
  
    const onConfirm = ( date ) => {
      setShowDatePicker(false);
      console.log(date);
      let bith=parseInt(date.getMonth()+1) + "/"+ date.getDate() +"/"+date.getFullYear();
      setDob(bith);
      let d = new Date();
      console.log(d)
      let dd = d.getFullYear() - date.getFullYear();
      setAgeMe(dd);
      if(dd<13){
         setDobVal(false);
      }
      else{
         setDobVal(true);
      }
    }

   return (
      <ScrollView style = {styles.whole}>
         <View style = {styles.register_main}>
            <Header />
            <View style={styles.register_input}>
                <Text style={styles.register_head}>Register</Text>
                <TextInput
                label="First name"
                style={Fname=="" && submit? styles.Fname_text_error:styles.Fname_text}
                value={Fname}
                mode="flat"
                underlineColor="#fff"
                selectionColor='#4FB0F5'
                onChangeText={Fname => setFname(Fname)}
                />
                <Text style={styles.error}>{Fname=="" && submit?"Please enter your first Name.":""}</Text>
                <TextInput
                label="Last name"
                style={Lname=="" && submit? styles.Lname_text_error:styles.Lname_text}
                value={Lname}
                underlineColor="#fff"
                selectionColor='#4FB0F5'
                onChangeText={Lname => setLname(Lname)}
                />
                <Text style={styles.error}>{Lname=="" && submit? "Please enter your last Name.":""}</Text>
               <TextInput
                  label="Date of Birth"
                  style={dob=="" && submit?styles.dob_error:styles.dob}
                  value={dob}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  onChangeText={dob => ageCheck(dob)}
                  onBlur={checkBirth}
               />
               <Text style={styles.error}>{dob=="" && submit? "Please enter your date of birth.":!dobVal?"You must be at least 13 years old.":!month?"Invalid Date":""}</Text>
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
                  label="Create username"
                  style={Uname=="" && submit?styles.Uname_error:styles.Uname}
                  value={Uname}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  onChangeText={Uname => setUname(Uname)}
               />
               <Text style={styles.error}>{Uname=="" && submit? "Please enter your username.":""}</Text>
               <TouchableOpacity
                  style={styles.registerbtn}
                  onPress={goToVerify}
               >
                  <Text style={styles.button}>Continue</Text>
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
   Lname_text: {
      borderWidth: 1,
      borderColor: "#EAEAEA",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: 5,
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
      marginTop: 5,
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
   Uname: {
      borderWidth: 1,
      borderColor: "#EAEAEA",
      borderStyle: "solid",
      backgroundColor: "#fff",
      borderRadius: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      marginTop: -43,
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
      marginTop: -43,
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
      marginTop: 5,
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
      marginTop: 5,
      height: 48
   },
   registerbtn: {
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

const mapStateToProps = state => ({
   user1: state.user1,
   user2: state.user2,
});

const mapDispatchToProps = dispatch => ({
   userSave: (data) => dispatch(userData2(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register2)