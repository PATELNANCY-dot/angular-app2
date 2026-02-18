import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5048/api/auth'; // your .NET API

  constructor(private http: HttpClient) { }

  // Store Login Data (api/Auth/store)
  storeLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/store`, data);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      Username: username,
      Password_1: password
    });
  }
}
