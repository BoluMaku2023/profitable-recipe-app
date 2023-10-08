import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "../../styles/Nav.module.css";
const Theme = () => {
	const [thememode, setthemeMode] = useState(true);

	const handleTheme = () => {
		setthemeMode(!thememode);
	};
	return (
		<div
			className={styles.themeContainer}
			onClick={handleTheme}
		>
			{thememode ? <FiSun /> : <FiMoon />}
		</div>
	);
};

export default Theme;
