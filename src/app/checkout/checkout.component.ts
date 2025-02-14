import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  phone: number = -1
  pincode: number = -1
  address: string = ""
  checkphone: boolean = false
  checkpin: boolean = false
  checaddress: boolean = false
  order:any
  total:number=0
  email:string=""
  cart:any=[]
  cartlen:number=0
  constructor(private http:HttpClient,private router: Router,private connectService:ConnectService){}
  ngOnInit() {
    this.connectService.currentData.subscribe(data => this.total = data.total)
    this.connectService.currentData.subscribe(data => this.email = data.email)
    this.connectService.currentData.subscribe(data => this.cart = data.cartproduct)
    this.connectService.currentData.subscribe(data => this.cartlen = data.cartlen)
  }
  getAddress($event: Event) {
    let address = ($event.target as HTMLInputElement).value
    if (address === "") {
      this.checaddress = false
    }
    else {
      this.checaddress = true
      this.address = address
    }
  }
  getPhone($event: Event) {
    let phone = ($event.target as HTMLInputElement).value
    let check = '1234567890'
    if(phone===""){
      this.checkphone=false
    }
    for (let i = 0; i < phone.length; i++) {
      let st = ""
      st += phone.charAt(i)
      if (check.includes(st) && phone.length === 10) {
        this.checkphone = true
      }
      else {
        this.checkphone = false
        console.log(phone)
        break
      }
    }
    if (this.checkphone) {
      this.phone = Number(phone)
    }
  }
  getPincode($event: Event) {
    let pin = ($event.target as HTMLInputElement).value
    let check = '1234567890'
    if(pin===""){
      this.checkpin=false
    }
    for (let i = 0; i < pin.length; i++) {
      let st = ""
      st += pin.charAt(i)
      if (check.includes(st) && pin.length <= 6) {
        this.checkpin = true
      }
      else {
        this.checkpin = false
        break
      }
    }
    if (this.checkpin) {
      this.pincode = Number(pin)
    }
  }
  placeOrder() {
    this.order = {
      address:this.address,
      phone:this.phone,
      email:this.email,
      pincode:this.pincode,
      total:this.total,
      cart:this.cart,
      orderdate:new Date().toDateString()
    }
    if(this.checkphone && this.checaddress && this.checkpin && this.cartlen>0){
      this.http.post('https://my-json-server.typicode.com/somuthegamer49/Oshop-The-Angular-Project/orders',this.order).subscribe(response=>{
        if(response){
          this.connectService.setCartLen(0)
          this.connectService.setFinCart(new Set())
          this.connectService.setIds(new Set())
          this.connectService.setProductCart([])
          this.router.navigate(['ordersuccess'])
        }
      })
    }
    else{
      console.log("Cant't place order")
    }
  }
}
