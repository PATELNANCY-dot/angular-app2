// registration-data.service.ts
import { Injectable } from '@angular/core';
import { ClientRegistration } from '../models/client-registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {
  private registrationData: Partial<ClientRegistration> = {};

  setData(partialData: Partial<ClientRegistration>) {
    this.registrationData = { ...this.registrationData, ...partialData };
  }

  getData(): Partial<ClientRegistration> {
    return this.registrationData;
  }

  clearData() {
    this.registrationData = {};
  }
}
