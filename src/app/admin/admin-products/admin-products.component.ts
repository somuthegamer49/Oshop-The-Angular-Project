import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {
  data:any ={
    id:"",
    category :"",
    imageUrl : "",
    price : 0 ,
    title :""
  }
  searchproducts:any
  products:any
  categories:any
  title:string=""
  price:Number=0
  category:String=""
  imageurl:String=""
  editMode:boolean = false

  constructor(private http: HttpClient, private router: Router){}
  ngOnInit() {
    this.http.get('http://localhost:3000/categories')
      .subscribe(
        response => {
          this.categories=response
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
      this.http.get('http://localhost:3000/products')
      .subscribe(
        response => {
          this.products=response
          this.searchproducts=response
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }
    getTitle($event: Event) {
      this.title = ($event.target as HTMLInputElement).value
      console.log(this.title)
    }
    getPrice($event: Event) {
      let p = ($event.target as HTMLInputElement).value
      this.price = Number(p)
      console.log(this.price)
    }
    getImage($event: Event) {
      this.imageurl= ($event.target as HTMLInputElement).value
      console.log(this.imageurl)
    }
    getCategory($event: Event) {
      this.category = ($event.target as HTMLInputElement).value
      console.log(this.category)
    }
    saveProds(){
      let data:any={
        category : this.category,
        imageUrl : this.imageurl,
        price : this.price,
        title : this.title
      }
      if(data.category!=="" && data.imageUrl!=="" && data.price>0 && data.title!==""){
        this.http.post('http://localhost:3000/products',data).subscribe(response=>{
          console.log(response)
        })
      }
      else{
        console.log('Cant Push')
      }
    }
    editProducts(id:any) {
      this.editMode=true
      this.data.id=id
    }
    cancelEdit() {
      this.data.id=""
      this.editMode=false
    }
    saveEditProds() {
      this.data.category=this.category
      this.data.imageUrl=this.imageurl
      this.data.price=this.price
      this.data.title=this.title
      if(this.data.category!=="" && this.data.imageUrl!=="" && this.data.price>0 && this.data.title!==""){
        this.http.put(`https://my-json-server.typicode.com/somuthegamer49/Oshop-The-Angular-Project/products/${this.data.id}`,this.data).subscribe(response=>{
          console.log(response)
          this.editMode = false
          this.router.navigate(['/admin/products'])
        })
      }
      else{
        console.log('Cant Push')
        console.log(this.data)
      }
    }
    deleteProducts(id:any){
      if(confirm('Are you sure that you want to delete the product')){
        this.http.delete(`https://my-json-server.typicode.com/somuthegamer49/Oshop-The-Angular-Project/products/${id}`).subscribe(response=>{
          console.log(response)
          this.router.navigate(['/admin/products'])
        })
      }
      else{
        console.log("Can't Delete")
      }
    }
    searchProducts($event:Event){
      let query = ($event.target as HTMLInputElement).value.toLowerCase()
      let response:any = []
      this.products.forEach((item:any)=>{
        if(query!=="" && (item.title.toLowerCase().includes(query) || query<=item.price || item.category.toLowerCase().includes(query))){
          response.push(item)
        }
      })
      if(query===""){
        this.products=this.searchproducts
      }
      else{
        this.products=response
      }
    }
}
