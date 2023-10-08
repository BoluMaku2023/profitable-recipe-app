import AuthIndex from "../component/auth/index";
import withNoAuth from "../utils/withNoAuth";

const SignUp = () => {
	return (
		<div>
			<AuthIndex page={"signup"} />
		</div>
	);
};

export default withNoAuth(SignUp);
