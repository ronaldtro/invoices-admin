import { environment } from "../../environments/environment";


export async function getFilteredInvoicesService(customerName: string, invoiceId: string) {

  console.log(`${environment.apiUrl}/invoices${customerName ? '?customerName=' + customerName : ""}${invoiceId ? '?id=' + invoiceId : ""}`);

  const response: any = await fetch(`${environment.apiUrl}/invoices${customerName ? '?customerName=' + customerName : ""}${invoiceId ? '?id=' + invoiceId : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response;
}

export async function getPaginationInvoicesService(start: number, limit: number) {

  console.log(`${environment.apiUrl}/invoices${start >= 0 ? '?_start=' + start : ""}${limit ? '&_limit=' + limit : ""}`);

  const response: any = await fetch(`${environment.apiUrl}/invoices${start >= 0 ? '?_start=' + start : ""}${limit ? '&_limit=' + limit : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response;
}

export async function getInvoiceService(id:string) {

  const response: any = await fetch(`${environment.apiUrl}/invoices/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response;
}

export async function getInvoicesService() {

  const response: any = await fetch(`${environment.apiUrl}/invoices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return response;
}

export async function postInvoiceService(request: any) {

  const response: any = await fetch(`${environment.apiUrl}/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  return response;
}