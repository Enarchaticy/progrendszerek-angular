import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<any>;
  constructor(
    private productService: ProductService,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService
      .get()
      .pipe(map((res: any) => res.body));
  }

  buyItem(product) {
    const product1 = { ...product };
    delete product1._id;
    delete product1.description;
    this.productService.postSpring(product1).subscribe((res) => {});
    this.transactionService
      .post({ productid: 111, date: new Date().toISOString(), value: 1 }) // mert amikor írtam a java servert nem tudtam hogy nem lesz jó hogy számokat tárol
      .subscribe((res) => {
        this.snackBar.open(
          product.name + ' terméket sikeresen megvásárolta',
          null,
          { duration: 2000 }
        );
      });
  }
}
