import {Component, inject, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly usersService = inject(UsersService);

  ngOnInit() {
    this.usersService.loadAccounts();
  }
}
