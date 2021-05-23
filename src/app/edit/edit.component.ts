import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  form: FormGroup;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.form = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  submit() {
    this.form.value.price = +this.form.value.price;

    if (!this.form.value._id || this.form.value._id === '') {
      delete this.form.value._id,
      this.post();
    } else {
      this.put();
    }
  }

  post() {
    this.productService.post(this.form.value).subscribe(console.log);
  }

  put() {
    this.productService.put(this.form.value).subscribe(console.log);
  }
}
