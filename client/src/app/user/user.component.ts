import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { Router } from '@angular/router'
import { StoreService } from '../store.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User
  error = {
    message: '',
    status: false
  }
  current_user = {
    email: '',
    password: ''
  }

  constructor(private service: StoreService, private router: Router) { }

  ngOnInit() {
    this.user = new User
  }
  sign_up() {
    this.service.create_user(this.user)
      .then(data => {
        if(data.status) {
          this.user = new User
          this.router.navigate(['/home'])
        } else {
          this.user = new User
          this.error.message = data.data
          this.error.status = true
        }

      })
      .catch(error => {console.log(error)})
  }
  log_in() {
    this.service.validate_user(this.current_user)
    .then(data => {
      if(data.status) {
        this.current_user = {
          email: '',
          password: ''
        }
        this.router.navigate(['/home'])
      } else {
        this.current_user = {
          email: '',
          password: ''
        }
        this.error.message = data.data
        this.error.status = true
      }
    })
    .catch(error => {console.log(error)})
  }

}
