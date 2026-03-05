// File: services/transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:5048/api/Transactions'; // <-- Correct URL

  constructor(private http: HttpClient) { }

  createTransaction(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
