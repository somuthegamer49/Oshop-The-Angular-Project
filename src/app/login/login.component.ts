import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConnectService } from '../connect.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  recivedData: boolean = false
  data: any = [];
  emailValue: any;
  passValue: any;
  user: {
    email: string;
    password: string;
  } | any;
  constructor(private http: HttpClient, private ConnectService: ConnectService, private router: Router) { }
  ngOnInit() {
    this.ConnectService.currentData.subscribe(data => this.recivedData = data.isAdmin);
  }
  getemail(event: Event) {
    this.emailValue = (event.target as HTMLInputElement).value
  }
  getpassword(event: Event) {
    this.passValue = (event.target as HTMLInputElement).value
  }
  login() {
    this.http.get('https://my-json-server.typicode.com/somuthegamer49/Oshop-The-Angular-Project/users')
      .subscribe(
        response => {
          this.data = response;
          this.data.forEach((user: {
            isAdmin: boolean;
            name: any; email: any; password: any;
          }) => {
            if (user.email === this.emailValue && user.password === this.passValue && user.isAdmin===true) {
              this.ConnectService.setData(user.isAdmin)
              this.ConnectService.setUsername(user.name)
              this.ConnectService.setEmail(user.email)
              this.router.navigate([''])
            }
            else if (user.email === this.emailValue && user.password === this.passValue && user.isAdmin===false) {
              this.ConnectService.setData(user.isAdmin)
              this.ConnectService.setUsername(user.name)
              this.ConnectService.setEmail(user.email)
              this.router.navigate([''])
            }
          });
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }
}
