import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { StoreService } from '../store.service'
import { Product } from '../product'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: Product

  constructor(private _service: StoreService, private _router: ActivatedRoute, private _router2: Router) {


   }

  ngOnInit() {
    this.product = new Product
  }
  post_product() {
    this._router.paramMap.switchMap( params => { //this is for bringing in params from a route
      return this._service.update_product(params.get('id'), this.product)
    })
    .subscribe(task => {
      this._router2.navigate(['/home']) //this is for going to another route 
      console.log(task)
    })
  }

}
