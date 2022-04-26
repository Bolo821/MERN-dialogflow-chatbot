import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import auth0Service from 'app/services/auth0Service';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import jwt_decode from 'jwt-decode';

import { setCurrentUser, logoutUser } from 'app/user/actions/authActions';
import { withRouter } from 'react-router-dom';


let user_list = ['/', '/dashboard', '/profile', '/login', '/register', '/order', '/chat'];
let guest_list = ['/', 'dashboard', '/login', '/register'];

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			waitAuthCheck: true
		};
	}

	componentDidMount() {
		this.jwtCheck();
	}

	jwtCheck = () => {
		
		if (localStorage.jwtToken) {
			const decoded = jwt_decode(localStorage.jwtToken);
			this.props.setCurrentUser(decoded);

			const currentTime = Date.now() / 1000;
			if (decoded.exp < currentTime)
			{
				this.props.logoutUser(this.props.history);
				this.props.history.push('/chat');
			} else {
				if(decoded.permission === 'user') {
					if(!user_list.includes(this.props.location.pathname)) {
						this.props.history.push('/');
					}
				} else if(decoded.permission === 'superadmin') {
					if(this.props.location.pathname === '/chat' || this.props.location.pathname === '/') {
						this.props.history.push('/dashboard');
					}
				}
			}
		}
		if(!guest_list.includes(this.props.location.pathname) && !this.props.location.pathname.includes('chat')) {
			this.props.history.push('/');
		}
		this.setState({waitAuthCheck: false});
	}

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logoutUser: logoutUser,
			setCurrentUser
		},
		dispatch
	);
}

function mapStateToProps(state) {
	return {
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
