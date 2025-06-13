import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {TuiButton, TuiLink, TuiTextfield, TuiTextfieldComponent, TuiTitle} from '@taiga-ui/core';
import {TuiTextarea} from '@taiga-ui/kit';
import {ROUTES} from '../../constants/routes.constants';

@Component({
  selector: 'app-access-token',
  imports: [ReactiveFormsModule, TuiButton, TuiTextfieldComponent, TuiTextfield, TuiTextarea, TuiTitle, TuiLink, RouterLink],
  templateUrl: './access-token.component.html',
  styleUrl: './access-token.component.css'
})
export class AccessTokenComponent {
  private accessTokenService = inject(AuthService);
  private router = inject(Router);

  protected readonly routes = ROUTES;
  protected formControl = new FormControl<string>(
    {value: '', disabled: false},
    {validators: [Validators.required]}
  );

  protected saveToken(): void {
    const token = this.formControl.value;
    if (token) {
      this.accessTokenService.setAccessToken(token);
      this.router.navigate([this.routes.home]);
    }
  }
}
