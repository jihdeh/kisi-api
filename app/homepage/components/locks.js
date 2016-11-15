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

const enhance = compose(
	setDisplayName("Locks"),
	onlyUpdateForPropTypes,
	setPropTypes({
		user: IPropTypes.map
	}),
	connect(mapStateToProps, mapDispatchToProps)
);

const Locks = enhance(({
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

export default Locks;
