var store = require('../controllers/methods.js')
var path = require('path')

module.exports = function (app) {
  app.post('/create_user', store.create_user)
  app.post('/validate_user', store.validate_user)
  app.post('/create_product', store.create_product)
  app.get('/user_products', store.user_products)
  app.get('/all_products', store.all_products)
  app.get('/current_user', store.current_user)
  app.post('/update_product/:id', store.update_product)
  app.get('/delete_product/:id', store.delete)
  app.get('/find_user/:id', store.find_user)
  app.get('/log_out', store.log_out)

  app.all("*", (request, response) => {
    response.sendFile(path.resolve('./client/dist/index.html'))
  })
}
