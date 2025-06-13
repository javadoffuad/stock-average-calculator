import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {TuiButton} from '@taiga-ui/core';

@Component({
  selector: 'app-access-token',
  imports: [ReactiveFormsModule, TuiButton],
  templateUrl: './access-token.component.html',
  styleUrl: './access-token.component.css'
})
export class AccessTokenComponent {
  private accessTokenService = inject(AuthService);
  private router = inject(Router);

  protected formControl = new FormControl<string>(
    {value: '', disabled: false},
    {validators: [Validators.required]}
  );

  protected saveToken(): void {
    const token = this.formControl.value;
    if (token) {
      this.accessTokenService.setAccessToken(token);
      this.router.navigate(['/']);
    }
  }
}
