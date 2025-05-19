
import { Component, OnInit } from '@angular/core';
import { getFilteredInvoicesService, getInvoicesService, getPaginationInvoicesService }
  from '../../services/invoice.service';
import { WarningAlert } from '../../utils/WarningAlert';
import { DangerAlert } from '../../utils/DangerAlert';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { dayMonthYearDate } from '../../utils/dateParse';
import { RouterModule } from '@angular/router';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent implements OnInit {

  invoices: Invoice[];
  customerNameFilter: string;
  invoiceIdfilter: string;
  currentPage;
  itemsPerPage;
  totalPages;
  totalPagesArray: number[];
  dayMonthYearDate = dayMonthYearDate;

  constructor() {
    this.invoices = [];
    this.customerNameFilter = "";
    this.invoiceIdfilter = "";
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.totalPages = 0;
    this.totalPagesArray = []
  }

  ngOnInit(): void {
    //this.getInvoices();
    this.getPaginationInvoices();
    this.getTotalInvoices();
  }


  async getPaginationInvoices() {

    try {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const response = await getPaginationInvoicesService(start, this.itemsPerPage);

      if (!response.ok) {
        const errorData = await response.json();
        WarningAlert.setMessageAlertSubject(errorData.message || '');
        WarningAlert.setStateAlertSubject(true);
        return;
      }

      const data = await response.json();
      console.log(data);
      this.invoices = data;

    } catch (e: any) {
      DangerAlert.setMessageAlertSubject(e.message);
      DangerAlert.setStateAlertSubject(true);
    }
    
  }

  async applyFilters() {

    try {
      const response = await getFilteredInvoicesService(this.customerNameFilter, this.invoiceIdfilter);

      if (!response.ok) {
        const errorData = await response.json();
        WarningAlert.setMessageAlertSubject(errorData.message || '');
        WarningAlert.setStateAlertSubject(true);
        return;
      }

      const data = await response.json();
      console.log(data);
      this.invoices = data;

    } catch (e: any) {
      DangerAlert.setMessageAlertSubject(e.message);
      DangerAlert.setStateAlertSubject(true);
    }

  }

  invoiceTotal(i: any): number {

    const products = i.products ?? [];
    const total = products.map((p: any) => Number(p.productAmount) * Number(p.productPrice)).reduce((total: number, val: any) => total + val, 0);
    //console.log(total);
    return total;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getPaginationInvoices();
    }
  }

  async getTotalInvoices() {

    try {
      const response = await getInvoicesService();

      if (!response.ok) {
        const errorData = await response.json();
        WarningAlert.setMessageAlertSubject(errorData.message || '');
        WarningAlert.setStateAlertSubject(true);
        return;
      }

      const data = await response.json();
      this.totalPages = Math.ceil(data.length / this.itemsPerPage);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    } catch (e: any) {
      DangerAlert.setMessageAlertSubject(e.message);
      DangerAlert.setStateAlertSubject(true);
    }


  }

  updateChanges() {
    this.currentPage = 1;
    this.getPaginationInvoices();
    this.getTotalInvoices();
  }

  async getInvoices() {

    try {
      const response = await getInvoicesService();

      if (!response.ok) {
        const errorData = await response.json();
        WarningAlert.setMessageAlertSubject(errorData.message || '');
        WarningAlert.setStateAlertSubject(true);
        return;
      }

      const data = await response.json();
      //console.log(data);
      this.invoices = data;

    } catch (e: any) {
      DangerAlert.setMessageAlertSubject(e.message);
      DangerAlert.setStateAlertSubject(true);
    }

  }

}
