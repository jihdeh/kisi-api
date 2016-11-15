import React, {PropTypes} from "react";
import IPropTypes from "react-immutable-proptypes";
import compose from "recompose/compose";
import setPropTypes from "recompose/setPropTypes";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import setDisplayName from "recompose/setDisplayName";
import {Row, Col, Input, Button} from "react-materialize";
import withState from "recompose/withState";
import {toJS, Map, fromJS} from "immutable";
import withHandlers from "recompose/withHandlers";
import {Link, browserHistory} from "react-router";
import {
	loginUser
} from "../../homepage/homepage-actions";
import {connect} from "react-redux";

const mapStateToProps = state => ({
	user: state.get("user")
});

const mapDispatchToProps = (dispatch, props) => ({
	onLogin: (details) => {
		event.preventDefault();
		if(!details.email || !details.password) {
			props.onSubmit("Cannot login due to errors in form, please rectify");
		} else {
			dispatch(loginUser(details));
		}
	}
});

const enhance = compose(
	setDisplayName("Login"),
	onlyUpdateForPropTypes,
	setPropTypes({
		onEnterEmail: PropTypes.func,
		onEnterPassword: PropTypes.func,
		user: IPropTypes.map,
		onLogin: PropTypes.func
	}),
	withState("email", "onEnterEmail", ""),
	withState("password", "onEnterPassword", ""),
	withState("submitMessage", "onSubmit", ""),
	connect(mapStateToProps, mapDispatchToProps)
);

const Login = enhance(({
	email,
	password,
	onEnterPassword,
	onEnterEmail,
	submitMessage,
	onLogin,
	user = new Map()
}) => {
	const loginResponse = Object.assign({}, user.toJS());
	return (
		<div>
			<form>
				<Row>
			    <Input type="email" value={email} label="Email" s={12}  onChange={evt => onEnterEmail(evt.target.value)} />
			    <Input type="password" value={password} min="4" label="password" s={12} onChange={evt => onEnterPassword(evt.target.value)} />
			    <Button waves="light" disabled={email === "" || password === ""} style={{display: "inline-block"}}  onClick={_ => onLogin({email, password})}>Login</Button>
					<Button waves="light" waves="light" style={{float: "right", backgroundColor: "white", boxShadow: "none"}}><Link to="/register">Register</Link></Button>
			    <p>{loginResponse && JSON.stringify(loginResponse.response)}</p>
				</Row>
			</form>
		</div>
	)
});

export default Login;
