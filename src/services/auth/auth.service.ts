import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken = '';

  constructor() {
    this.accessToken = localStorage.getItem('accessToken') ?? '';
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
    this.accessToken = token;
  }
}
