import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import FileUpload from './components/FileUpload';
import UserTable from './components/UserTable';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/profile" component={Profile} />
                <Route path="/upload" component={FileUpload} />
                <Route path="/users" component={UserTable} />
            </Switch>
        </Router>
    );
}

export default App;
