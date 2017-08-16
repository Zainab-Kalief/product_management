import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: Boolean
  all_products = []
  num = 4
  user_id = ''
  constructor(private _service: StoreService, private _router: Router) { }

  ngOnInit() {
    this._service.current_user()
      .then(data => {
        this.user_id = data
      })
      .catch(error => {
        //THIS WILL redirect if you try and you arent logged in
        this._router.navigate(['/'])
      })
    this.status = true
    this._service.all_products()
      .then(data => {
        for(let user of data) {
          for(let product of user.products) {
            this.all_products.push({user: user.name, user_id: user._id, title: product.title,
                                    price: product.price, product_id: product._id, time: new Date(product.createdAt)})
          }
        }

      })
  }
  delete(id, ind) {
    this._service.delete_product(id)
      .then(data => {
        if(data == true) {
          this.all_products.splice(ind, 1)
        }
      })
  }



}
