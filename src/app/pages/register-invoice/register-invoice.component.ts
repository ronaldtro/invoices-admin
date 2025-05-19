import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { postInvoiceService } from '../../services/invoice.service';
import { WarningAlert } from '../../utils/WarningAlert';
import { DangerAlert } from '../../utils/DangerAlert';
import { SuccessAlert } from '../../utils/SuccessAlert';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { dayMonthYearDate } from '../../utils/dateParse';
import { Product } from '../../models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './register-invoice.component.html',
  styleUrl: './register-invoice.component.scss'
})
export class RegisterInvoiceComponent {

  invoiceForm: FormGroup;
  spinner: boolean;
  invoiceProducts: Product[];
  currentDate = dayMonthYearDate(new Date().toISOString());
  dayMonthYearDate = dayMonthYearDate;

  constructor(private fb: FormBuilder, private router: Router) {

    this.invoiceForm = this.fb.group({
      customerName: ['', [Validators.required]],
      customerEmail: ['', [Validators.required]],
      invoiceDate: ['', [Validators.required]],
      productName: ['', Validators.required],
      productAmount: ['', [Validators.required, Validators.min(1)]],
      productPrice: ['', [Validators.required, Validators.min(0.01)]]
    });
    this.spinner = false;
    this.invoiceProducts = [];
  }

  handleAddProduct() {

    this.invoiceForm.get('productName')?.markAsTouched();
    this.invoiceForm.get('productAmount')?.markAsTouched();
    this.invoiceForm.get('productPrice')?.markAsTouched();

    if (this.invoiceForm.get('productName')?.invalid || this.invoiceForm.get('productAmount')?.invalid
      || this.invoiceForm.get('productPrice')?.invalid) {

      WarningAlert.setMessageAlertSubject("Datos inválidos y/o faltantes.");
      WarningAlert.setStateAlertSubject(true);

      return;
    }

    Swal.fire({
      title: '¿Estás segur@?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {

        this.spinner = true;
        setTimeout(() => {

          this.spinner = false;
          const product = this.invoiceForm.value;

          this.invoiceProducts.push({
            id: this.invoiceProducts.length,
            productName: product.productName,
            productAmount: product.productAmount,
            productPrice: product.productPrice
          });

          this.invoiceForm.patchValue({
            productName: '',
            productAmount: '',
            productPrice: ''
          });

          this.invoiceForm.get('productName')?.markAsUntouched();
          this.invoiceForm.get('productAmount')?.markAsUntouched();
          this.invoiceForm.get('productPrice')?.markAsUntouched();

          SuccessAlert.setMessageAlertSubject("Acción exitosa");
          SuccessAlert.setStateAlertSubject(true);

        }, 2000);

      }
    });

  }

  handleDeleteProduct(productId: number) {
    Swal.fire({
      title: '¿Estás segur@?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceProducts = this.invoiceProducts.filter((p) => p.id != productId);
      }
    });

  }

  get invoiceTotal() {
    return this.invoiceProducts
      .map(p => p.productAmount * p.productPrice)
      .reduce((invoiceTotal, productTotal) => invoiceTotal + productTotal, 0);
  }

  async submit() {

    this.invoiceForm.get('customerName')?.markAsTouched();
    this.invoiceForm.get('customerEmail')?.markAsTouched();
    this.invoiceForm.get('invoiceDate')?.markAsTouched();

    if (this.invoiceForm.get('customerName')?.invalid || this.invoiceForm.get('customerEmail')?.invalid
      || this.invoiceForm.get('invoiceDate')?.invalid || this.invoiceProducts.length == 0) {

      WarningAlert.setMessageAlertSubject("Datos inválidos y/o faltantes.");
      WarningAlert.setStateAlertSubject(true);

    } else {

      Swal.fire({
        title: '¿Estás segur@?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.spinner = true;
          setTimeout(() => {

            const postInvoice = async () => {
              this.spinner = false;

              try {

                const req: any = {
                  customerName: this.invoiceForm.value.customerName,
                  customerEmail: this.invoiceForm.value.customerEmail,
                  invoiceDate: this.invoiceForm.value.invoiceDate,
                  products: this.invoiceProducts
                };

                console.log(req);

                const response: any = await postInvoiceService(req);

                if (!response.ok) {

                  const data = await response.json();

                  if (response.status) {
                    console.error(data.error);
                    DangerAlert.setMessageAlertSubject(data.error);
                    DangerAlert.setStateAlertSubject(true);
                  }

                  return;
                }

                const res = await response.json();
                SuccessAlert.setMessageAlertSubject("Factura creada correctamente.");
                SuccessAlert.setStateAlertSubject(true);

                this.invoiceProducts = [];
                this.invoiceForm.reset();

              } catch (e: any) {
                console.error(e);
                DangerAlert.setMessageAlertSubject(e.message);
                DangerAlert.setStateAlertSubject(true);
              } finally {
                this.spinner = false;
              }
            }

            postInvoice();

          }, 2000);
        }
      });

    }
  }
  
}
