import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConnectService } from './../../connect.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit {
  isadmin: boolean = false
  orders: any
  cart: any = []
  iniorders: any
  constructor(private http: HttpClient, private connectService: ConnectService) { }
  ngOnInit() {
    this.connectService.currentData.subscribe(data => this.isadmin = data.isAdmin)
    this.http.get('http://localhost:3000/orders')
      .subscribe(response => {
        if (this.isadmin && response) {
          this.orders = response
          this.iniorders = response
        }
      })
  }
  getCart(order: any) {
    this.cart = []
    order.cart.forEach((item: any) => {
      this.cart.push(item)
    })
  }
  cancelOrder(order: any) {
    this.http.delete(`http://localhost:3000/orders/${order.id}`)
      .subscribe(response => {
        console.log(response)
      })
  }
  searchProducts($event: Event) {
    let query = ($event.target as HTMLInputElement).value.toLowerCase()
    let response: any = []
    this.orders.forEach((item: any) => {
      console.log(item)
      if (query !== "" && (item.address.toLowerCase().includes(query) || String(item.phone).toLowerCase().includes(query) || item.email.toLowerCase().includes(query)) || String(item.pincode).toLowerCase().includes(query) || String(item.total).toLowerCase().includes(query)) {
        response.push(item)
      }
    })
    if (query === "") {
      this.orders = this.iniorders
    }
    else {
      this.orders = response
    }
  }
}
