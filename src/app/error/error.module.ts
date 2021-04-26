import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
  },
];

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatCardModule],
})
export class ErrorModule {}
