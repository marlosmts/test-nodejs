const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const HealthCheck = require('./action/healthcheck');
const Product = require('./action/productActions');

/*Api*/

app.get('/health-check', async (req, res) => {
  res.json(await HealthCheck.do());
});

app.get('/product/:sku', async (req, res) => {
  try {
    res.json(await Product.getProductBySky(req.params.sku));
  } catch (error) {
    res.status(500).send({
      msgType: 'error',
      msg: 'Get product failed',
      error: error.message,
    });
  }
});

app.get('/product', async (req, res) => {
  res.status(500).send({
    msgType: 'error',
    msg: 'Please provide sku code',
  });
});

app.delete('/product/:sku', async (req, res) => {
  res.json({
    msgType: 'info',
    msg: await Product.deleteProductBySky(req.params.sku),
  });
});

app.delete('/product', async (req, res) => {
  res.status(500).send({
    msgType: 'error',
    msg: 'Please provide sku code',
  });
});

app.post('/product', async (req, res) => {
  try {
    res.json({
      msgType: 'info',
      msg: await Product.createProduct(req.body),
    });
  } catch (error) {
    res.status(500).send({
      msgType: 'error',
      msg: 'Created product failed',
      error: error.message,
    });
  }
});

app.put('/product/:sku', async (req, res) => {
  try {
    res.json({
      msgType: 'info',
      msg: await Product.updateProduct(req.params.sku, req.body),
    });
  } catch (error) {
    res.status(500).send({
      msgType: 'error',
      msg: 'Updated product failed',
      error: error.message,
    });
  }
});

app.put('/product', async (req, res) => {
  res.status(500).send({
    msgType: 'error',
    msg: 'Please provide sku code',
  });
});

/*Server Start*/
app.listen(3000, () => {
  console.log(`I'm listenting at http://localhost: 3000...`);
});
