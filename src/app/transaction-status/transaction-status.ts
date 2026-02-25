import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-transaction-status',
  imports: [CommonModule, TitleCasePipe, RouterLink],
  templateUrl: './transaction-status.html',
  styleUrl: './transaction-status.css',
})
export class TransactionStatus {
  status: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.status = params.get('status');
    });
  }

  getStatusClass(): string {
    if (this.status === 'success') return 'text-success border-success bg-light-success';
    if (this.status === 'failed') return 'text-danger border-danger bg-light-danger';
    if (this.status === 'pending') return 'text-warning border-warning bg-light-warning';
    return 'text-secondary border-secondary bg-light';
  }
}
