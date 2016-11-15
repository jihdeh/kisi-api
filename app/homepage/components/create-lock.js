import React, {PropTypes} from "react";
import compose from "recompose/compose";
import setPropTypes from "recompose/setPropTypes";
import IPropTypes from "react-immutable-proptypes";
import withState from "recompose/withState";
import {toJS, Map} from "immutable";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import setDisplayName from "recompose/setDisplayName";
import withHandlers from "recompose/withHandlers";
import {Row, Col, Input, Button} from "react-materialize";
import {
	registerUser
} from "../../homepage/homepage-actions";
import {connect} from "react-redux";

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
	setDisplayName("UserLocks"),
	onlyUpdateForPropTypes,
	setPropTypes({
		user: IPropTypes.map
	}),
	withState("username", "onEnterName", ""),
	withHandlers({

	}),
	connect(mapStateToProps, mapDispatchToProps)
);

const UserLocks = enhance(({
	user = new Map()
}) => {
	const user = Object.assign({}, user.toJS());
	console.log(user)
	return (
		<div>
				<Row>
				</Row>
		</div>
	)
});

export default UserLocks;
