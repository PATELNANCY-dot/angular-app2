import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-transaction-status',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transaction-status.html',
  styleUrls: ['./transaction-status.css']
})
export class TransactionStatus {
  status: string = 'success';
  transactionId: string = '';
  amount: number = 0;
  transactionTime: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.status = params['status'] || 'success';
      this.amount = Number(params['amount']) || 0;
      this.transactionId = params['txn'] || 'N/A';
    });
    this.transactionTime = new Date().toLocaleString();
  }

  getStatusClass() {
    if (this.status === 'success') return 'success-card';
    if (this.status === 'failed') return 'failed-card';
    return 'pending-card';
  }

  getIcon() {
    if (this.status === 'success') return 'bi-check-circle-fill';
    if (this.status === 'failed') return 'bi-x-circle-fill';
    return 'bi-clock-fill';
  }

  downloadPDF() {
    const doc = new jsPDF();

    // HEADER
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text('Transaction Receipt', 14, 25);

    // STATUS CIRCLE WITH ICON
    const circleX = 180;
    const circleY = 25;
    const radius = 8;

    doc.setFont('helvetica', 'bold'); // safe font for symbols

   

    // SUBTITLE DATE
    doc.setFontSize(12);
    doc.setTextColor(50);
    doc.text(`Date: ${this.transactionTime}`, 14, 35);

    // FORMAT AMOUNT (REMOVE EXTRA QUOTES)
    const formattedAmount = `RS.${this.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

    // TABLE DATA
    const tableColumn = ['Field', 'Value'];
    const tableRows = [
      ['Transaction ID', this.transactionId],
      ['Amount', formattedAmount],
      ['Status', this.status.toUpperCase()],
      ['Date & Time', this.transactionTime],
    ];

    autoTable(doc, {
      startY: 45,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      bodyStyles: { fontSize: 12 },
      styles: { cellPadding: 4 },
    });

    // SAVE PDF
    doc.save(`transaction-${this.transactionId}.pdf`);
  }
}
