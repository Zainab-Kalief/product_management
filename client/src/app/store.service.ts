import { Injectable } from '@angular/core';
import 'rxjs'
import { Http } from '@angular/http'
import { User } from './user'
import { Product } from './product'

@Injectable()
export class StoreService {

  constructor(private http: Http) { }

  create_user(user: User) {
    return this.http.post('/create_user', user)
      .map(data => data.json())
      .toPromise()
  }
  validate_user(user) {
    return this.http.post('/validate_user', user)
      .map(data => data.json())
      .toPromise()
  }
  create_product(product: Product) {
    return this.http.post('/create_product', product)
      .map(data => data.json())
      .toPromise()
  }
  all_products() {
    return this.http.get('/all_products')
      .map(data => data.json())
      .toPromise()
  }
  user_products() {
    return this.http.get('/user_products')
      .map(data => data.json())
      .toPromise()
  }
  current_user() {
    return this.http.get('/current_user')
      .map(data => data.json())
      .toPromise()
  }
  update_product(id, product) {
    return this.http.post(`/update_product/${id}`, product)
      .map(data => data.json())
      .toPromise()
  }
  delete_product(id) {
    return this.http.get(`/delete_product/${id}`)
      .map(data => data.json())
      .toPromise()
  }
  find_user(id) {
    return this.http.get(`/find_user/${id}`)
      .map(data => data.json())
      .toPromise()
  }
  log_out() {
    return this.http.get('/log_out')
  }

}
