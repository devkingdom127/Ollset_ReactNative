import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Login from './components/Auth/Login'
import Register1 from './components/Auth/Register1'
import Register2 from './components/Auth/Register2'
import Reset from './components/Auth/Reset'
import Passcode from './components/Auth/Passcode'
import Update from './components/Auth/Update'
import UpdateSuccess from './components/Auth/UpdateSuccess'
import RegisterSeccess from './components/Auth/RegisterSeccess'
import VerifyUser from './components/Auth/VerifyUser'
import Invite from './components/Main/Invite'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore()

const Routes = () => (
   <Router>
         <Provider store = { store }>
            <Scene key = "root" hideNavBar={true}>
               <Scene key = "login" hideNavBar={true} component = {Login} initial = {true} />
               <Scene key = "register1" hideNavBar={true} component = {Register1} />
               <Scene key = "register2" hideNavBar={true} component = {Register2} />
               <Scene key = "resetPassword" hideNavBar={true} component = {Reset} />
               <Scene key = "passcode" hideNavBar={true} component = {Passcode} />
               <Scene key = "update" hideNavBar={true} component = {Update} />
               <Scene key = "updateSuccess" hideNavBar={true} component = {UpdateSuccess} />
               <Scene key = "registerSeccess" hideNavBar={true} component = {RegisterSeccess} />
               <Scene key = "verify" hideNavBar={true} component = {VerifyUser} />
               <Scene key = "invite" hideNavBar={true} component = {Invite} />
            </Scene>
         </Provider>
   </Router>
)
export default Routes