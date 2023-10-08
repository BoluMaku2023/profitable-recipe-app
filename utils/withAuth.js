import React, { Component } from "react";
import AuthHelperMethods from "./AuthHelperMethods";
import MobileNav from "../component/general/mobilenavmenu"
import Nav from "../component/general/nav"

export default function withAuth(AuthComponent) {
    const Auth = new AuthHelperMethods();
  
    return class AuthWrapped extends Component {
      state = {
        confirm: null,
        loaded: false,
        showMobileMenu: false
      };
  
      setShowMobileMenu(val){
        state.showMobileMenu = val
      }

      /* In the componentDid<ount, we would want to do a couple of important tasks in order to verify the current users authentication status
      prior to granting them enterance into the app. */
      componentDidMount() {
        if (!Auth.loggedIn()) {
          window.location = '/signin';
        } else {
          /* Try to get confirmation message from the Auth helper. */
          try {
            const confirm = Auth.getConfirm();
            //console.log("confirmation is:", confirm);
            this.setState({
              confirm: confirm,
              loaded: true
            });
          } catch (err) {
            /* Oh snap! Looks like there's an error so we'll print it out and log the user out for security reasons. */
            //console.log(err);
            Auth.logout();
            window.location = '/signin';
          }
        }
      }
  
      render() {
        if (this.state.loaded == true) {
          if (this.state.confirm) {
            //console.log("confirmed!");
            return (
              <>

                  {
                      Auth.loggedIn() && <Nav setShowMobileMenu={this.setShowMobileMenu} />
                  }

                  <AuthComponent
                    history={this.props.history}
                    confirm={this.state.confirm}
                    {...this.props}
                  />

                  { 
                      Auth.loggedIn() && this.showMobileMenu && <MobileNav setShowMobileMenu={this.setShowMobileMenu} />
                  }
              </>
            );
          } else {
            //console.log("not confirmed!");
            return null;
          }
        } else {
          return null;
        }
      }
    };

  }