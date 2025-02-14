import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-bs-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css',
})
export class BsNavbarComponent implements OnInit {
  notAdmin: boolean = false;
  Admin: boolean = false;
  username: any;
  cartlen: any = 0
  constructor(private ConnectService: ConnectService, private router: Router) { }
  ngOnInit() {
    this.ConnectService.currentData.subscribe(data => {
      if (data.isAdmin) {
        this.Admin = true
      }
      else if (data.username !== "") {
        this.notAdmin = true
      }
      else {
        this.Admin = false
        this.notAdmin = false
      }
    });
    this.ConnectService.currentData.subscribe(data => this.username = data.username)
    this.ConnectService.currentData.subscribe(data => this.cartlen = data.cartlen)

  }
  logout() {
    this.ConnectService.setData(false)
    this.ConnectService.setUsername("")
    this.router.navigate([''])
  }
  routetoCart() {
    this.router.navigate(['shoppingcart'])
  }
  routeHome() {
    this.router.navigate([''])
  }
  Checkout() {
    this.router.navigate(['checkout'])
  }
  AdminProduct() {
    this.router.navigate(['admin/products'])
  }
  AdminOrder() {
    this.router.navigate(['admin/orders'])
  }
  myOrder() {
    this.router.navigate(['my/orders'])
  }
  Login() {
    this.router.navigate(['login'])
  }
}
