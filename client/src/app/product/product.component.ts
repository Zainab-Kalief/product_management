import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { StoreService } from '../store.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product_id = ''
  all_products = ''
  user = ''
  email = ''
  constructor(private _service: StoreService, private _router: ActivatedRoute, private _router2: Router) { }

  ngOnInit() {
    this._router.paramMap.switchMap( params => {
      this.product_id = params.get('product_id')
      return this._service.find_user(params.get('user_id'))
    })
    .subscribe( data => {
      this.all_products = data.products
      this.user = data.name
      this.email = data.email
    })
  }

}
