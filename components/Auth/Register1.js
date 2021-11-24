import * as React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, ScrollView, Image } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Header from './header'
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { userData1 } from '../../actions/userdata1';

const Register1 = (props) => {
    const user1 = props.user;
    console.log(user1)
    const [submit, setSubmit] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [emailVal, setEmailVal] = React.useState(true);
    const [phoneVal, setPhoneVal] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [passwordVal, setPasswordVal] = React.useState(true);
    const [eye, setEye] = React.useState(true);
    const goToLogin = () => {
        Actions.login()
    }
    const goToRegister2 = () => {
        setSubmit(true);
        if(email!=""&&password!=""&&emailVal&&phoneVal&&passwordVal){
            props.userSave({"email":email, "password":password});
            Actions.register2()
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
        setPasswordVal(true);
        let lowerCaseLetters = /[a-z]/g;
        let upperCaseLetters = /[A-Z]/g;
        let numbers = /[0-9]/g;
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if(password.match(lowerCaseLetters)){
            setPasswordVal(true)
        }
        if(password.match(upperCaseLetters)){
            setPasswordVal(true)
        }
        if(password.match(numbers)){
            setPasswordVal(true)
        }
        if(password.length >= 8){
            setPasswordVal(true)
        }
        if(format.test(password)){
            setPasswordVal(true)
        }
        else{
            setPasswordVal(false);
        }
    }

   return (
      <ScrollView style = {styles.whole}>
         <View style = {styles.register_main}>
            <Header />
            <View style={styles.register_input}>
               <Text style={styles.register_head}>Register</Text>
               <TextInput
                  label="Email or Phone Number"
                  style={email=="" && submit?styles.email_error:styles.email}
                  value={email}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  onChangeText={(email) => validate(email)}
               />
               <Text style={styles.error}>{email=="" && submit? "Please enter your email address or mobile number.":!emailVal?"Email is Not Correct":!phoneVal?"Phone Number is Not Correct.":""}</Text>
               <TextInput
                  label="Create password"
                  style={password=="" && submit?styles.password_error:styles.password}
                  value={password}
                  underlineColor="#fff"
                  selectionColor='#4FB0F5'
                  secureTextEntry={eye?true:false}
                  onChangeText={password => setPassword(password)}
                  onBlur={passwordCheck}
               />
               <Text style={styles.error}>{password=="" && submit? "Please enter your password.":!passwordVal?"Password should have minimum 8 characters, 1 upper case, 1 lower case, 1 special character and 1 number":""}</Text>
               <TouchableOpacity
                  onPress={()=>setEye(!eye)}
                  style={!passwordVal&&password!=""?styles.touch_error:styles.touch}
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
               <View style={styles.agree}>
                    <Text style={styles.agree_letter}>
                        By clicking Agree & Create account, you agree to the Ollset User &#x2007;
                        <TouchableOpacity style = {styles.agreement}>
                            <Text style = {styles.agreementText}>Agreement</Text>
                        </TouchableOpacity>
                         and
                        <TouchableOpacity style = {styles.policy}>
                            <Text style = {styles.policyText}>&#x2007;Privacy Policy</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
               <TouchableOpacity
                  style={styles.registerbtn}
                  onPress={goToRegister2}
               >
                  <Text style={styles.button}>Agree & Create account</Text>
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
        height: 48,

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
        marginTop: 24,
        height: 48
    },
    agree: {
        width: 290,
        height: 40,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: -50 
    },
    agree_letter: {
        fontSize: 13,
        fontWeight: "400",
        color: "#474453",
        textAlign: "center",
        lineHeight: 20
    },
    agreement: {
        position: "relative",
        top: 5
    },
    agreementText: {
        position: "relative",
        top: 5,
        left: -2,
        color: "#4FB0F5"
    },
    policy: {
        position: "relative",
        top: 5
    },
    policyText: {
        position: "relative",
        top: 5,
        color: "#4FB0F5"
    },
    registerbtn: {
        marginTop: 20,
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
    touch_error:{
        height:50,
        width: 50,
        alignSelf: 'flex-end',
        position: "relative",
        top: -63
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
 
 export default connect(mapStateToProps, mapDispatchToProps)(Register1)