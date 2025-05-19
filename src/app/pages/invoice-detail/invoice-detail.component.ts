import { Component, OnInit } from '@angular/core';
import { WarningAlert } from '../../utils/WarningAlert';
import { getInvoiceService } from '../../services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import { DangerAlert } from '../../utils/DangerAlert';
import { dayMonthYearDate } from '../../utils/dateParse';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../models/invoice.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit {

  invoice: Invoice;
  invoiceId: string;
  invoiceProducts:Product[];
  currentDate = dayMonthYearDate(new Date().toISOString());
  dayMonthYearDate = dayMonthYearDate;

  constructor(private route: ActivatedRoute) {

    this.invoice = {
        id: "",
        customerName: "",
        customerEmail: "",
        invoiceDate: "",
        products: []
    }
    this.invoiceId = "";
    this.invoiceProducts = [];
    
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.paramMap.get('id') || "";
    this.getInvoice();
  }

  async getInvoice() {

    try {
      const response = await getInvoiceService(this.invoiceId);

      if (!response.ok) {
        const errorData = await response.json();
        WarningAlert.setMessageAlertSubject(errorData.message || '');
        WarningAlert.setStateAlertSubject(true);
        return;
      }

      const data = await response.json();
      console.log(data);
      this.invoice = data;
      this.invoiceProducts = data.products;

    } catch (e: any) {
      DangerAlert.setMessageAlertSubject(e.message);
      DangerAlert.setStateAlertSubject(true);
    }

  }

  get invoiceTotal() {
    return this.invoiceProducts
      .map((p:any) => p.productAmount * p.productPrice)
      .reduce((invoiceTotal:any, productTotal:any) => invoiceTotal + productTotal, 0);
  }
  
}
