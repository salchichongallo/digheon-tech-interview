import bodyParser from 'body-parser';
import Express, { Router } from 'express';

import * as productController from './productController';

const app = Express();
const api = Router();

api.use(bodyParser.json());

api.route('/products')
  .get(productController.findAll)
  .post(productController.create);

api.route('/products/:name')
  .get(productController.find)
  .put(productController.update)
  .patch(productController.update)
  .delete(productController.deleteProduct);

app.use('/api', api);

const port = process.env.API_PORT || '5000';

app.listen(port, () => console.log(`API listening on port ${port}`));
