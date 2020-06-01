import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HomePage from './components/HomePage/HomePage'
import RegisterUser from './components/RegisterUser/RegisterUser'
import LoginUser from './components/LoginUser/LoginUser'
import Dashboard from './components/Dashboard/Dashboard'
import NotFound from './components/NotFound/NotFound'
import ProtectedDashboard from './components/Dashboard/ProtectedDashboard'
import ProtectedLogin from './components/LoginUser/ProtectedLogin'
import ProtectedRegister from './components/RegisterUser/ProtectedRegister'
import store from './store/index'


function App () {

    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <ProtectedRegister path="/register" component={RegisterUser}/>
            <ProtectedLogin path="/login" component={LoginUser}/>
            <ProtectedDashboard path="/dashboard" component={Dashboard}/>
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer/>
        </Router>
        
      </Provider>
      
     );
  
 
}

export default App;
