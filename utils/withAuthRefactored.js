import AuthHelperMethods from "./AuthHelperMethods";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MobileNav from "../component/general/mobilenavmenu";
import Nav from "../component/general/nav";

export default function withAuth(AuthComponent) {
	const Auth = new AuthHelperMethods();

	const AuthWrapped = (props) => {
		const router = useRouter();

		const [confirm, setConfirm] = useState(null);
		const [loaded, setLoaded] = useState(false);
		const [showMobileMenu, setShowMobileMenu] = useState(false);

		const setShowMobileMenuVisibility = (val) => {
			setShowMobileMenu(val);
		};

		useEffect(() => {
			if (!Auth.loggedIn()) {
				router.push("/signin");
			} else {
				/* Try to get confirmation message from the Auth helper. */
				try {
					const confirm = Auth.getConfirm();
					setConfirm(confirm);
					setLoaded(true);
				} catch (err) {
					/* Oh snap! Looks like there's an error so we'll print it out and log the user out for security reasons. */
					//console.log(err);
					Auth.logout();
					router.push("/signin");
				}
			}
		}, []);

		return (
			<>
				{loaded && confirm && (
					<>
						{Auth.loggedIn() && (
							<Nav setShowMobileMenu={setShowMobileMenuVisibility} />
						)}

						<AuthComponent
							history={props.history}
							confirm={confirm}
							{...props}
						/>

						{Auth.loggedIn() && showMobileMenu && (
							<MobileNav setShowMobileMenu={setShowMobileMenuVisibility} />
						)}
					</>
				)}
			</>
		);
	};

	return AuthWrapped;
}
