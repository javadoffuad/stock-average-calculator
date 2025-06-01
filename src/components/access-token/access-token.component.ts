import {Component, output} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-access-token',
  imports: [ReactiveFormsModule],
  templateUrl: './access-token.component.html',
  styleUrl: './access-token.component.css'
})
export class AccessTokenComponent {
  protected formControl = new FormControl<string>(
    {value: '', disabled: false},
    {validators: [Validators.required]}
  );
  protected applyToken = output<string>();

  protected saveToken(): void {
    const token = this.formControl.value;
    if (token) {
      this.applyToken.emit(token);
    }
  }
}
