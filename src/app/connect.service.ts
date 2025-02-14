import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  data: any = {
    username: "",
    password: "",
    isAdmin: false,
    cartlen: 0,
    cartproduct: [],
    addcartactive: false,
    fincart: new Set(),
    ids: new Set(),
    total: 0,
    email: ""
  }
  private dataSubject = new BehaviorSubject<any>(this.data); // Store data

  currentData = this.dataSubject.asObservable();
  setData(newData: any) {
    this.data.isAdmin = newData
    this.dataSubject.next(this.data);
  }
  setUsername(newData: String) {
    this.data.username = newData
    this.dataSubject.next(this.data);
  }
  setCartLen(newData: any) {
    this.data.cartlen = newData
    this.dataSubject.next(this.data)
  }
  setProductCart(newData: any) {
    this.data.cartproduct = newData
    this.dataSubject.next(this.data)
  }
  setAddtoCartactive(newData: any) {
    this.data.addcartactive = newData
    this.dataSubject.next(this.data)
  }
  setFinCart(newData: any) {
    this.data.fincart = newData
    this.dataSubject.next(this.data)
  }
  setIds(newData: any) {
    this.data.ids = newData
    this.dataSubject.next(this.data)
  }
  setTotal(newData: any) {
    this.data.total = newData
    this.dataSubject.next(this.data)
  }
  setEmail(newData: any) {
    this.data.email = newData
    this.dataSubject.next(this.data)
  }
}
