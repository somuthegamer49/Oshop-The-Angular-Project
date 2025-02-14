import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
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
  constructor(private http: HttpClient, private ConnectService: ConnectService, private router: Router) { }

  ngOnInit() {
    this.ConnectService.currentData.subscribe(data => this.cartlen = data.cartlen)
    this.ConnectService.currentData.subscribe(data => this.finalcart = data.fincart)
    this.ConnectService.currentData.subscribe(data => this.ids = data.ids)
    this.ConnectService.currentData.subscribe(data => this.productcart = data.cartproduct)

    this.http.get('https://my-json-server.typicode.com/somuthegamer49/Oshop-The-Angular-Project/products')
      .subscribe(response => {
        this.products = response
        this.iniproduct = response
      },
        error => {
          console.error('Error fetching data:', error);
        }
      )
    this.http.get('https://my-json-server.typicode.com/somuthegamer49/Oshop-The-Angular-Project/categories')
      .subscribe(response => {
        this.categories = response
      },
        error => {
          console.error('Error fetching data:', error);
        }
      )
  }
  getCategory(category: String) {
    let response: any = []
    this.iniproduct.forEach((item: { category: String; }) => {
      if (item.category.toLowerCase() === category.toLowerCase()) {
        response.push(item)
      }
    })
    this.products = response
  }
  resetCategory() {
    this.products = this.iniproduct
  }
  AddToCart(item: any) {
    this.quantity = 0
    this.quantity++
    this.ids.add(item.id)
    this.cart = {
      product: item,
      quantity: this.quantity,
    }
    this.finalcart.add(this.cart)
    this.productcart.push(this.cart)
    this.ConnectService.setCartLen(this.cartlen + 1)
    this.ConnectService.setProductCart(this.productcart)
    this.ConnectService.setFinCart(this.finalcart)
    this.ConnectService.setIds(this.ids)
  }
  AddToCartMinus(item: any) {
    this.finalcart.forEach((cart: any) => {
      if (cart.product.id === item.id) {
        this.cart = cart
      }
    })
    this.cart.quantity--
    if (this.cart.quantity < 0) {
      this.cart.quantity = 0
    }
    if (this.cartlen === 0) {
      this.ids.clear()
    }
    if (this.cart.quantity === 0 && this.cart.product.id === item.id) {
      this.ids.delete(item.id)
      this.productcart.forEach((prod: any, index: any) => {
        if (prod.product.id === item.id) {
          this.productcart.splice(index, 1)
        }
      })
      this.ConnectService.setCartLen(this.cartlen - 1)
      this.ConnectService.setProductCart(this.productcart)
      this.ConnectService.setFinCart(this.finalcart)
      this.ConnectService.setIds(this.ids)

    }
    else {
      if (this.finalcart.has(this.cart)) {
        this.ConnectService.setCartLen(this.cartlen - 1)
        this.ConnectService.setProductCart(this.productcart)
        this.ConnectService.setFinCart(this.finalcart)
        this.ConnectService.setIds(this.ids)

      }
    }
  }
  AddToCartPlus(item: any) {
    this.finalcart.forEach((cart: any) => {
      if (cart.product.id === item.id) {
        this.cart = cart
      }
    })
    this.cart.quantity++
    if (!this.ids.has(item.id)) {
      this.productcart.push(this.cart)
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
  }
}
