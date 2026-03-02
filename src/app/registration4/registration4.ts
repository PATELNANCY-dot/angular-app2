import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-registration4',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration4.html',
  styleUrls: ['./registration4.css'],
})
export class Registration4 {
  registrationForm: FormGroup;
 
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      nomineeName: ['', Validators.required],
      nomineeRelation: ['', Validators.required],
      nomineeDob: ['', Validators.required],
      nomineePan: ['', Validators.required],
    });

    // Pre-fill form from localStorage if available
    const savedData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');
    this.registrationForm.patchValue(savedData);
  }

  private formatToISO(dateString: string | null): string | null {
    if (!dateString) return null;

    const parts = dateString.split('-'); // expecting dd-mm-yyyy

    if (parts.length !== 3) return null;

    const [day, month, year] = parts;

    const isoDate = new Date(`${year}-${month}-${day}`);

    return isNaN(isoDate.getTime())
      ? null
      : isoDate.toISOString();
  }
  submit() {

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const existingData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');

    const finalData = {
      Name: existingData.name || null,
      Email: existingData.email || null,
      Mobile: existingData.mobile || null,
      Pan: existingData.pan || null,
      Aadhar: existingData.aadhar || null,

      Dob: this.formatToISO(existingData.dob),

      Gender: existingData.gender || null,
      PlaceOfBirth: existingData.placeOfBirth || null,
      Nationality: existingData.nationality || null,

      StateID: existingData.stateID ? +existingData.stateID : null,
      CorrespondingState: existingData.correspondingState ? +existingData.correspondingState : null,
      CorrespondingCity: existingData.correspondingCity ? +existingData.correspondingCity : null,
      CityID: existingData.cityID ? +existingData.cityID : null,

      PermanentAddress: existingData.permanentAddress || null,
      Pincode: existingData.pincode || null,
      CorrespondingAddress: existingData.correspondingAddress || null,

      BankName: existingData.bankName || null,
      AccountNumber: existingData.accountNumber || null,
      BranchName: existingData.branchName || null,
      IfscCode: existingData.ifscCode || null,
      BranchAddress: existingData.branchAddress || null,
      MicrCode: existingData.micrCode || null,

      NomineeName: this.registrationForm.value.nomineeName || null,
      NomineeRelation: this.registrationForm.value.nomineeRelation || null,
      NomineeDob: this.formatToISO(this.registrationForm.value.nomineeDob),
      NomineePan: this.registrationForm.value.nomineePan || null,

      GuardianName: null,
      GuardianRelation: null,
      GuardianDob: null,
      GuardianPan: null
    };

    this.http.post<any>('http://localhost:5048/api/clientregistrations', finalData)
      .subscribe({
        next: (res) => {

          const clientId = res.clientId;

          const finalData1 = {
            Username: existingData.name,
            Password_1: existingData.Password_1,
            ClientId: clientId
          };

          this.http.post('http://localhost:5048/api/auth/store', finalData1)
            .subscribe({
              next: () => {
                alert('Registration successful!');
                localStorage.removeItem('clientRegistration');
                this.router.navigate(['/factor-auth']);
              },
              error: err => {
                console.error(err);
                alert('Login store failed.');
              }
            });

        },
        error: err => {
          console.error(err);
          alert('Registration failed.');
        }
      });
  }

  goBack() {
    this.router.navigate(['/registration3']);
  }


  //CUSTOME DATECOX
  @ViewChild('dobInput') dobInput!: ElementRef;
  fpInstance: any;




  ngAfterViewInit(): void {
    this.fpInstance = flatpickr(this.dobInput.nativeElement, {
      dateFormat: "d-m-Y",
      maxDate: "today",
      disableMobile: true,
      allowInput: false,
      monthSelectorType: "dropdown",
      clickOpens: false,

      onReady: (_, __, instance) => {
        this.removeYearSpinner(instance);
      },

      onMonthChange: (_, __, instance) => {
        this.removeYearSpinner(instance);
      },

      onYearChange: (_, __, instance) => {
        this.removeYearSpinner(instance);
      }
    });
  }

  removeYearSpinner(instance: any) {
    setTimeout(() => {
      const yearInput = instance.calendarContainer.querySelector(".cur-year");
      if (yearInput) {
        yearInput.setAttribute("type", "text");
        yearInput.style.width = "60px";
      }
    });
  }
  toggleCalendar() {
    if (this.fpInstance.isOpen) {
      this.fpInstance.close();
    } else {
      this.fpInstance.open();
    }
  }
}
