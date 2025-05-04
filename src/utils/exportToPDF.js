import { jsPDF } from 'jspdf';

export const exportToPDF = (customer) => {
  const doc = new jsPDF();

  // Title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Customer Loan Details', 20, 20);

  // Customer Info
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Name: ${customer.name}`, 20, 40);
  doc.text(`Phone: ${customer.phone}`, 20, 50);

  // Loans Details
  doc.text('Loans:', 20, 60);
  let yOffset = 70;
  customer.loans.forEach((loan) => {
    doc.text(`Amount: ₹${loan.amount}`, 20, yOffset);
    doc.text(`Remaining: ₹${loan.remaining}`, 20, yOffset + 10);
    doc.text(`Due Date: ${new Date(loan.dueDate).toLocaleDateString()}`, 20, yOffset + 20);
    yOffset += 30;
  });

  // Save the PDF
  doc.save(`${customer.name}_loan_details.pdf`);
};
