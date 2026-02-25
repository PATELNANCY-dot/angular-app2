import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registration2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration2.html',
  styleUrls: ['./registration2.css'],
})
export class Registration2 {

  registrationForm: FormGroup;

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  correspondingStates: any[] = [];
  correspondingCities: any[] = [];

  apiUrl = 'http://localhost:5048/api/ClientRegistrations';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {

    this.registrationForm = this.fb.group({
      pan: ['', Validators.required],
      dob: ['', Validators.required],
      aadhar: ['', Validators.required],
      nationality: ['', Validators.required],
      placeOfBirth: ['', Validators.required],

      stateID: [null, Validators.required],
      cityID: [null, Validators.required],
      correspondingState: [null, Validators.required],
      correspondingCity: [null, Validators.required],

      permanentAddress: ['', Validators.required],
      correspondingAddress: ['', Validators.required],
      pincode: ['', Validators.required],
      gender: ['', Validators.required],
    });

    const savedData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');
    this.registrationForm.patchValue(savedData);
  }

  ngOnInit() {
    this.loadCountries();
  }

  // ===============================
  // Load Countries
  // ===============================
  loadCountries() {
    this.http.get<any[]>(`${this.apiUrl}/countries`)
      .subscribe(data => {
        this.countries = data;
      });
  }

  // ===============================
  // When Country Changes → Load States
  // ===============================
  onCountryChange() {
    const countryId = this.registrationForm.get('nationality')?.value;
    if (!countryId) return;
    this.http.get<any[]>(`${this.apiUrl}/states/${countryId}`).subscribe(res => {
      this.states = res;
      this.correspondingStates = res;
      this.cities = [];
      this.correspondingCities = [];
      this.registrationForm.patchValue({ stateID: null, cityID: null, correspondingState: null, correspondingCity: null });
    });
  }

  // State changed → load cities
  onStateChange() {
    const stateId = this.registrationForm.get('stateID')?.value;
    if (!stateId) return;
    this.http.get<any[]>(`${this.apiUrl}/cities/${stateId}`).subscribe(res => this.cities = res);
  }

  // Corresponding state → load corresponding cities
  onCorrespondingStateChange() {
    const stateId = this.registrationForm.get('correspondingState')?.value;
    if (!stateId) {
      this.correspondingCities = [];
      this.registrationForm.patchValue({ correspondingCity: null });
      return;
    }
    this.http.get<any[]>(`${this.apiUrl}/cities/${stateId}`).subscribe(res => this.correspondingCities = res);
  }
  // ===============================
  // Next Button
  // ===============================
  goNext() {
    const existingData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');

    const formValue = this.registrationForm.value;

    // Find selected country name
    const selectedCountry = this.countries.find(c => c.countryID == formValue.nationality);

    const updatedData = {
      ...existingData,
      ...formValue,
      nationality: selectedCountry ? selectedCountry.countryName : null // send name instead of ID
    };

    localStorage.setItem('clientRegistration', JSON.stringify(updatedData));
    this.router.navigate(['/registration3']);
  }

  goBack() {
    this.router.navigate(['/registration1']);
  }
}
