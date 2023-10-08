import Link from "next/link";
const signupError = () => {
	return (
		<div className=" bg-ghostWhite">
			<div className=" bg-primary shadow-md">
				<h3 className=" text-dogwoodRose">Oops!!!</h3>
				<h4>
					This user email & Phone number already exist please kindly use another
					details
				</h4>
				<button className=" bg-dogwoodRose text-primary">
					<Link
						href="/signup"
						className="font-black"
					>
						Signup
					</Link>
				</button>
			</div>
		</div>
	);
};

export default signupError;
