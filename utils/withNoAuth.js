import React, { Component } from "react";
import AuthHelperMethods from "./AuthHelperMethods";

export default function withAuth(AuthComponent) {
	const Auth = new AuthHelperMethods();

	return class AuthWrapped extends Component {
		state = {
			confirm: null,
			loaded: false,
		};

		/* In the componentDid<ount, we would want to do a couple of important tasks in order to verify the current users authentication status
      prior to granting them enterance into the app. */
		componentDidMount() {
			if (Auth.loggedIn()) {
				window.location = "/dashboard";
			} else {
				/* Try to get confirmation message from the Auth helper. */
				try {
					this.setState({
						loaded: true,
					});
				} catch (err) {
					/* Oh snap! Looks like there's an error so we'll print it out and log the user out for security reasons. */
					console.log(err);
					//Auth.logout();
				}
			}
		}

		render() {
			if (this.state.loaded == true) {
				//console.log("confirmed!");
				return (
					/* component that is currently being wrapper(App.js) */
					<AuthComponent
						history={this.props.history}
						confirm={this.state.confirm}
						{...this.props}
					/>
				);
			} else {
				return null;
			}
		}
	};
}
