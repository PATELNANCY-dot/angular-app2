import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TransactionRequest {
  clientId: number;
  transactionId: string;
  amount: number;
  paymentMode: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:5048/api/Transactions';

  constructor(private http: HttpClient) { }

  createTransaction(data: TransactionRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
