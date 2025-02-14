import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuardService } from './auth-guard.service';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard2Service } from './auth-guard2.service';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'shoppingcart', component: ShoppingCartComponent },
    { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard2Service] },
    { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService] },
    { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard2Service] },
    { path: 'ordersuccess', component: OrderSuccessComponent, canActivate: [AuthGuard2Service] },
    { path: 'products', component: ProductsComponent }
];
