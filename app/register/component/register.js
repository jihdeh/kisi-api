import React, {PropTypes} from "react";
import compose from "recompose/compose";
import setPropTypes from "recompose/setPropTypes";
import IPropTypes from "react-immutable-proptypes";
import withState from "recompose/withState";
import {toJS, Map, fromJS} from "immutable";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import setDisplayName from "recompose/setDisplayName";
import withHandlers from "recompose/withHandlers";
import {Row, Col, Input, Button} from "react-materialize";
import validator from "validator";
import {Link, browserHistory} from "react-router";
import {
	registerUser
} from "../../homepage/homepage-actions";
import {connect} from "react-redux";

const changeUsername = props => (value) => {
const userName = !validator.isEmpty(value.trim());
	props.onEnterName(value);
	return !userName ? props.onUserNameError("Invalid Username") : props.onUserNameError(null);
};

const changeEmail = props => (value) => {
	const userEmail = validator.isEmail(value.trim()) &&
		!validator.isEmpty(value);
		props.onEnterEmail(value);
		return !userEmail ? props.onEmailError("Invalid Email") : props.onEmailError(null);
};
const changePassword = props => (value) => {
	const userPassword = !validator.isEmpty(value.trim()) && value.length >= 8;
	props.onEnterPassword(value);
	return !userPassword ? props.onPasswordError("Please enter password") : props.onPasswordError(null);
};

const styles = {
	topDiv: {
		width: "60%",
    margin: "0 auto"
	}
}

const mapStateToProps = state => ({
	user: state.get("user")
});

const mapDispatchToProps = (dispatch, props) => ({
	onRegister: (details) => {
		event.preventDefault();
		if(!details.username || !details.email || !details.password) {
			props.onSubmit("Cannot register due to errors in form, please rectify");
		} else {
			dispatch(registerUser(details));
		}
	}
});

const enhance = compose(
	setDisplayName("Register"),
	onlyUpdateForPropTypes,
	setPropTypes({
		onEnterName: PropTypes.func,
		onEnterEmail: PropTypes.func,
		onEnterPassword: PropTypes.func,
		onEnterCountryCode: PropTypes.func,
		onRegister: PropTypes.func,
		user: IPropTypes.map
	}),
	withState("username", "onEnterName", ""),
	withState("usernameError", "onUserNameError", true),
	withState("emailError", "onEmailError", true),
	withState("passwordError", "onPasswordError", true),
	withState("email", "onEnterEmail", ""),
	withState("password", "onEnterPassword", ""),
	withState("submitMessage", "onSubmit", ""),
	withHandlers({
		changeUsername,
		changeEmail,
		changePassword,
	}),
	connect(mapStateToProps, mapDispatchToProps)
);

const Register = enhance(({
	changeEmail,
	changeUsername,
	changePassword,
	username,
	email,
	password,
	emailError,
	usernameError,
	passwordError,
	submitMessage,
	onRegister,
	user = new Map()
}) => {
	const resgisterResponse = Object.assign({}, user.toJS());
	return (
		<div style={styles.topDiv}>
			<form>
				<Row>
			    <Input s={12} label="Name" value={username} onChange={evt => changeUsername(evt.target.value)}/>
			    <p style={{color: "red"}}>{usernameError}</p>
			    <Input type="email" value={email} label="Email" s={12}  onChange={evt => changeEmail(evt.target.value)} />
			    <p style={{color: "red"}}>{emailError}</p>
			    <Input type="password" value={password} min="4" label="password" s={12} onChange={evt => changePassword(evt.target.value)} />
			    <small>Min of 8 characters</small>
			    <p style={{color: "red"}}>{passwordError}</p>
			    <Button waves="light" style={{display: "inline-block"}} onClick={_ => onRegister({username, email, password})} disabled={
			    	username =="" || email === "" || password === ""
			    }>Register</Button>
					<Button waves="light" style={{float: "right", backgroundColor: "white", boxShadow: "none"}}><Link to="/login">Login</Link></Button>
			    <p>{resgisterResponse && JSON.stringify(resgisterResponse.response)}</p>
				</Row>
			</form>
		</div>
	)
});

export default Register;
