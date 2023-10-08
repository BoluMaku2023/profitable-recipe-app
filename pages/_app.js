import GeneralUI from "../component/general/generalUI";
import "../styles/globals.css";
import AppProvider from "./AppContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const MyApp = ({ Component, pageProps }) => {
	return (
		<AppProvider>
			<ToastContainer hideProgressBar={true} closeOnClick={true} draggable={false} pauseOnHover={false} />
			<Component {...pageProps} />
			<GeneralUI />
		</AppProvider>
	);
};

export default MyApp;
