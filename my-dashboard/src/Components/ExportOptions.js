import React from "react";
import jsPDF from "jspdf";

const ExportOptions = ({ filteredArticles }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(JSON.stringify(filteredArticles, null, 2), 10, 10);
    doc.save("articles.pdf");
  };

  const exportToCSV = () => {
    try {
      const csvRows = [];
      // Add headers
      const headers = Object.keys(filteredArticles[0]);
      csvRows.push(headers.join(","));
  
      // Add rows
      filteredArticles.forEach(article => {
        const row = headers.map(header => article[header] || '');
        csvRows.push(row.join(","));
      });
  
      const csv = csvRows.join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "articles.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={exportToPDF}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Export to PDF
      </button>
      <button
        onClick={exportToCSV}
        className="px-4 py-2 bg-yellow-500 text-white rounded"
      >
        Export to CSV
      </button>
    </div>
  );
};

export default ExportOptions;
