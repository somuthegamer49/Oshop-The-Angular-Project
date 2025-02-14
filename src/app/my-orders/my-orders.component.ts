import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConnectService } from './../connect.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  orders:any
  admin:boolean=false
  username:string=""
  email:string=""
  products:any
  orderUSer:any=[]
  cart:any=[]
  emailcheck:any=[]
  user:boolean=false
  constructor(private http:HttpClient,private ConnectService:ConnectService){}
  ngOnInit() {
      this.ConnectService.currentData.subscribe(data=> this.admin=data.isAdmin)
      this.ConnectService.currentData.subscribe(data=> this.email=data.email)
      this.ConnectService.currentData.subscribe(data=> this.username=data.username)
      this.http.get('https://my-json-server.typicode.com/somuthegamer49/Oshop-The-Angular-Project/users')
      .subscribe(response=>{
        this.emailcheck = response
        this.emailcheck.forEach((user:any)=>{
          if(user.email===this.email){
            this.user=true
          }
        })
      })
      this.http.get('https://my-json-server.typicode.com/somuthegamer49/Oshop-The-Angular-Project/orders')
      .subscribe(response=>{
       if(response){
          this.orders=response
          this.orders.forEach((order:any)=>{
            if(order.email===this.email){
              this.orderUSer.push(order)
            }
          })
        } 
      })
  }
  showProducts(order:any){
    this.cart=[]
    order.cart.forEach((item:any)=>{
      this.cart.push(item)
    })
  }
}
