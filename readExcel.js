const XLSX = require('xlsx');

function readExcelFile() {
    const filePath = 'E:\\Sanbercode\\QA Automation Intermediate Karyawan Batch 49 31 Agustus 2023\\Tugas\\Tugas Pekanan 6 - Web Driver IO\\testdata.xlsx';
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}

module.exports = readExcelFile;
