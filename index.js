// Assuming your sample.xlsx file is in the same directory as index.js
const file = "xlsx/sample.xlsx";

// Function to handle file reading and displaying data
const handleFile = async () => {
  try {
    const response = await fetch(file);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error loading Excel file:", error);
    return null;
  }
};

const displayData = async () => {
    try{
        const jsonData = await handleFile();
        if(jsonData){
            // Display the data in a simple HTML table
            const table = document.createElement("table");
            table.border = "1";
            jsonData.forEach((row, rowIndex) => {
              const tr = document.createElement("tr");
              Object.values(row).forEach((cellData, cellIndex) => {
                const td = document.createElement("td");
                td.textContent = cellData;
                tr.appendChild(td);
              });
              table.appendChild(tr);
            });
          
            // Append the table to the HTML body
            document.getElementById("excel-table").appendChild(table);
        }
    } catch (error) {
        console.error("Error displaying data:", error);
    }
};

// Call the function to display the Excel data
displayData();
