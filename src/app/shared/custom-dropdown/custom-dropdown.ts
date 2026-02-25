import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-dropdown',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './custom-dropdown.html',
  styleUrl: './custom-dropdown.css',
})
export class CustomDropdown {
  @Input() options: { label: string, value: string }[] = [];
  @Input() placeholder: string = 'Select';
  @Input() selectedValue: string = '';

  @Output() selectedValueChange = new EventEmitter<string>();

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(value: string, event: Event) {
    event.stopPropagation();
    this.selectedValue = value;
    this.selectedValueChange.emit(value);
    this.dropdownOpen = false;
  }
}
