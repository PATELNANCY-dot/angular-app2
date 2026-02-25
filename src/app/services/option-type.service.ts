import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OptionType {
  optionTypeId: number;
  typeText: string;
}

@Injectable({
  providedIn: 'root'
})
export class OptionTypeService {
  private apiUrl = 'http://localhost:5048/api/OptionType/ActiveOptions'; // your .NET endpoint

  constructor(private http: HttpClient) { }

  getActiveOptions(): Observable<OptionType[]> {
    return this.http.get<OptionType[]>(this.apiUrl);
  }
}
