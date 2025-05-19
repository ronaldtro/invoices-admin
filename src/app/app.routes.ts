import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterInvoiceComponent } from './pages/register-invoice/register-invoice.component';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';

export const routes: Routes = [
    {
        path: "", component: PublicLayoutComponent,
        children: [
            { path: "", redirectTo: "sign-in", pathMatch: "full" },
            { path: "sign-in", component: SignInComponent, data: { animation: 'SignInPage' } },
        ]
    },
    {
        path: 'dashboard',
        component: PrivateLayoutComponent,
        children: [
            { path: "register-invoice", component: RegisterInvoiceComponent, data: { animation: 'RegisterInvoicePage' } },
            { path: "invoices", component: InvoiceListComponent, data: { animation: 'InvoiceListPage' } },
            { path: "invoice-detail/:id", component: InvoiceDetailComponent, data: { animation: 'InvoiceDetailPage' } },
        ]
    },
    { path: '**', redirectTo: '' }
];