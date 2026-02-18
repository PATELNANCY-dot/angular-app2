import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-manage-account',
  standalone: true ,
  imports: [RouterLink, CommonModule], 
  templateUrl: './manage-account.html',
  styleUrl: './manage-account.css',
})
export class ManageAccount {
  activeTab: string = 'basic';
}
