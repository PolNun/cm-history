import {Component} from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <mat-progress-spinner
      color="primary"
      mode="indeterminate"
      diameter="50"
      strokeWidth="5">
    </mat-progress-spinner>`,
  styles: [`
    mat-progress-spinner {
      margin: 0 auto;
    }`]
})
export class SpinnerComponent {
}
