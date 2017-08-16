import { Component, OnInit } from '@angular/core';
import { Product } from '../product'
import { StoreService } from '../store.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  product: Product
  my_products = []
  user: string

  constructor(private _service: StoreService, private router: Router) { }

  ngOnInit() {
    this._service.current_user()
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        //THIS WILL redirect if you try and you arent logged in
        this.router.navigate(['/'])
      })
    this.product = new Product
    this._service.user_products()
      .then(data => {
        this.user = data.name
        for(let product of data.products) {
          this.my_products.push(product)
        }
      })
  }
  post_product() {
    this._service.create_product(this.product)
      .then(data => {
        if(data.status) {
          this.my_products.push(data.data)
        }
        this.product = new Product
      })
      .catch(error => console.log(error))

  }

}
