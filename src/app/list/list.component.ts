import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  transactions;
  products;

  constructor(
    private transactionService: TransactionService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.transactionService.getAll().subscribe((res) => {
      this.transactions = res;
    });
    this.transactionService.getAll().subscribe((res) => {
      this.products = res;
    });
  }
}
