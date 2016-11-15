import React, {PropTypes, Component} from "react";
import compose from "recompose/compose";
import IPropTypes from "react-immutable-proptypes";
import setDisplayName from "recompose/setDisplayName";
import setPropTypes from "recompose/setPropTypes";
import { connect } from "react-redux";
import {toJS} from "immutable";
import onlyUpdateForPropTypes from "recompose/onlyUpdateForPropTypes";
import {Button, Row} from "react-materialize";
import {browserHistory} from "react-router";


const mapStateToProps = (state, props) => ({
	user: state.get("user"),
});

class HomeView extends Component {
	static propTypes = {
		user: IPropTypes.map
	}
	constructor(props) {
		super(props);
	}
	render() {
		const {user} = this.props;
		const profile = Object.assign({}, user.toJS());
		return (
			<div>
				{profile.user && <Row>
					<p>User home page</p>
					<p>User iD: {profile.user.userId}</p>
					<p>Email: {profile.user.email}</p>
				</Row>
				}
			</div>
		)
	}
}


export default connect(mapStateToProps)(HomeView);
