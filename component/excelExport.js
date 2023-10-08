import React from "react";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { Icon } from "@iconify/react";

export const ExportExcel = ({ excelData, fileName, page }) => {
	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";

	const exportToExcel = async () => {
		const ws = XLSX.utils.json_to_sheet(excelData);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};

	return (
		<div
			className=" flex h-14 cursor-pointer items-center justify-center rounded-lg bg-aquaMarine p-3 text-primary"
			onClick={(e) => exportToExcel(fileName)}
		>
			<Icon
				icon="material-symbols:cloud-download-outline"
				className="text-3xl"
			/>
			<span className="ml-2">template</span>
		</div>
	);
};
