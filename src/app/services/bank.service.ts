// File: account.service.ts or bank.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BankBranch {
  branchID: number;   // Matches BranchID in C# model
  branchName: string;
  cityID: number;
}

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private apiUrl = 'http://localhost:5048/api/ClientRegistrations'; // your backend URL

  constructor(private http: HttpClient) { }

  getBankBranches(cityId: number): Observable<BankBranch[]> {
    return this.http.get<BankBranch[]>(`${this.apiUrl}/bankBranch/${cityId}`);
  }
}
