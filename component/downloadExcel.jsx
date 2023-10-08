import { Icon } from "@iconify/react";
import * as FileSaver from "file-saver";
import  * as XLSX from "xlsx";

export const DownloadExcel = ({ excelData, fileName, close }) => {
	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";

	const exportToExcel = async () => {
		const ws = XLSX.utils.json_to_sheet(excelData);
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
        close();
	};
    
	return (
        <div
            className="flex cursor-pointer items-center rounded-lg bg-aquaMarine p-2 text-primary"
            onClick={exportToExcel}
        >
            <Icon
                icon="file-icons:microsoft-excel"
                className="text-3xl"
            />
            <span className="ml-2">as excel</span>
    </div>
		
	);
};