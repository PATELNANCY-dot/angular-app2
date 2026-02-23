// File: services/nominee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UpdateNominee {
  nomineeName: string | null;
  nomineeRelation: string | null;
  nomineeDob?: string | null;
  nomineePan?: string | null;
  guardianName?: string | null;
  guardianRelation?: string | null;
  guardianDob?: string | null;
  guardianPan?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class NomineeService {

  private apiUrl = 'http://localhost:5048/api/Nominee';
  constructor(private http: HttpClient) { }

  updateNominee(data: UpdateNominee): Observable<any> {
    // Get clientId from localStorage
    const clientId = localStorage.getItem('userId');
    if (!clientId) throw new Error('Client ID not found in localStorage');

    // Attach clientId to the data
    const payload = { clientId: +clientId, ...data };
    return this.http.put(`${this.apiUrl}/Update`, payload, { responseType: 'text' });
  }

  getNominee(): Observable<any> {
    const clientId = localStorage.getItem('userId');
    if (!clientId) throw new Error('Client ID not found in localStorage');
    return this.http.get(`${this.apiUrl}/${clientId}`);
  }
}
