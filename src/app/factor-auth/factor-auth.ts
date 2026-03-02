import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-factor-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './factor-auth.html',
  styleUrls: ['./factor-auth.css'],
})
export class FactorAuth implements AfterViewInit {

  dob: string = '';
  pan: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  // ================= SUBMIT =================
  submit() {

    if (!this.dob || !this.pan) {
      alert('Please fill both fields.');
      return;
    }

    // Convert dd-mm-yyyy to ISO before sending
    const isoDob = this.formatToISO(this.dob);

    this.http.post('http://localhost:5048/api/TwoFactorAuth',
      { Dob: isoDob, Pan: this.pan })
      .subscribe({
        next: () => {
          alert('Verified Successfully');
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Invalid DOB or PAN');
        }
      });
  }

  // ================= DATE FORMAT FIX =================
  private formatToISO(dateString: string): string | null {
    if (!dateString) return null;

    const parts = dateString.split('-'); // dd-mm-yyyy
    if (parts.length !== 3) return null;

    const [day, month, year] = parts;
    const dateObj = new Date(`${year}-${month}-${day}`);

    return isNaN(dateObj.getTime())
      ? null
      : dateObj.toISOString();
  }

  // ================= FLATPICKR =================
  @ViewChild('nomineeDobInput') nomineeDobInput!: ElementRef;
  fpInstance: any;

  ngAfterViewInit(): void {
    this.fpInstance = flatpickr(this.nomineeDobInput.nativeElement, {
      dateFormat: "d-m-Y",
      maxDate: "today",
      disableMobile: true,
      allowInput: false,
      monthSelectorType: "dropdown",
      clickOpens: false,
      onReady: (_, __, instance) => this.removeYearSpinner(instance),
      onMonthChange: (_, __, instance) => this.removeYearSpinner(instance),
      onYearChange: (_, __, instance) => this.removeYearSpinner(instance)
    });
  }

  toggleNomineeCalendar() {
    this.fpInstance.isOpen
      ? this.fpInstance.close()
      : this.fpInstance.open();
  }

  removeYearSpinner(instance: any) {
    setTimeout(() => {
      const yearInput =
        instance.calendarContainer.querySelector(".cur-year");

      if (yearInput) {
        yearInput.setAttribute("type", "text");
        yearInput.style.width = "60px";
      }
    });
  }
}
