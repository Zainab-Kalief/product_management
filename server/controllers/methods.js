var mongoose = require('mongoose')
var User = mongoose.model('User')
var Product = mongoose.model('Product')

module.exports = {
  create_user: (request, response) => {
    User.findOne({email: request.body.email})
      .then(data => {
            if(data) {
              response.json({data: 'Email is taken', status: false})
            } else {
              user = new User({name: request.body.name, email: request.body.email, password: request.body.password})
              user.save()
                .then(data => {
                  request.session.id = data._id
                  response.json({data: data, status: true})
                })
                .catch(error => {
                  response.json({data: error, status: false})
                })
            }
       })
  },
  validate_user: (request, response) => {
    User.findOne({email: request.body.email})
      .then(data => {
        if(data) {
          if(request.body.password == data.password) {
            request.session.user_id = data._id
            response.json({data: data, status: true})
          } else {
            response.json({data: 'Invalid Password', status: false})
          }
        } else {
          response.json({data: 'User doesnt exist', status: false})
        }
      })
  },
  create_product: (request, response) => {
    User.findOne({_id: request.session.user_id})
      .then(user => {
        if(user) {
         var product = new Product({title: request.body.title, price: request.body.price, _user: user._id})
          product.save()
            .then(data => {
              user.products.push(data)
              user.save()
                .then(saved => {
                  response.json({data: data, status: true})
                })
                .catch(error => response.json({data: error, status: false}))
            })
            .catch(error => response.json({data: error, status: false}))
        } else {
          response.json({data: 'Cant find user', status: false})
        }
      })
      .catch(error => console.log(error, ':('))
  },
  user_products: (request, response) => {
    User.findOne({_id: request.session.user_id})
      .populate('products')
      .exec()
      .then(data =>  { response.json(data)  })
  },
  all_products: (request, response) => {
    User.find()
    .populate('products')
    .exec()
    .then(data => { response.json(data) })
  },
  current_user: (request, response) => {
    if(request.session.user_id) {
      response.json(request.session.user_id)
    } else {
      response.status(500).json(false)
    }

  },
  update_product: (request, response) => {
    Product.update({_id: request.params.id}, {$set: {title: request.body.title, price: request.body.price}})
      .then(data => {
        findOne({_id: request.params.id})
          .then(data => console.log(data))

        response.json(data)
      })
      .catch(error => response.json(error))
  },
  delete: (request, response) => {
    Product.remove({_id: request.params.id})
    .then(data => {  response.json(true) })
    .catch(error => {  response.json(false) })

  },
  find_user: (request, response) => {
    User.findOne({_id: request.params.id})
      .populate('products')
      .exec()
      .then(data =>  { response.json(data)  })
  },
  log_out: (request, response) => {
    request.session.destroy()
    response.redirect('/')
  }

}
