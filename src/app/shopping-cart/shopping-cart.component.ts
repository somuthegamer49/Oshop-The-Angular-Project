import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../connect.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cartproducts:any
  cartlen: any = 0
  products: any
  categories: any
  iniproduct: any
  productcart: any = []
  addcartactive: boolean = false
  quantity: number = 0
  ids = new Set()
  cart: any
  finalcart = new Set()
  id: any
  total:number=0
  constructor(private ConnectService: ConnectService){}
  ngOnInit() {
      this.ConnectService.currentData.subscribe(data => this.cartlen = data.cartlen)
      this.ConnectService.currentData.subscribe(data => this.finalcart = data.fincart)
      this.ConnectService.currentData.subscribe(data => this.ids = data.ids)
      this.ConnectService.currentData.subscribe(data => this.productcart = data.cartproduct)
      this.productcart.forEach((cart:any)=>{
        console.log(cart)
        this.total += (cart.quantity*cart.product.price)
      })
      this.ConnectService.setTotal(this.total)
  }
  AddToCartMinus(item: any) {
    let cart2:any
    this.finalcart.forEach((cart: any) => {
      if (cart.product.id === item.product.id) {
        cart2 = cart
      }
    })
    cart2.quantity--
    if(cart2.quantity<0){
      cart2.quantity=0
    }
    if (this.cartlen === 0) {
      this.ids.clear()
    }
    if (cart2.quantity === 0 && cart2.product.id===item.product.id) {
      this.ids.delete(item.product.id)
      this.productcart.forEach((prod:any,index:any)=>{
        if(prod.product.id===item.product.id){
          this.productcart.splice(index,1)
        }
      })
      this.ConnectService.setCartLen(this.cartlen - 1)
      this.ConnectService.setProductCart(this.productcart)
      this.ConnectService.setFinCart(this.finalcart)
      this.ConnectService.setIds(this.ids)
    }
    else {
      if (this.finalcart.has(cart2)) {
        this.ConnectService.setCartLen(this.cartlen - 1)
        this.ConnectService.setProductCart(this.productcart)
        this.ConnectService.setFinCart(this.finalcart)
        this.ConnectService.setIds(this.ids)
      }
    }
    this.total=0
    this.productcart.forEach((cart:any)=>{
      this.total += (cart.quantity*cart.product.price)
    })
    this.ConnectService.setTotal(this.total)
  }
  AddToCartPlus(item: any) {
    let cart2:any
    this.finalcart.forEach((cart: any) => {
      if (cart.product.id === item.product.id) {
        cart2 = cart
      }
    })
    cart2.quantity++
    if (!this.ids.has(item.product.id)) {
      this.productcart.push(cart2)
      this.ConnectService.setCartLen(this.cartlen + 1)
      this.ConnectService.setProductCart(this.productcart)
      this.ConnectService.setFinCart(this.finalcart)
      this.ConnectService.setIds(this.ids)
    }
    else {
      this.ConnectService.setCartLen(this.cartlen + 1)
      this.ConnectService.setProductCart(this.productcart)
      this.ConnectService.setFinCart(this.finalcart)
      this.ConnectService.setIds(this.ids)
    }
    this.total=0
    this.productcart.forEach((cart:any)=>{
      this.total += (cart.quantity*cart.product.price)
    })
    this.ConnectService.setTotal(this.total)
  }
}
