// src/components/ExportPDF/index.js
import React from 'react';
import './index.css';
import { useAppContext } from '../../context/AppContext';
import { jsPDF } from 'jspdf';

function ExportPDF({ customerId }) {
  const { customers } = useAppContext();
  const customer = customers.find((customer) => customer.id === parseInt(customerId));

  if (!customer) {
    return <div>Customer not found</div>;
  }

  const generatePDF = () => {
    const doc = new jsPDF();

    // Customer Info
    doc.setFontSize(18);
    doc.text(`Credit Ledger for ${customer.name}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Outstanding Balance: ₹${customer.balance}`, 14, 30);
    doc.text(`Total Paid: ₹${customer.transactions.reduce((sum, transaction) => sum + transaction.amountPaid, 0)}`, 14, 40);
    doc.text(`Remaining Balance: ₹${customer.balance - customer.transactions.reduce((sum, transaction) => sum + transaction.amountPaid, 0)}`, 14, 50);

    // Transactions Table
    const tableStartY = 60;
    const lineHeight = 10;
    const columns = ['Item', 'Loan Amount', 'Repayment Date', 'Amount Paid'];

    // Table Header
    doc.setFontSize(10);
    columns.forEach((col, index) => {
      doc.text(col, 14 + (index * 40), tableStartY);
    });

    // Transactions Rows
    customer.transactions.forEach((transaction, index) => {
      doc.text(transaction.item, 14, tableStartY + (lineHeight * (index + 1)));
      doc.text(`₹${transaction.loanAmount}`, 54, tableStartY + (lineHeight * (index + 1)));
      doc.text(transaction.repaymentDate, 94, tableStartY + (lineHeight * (index + 1)));
      doc.text(`₹${transaction.amountPaid}`, 134, tableStartY + (lineHeight * (index + 1)));
    });

    // Download PDF
    doc.save(`${customer.name}-credit-ledger.pdf`);
  };

  return (
    <div className="export-pdf-container">
      <button onClick={generatePDF}>Export to PDF</button>
    </div>
  );
}

export default ExportPDF;
