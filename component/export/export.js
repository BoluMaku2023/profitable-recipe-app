import { FaFileExcel, FaFilePdf } from "react-icons/fa";

const Export = ({ handleExcel, handlePdf }) => {
	return (
		<div className="export_dropdown">
			<div
				className="export_icon"
				onClick={handleExcel}
			>
				<FaFileExcel />
				<span>as excel</span>
			</div>
			<div
				className="export_icon"
				onClick={handlePdf}
			>
				<FaFilePdf />
				<span>as pdf</span>
			</div>
		</div>
	);
};

export default Export;
