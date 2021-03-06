const express = require('express');
const router = express.Router();

const productsFunctions = require('../services/products-functions');


module.exports = (db) => {
  //Browse
  router.get("/", async(req, res) => {
    let priceMin = req.query.priceMin;
    let priceMax = req.query.priceMax;
    const filteredProducts = await productsFunctions.getFilterProducts(db, priceMin, priceMax);
    res.json({ products: filteredProducts });
    //   let queryString = `SELECT * FROM products WHERE sold = false AND available = true`;

    //   let minPrice = req.query.minPrice;
    //   let maxPrice = req.query.maxPrice;
    //   const queryParams = [];


    //   if (minPrice) {
    //     queryParams.push(`${minPrice}`);
    //     queryString += ` AND products.price >= $${queryParams.length} `;
    //   }
    //   if (maxPrice) {
    //     queryParams.push(`${maxPrice}`);
    //     queryString += ` AND price <= $${queryParams.length} `;
    //   }
    //   queryParams.push(20);
    //   queryString += `
    // ORDER BY price
    // LIMIT $${queryParams.length};
    // `;
    //   console.log(queryString, queryParams);

    //   /*const results = await */ db
    //     .query(queryString, queryParams)
    //     .then((result) => { //don't need a .then
    //       let products = result.rows;
    //       res.json({ products });
    //       //return results.rows
    //     })
    //     .catch((err) => {
    //       res
    //         .status(500)
    //         .json({ error: err.message });
    //     });

  });

  //Read
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    let query = `SELECT * FROM products WHERE id = ${id}`; //line 54 to 65, take in arguments db and id
    console.log(query);
    db.query(query)
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  //Add

  router.post("/new", (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrlOne = req.body.image_url_one;
    //let available = req.body.available;
    //let sold = req.body.sold;
    console.log(req.body);

    const available = true;
    const sold = false;
    const values = [`${name}`, `${price}`, `${productsFunctions.getAppCookies(req)['user_id']}`, `${description}`,  `${imageUrlOne}`, `${available}`, `${sold}`];
    const queryString = `INSERT INTO products (name, price, seller_id, description, image_url_one, available, sold)
    VALUES($1, $2, $3, $4, $5, $6, $7)  RETURNING *;`;
    // console.log("asdfasdfasdfasdfasfd")
    db
      .query(queryString, values)
      .then((result) => {
        res.redirect('/');

        console.log('add product', result.rows[0]);
        return result;
      })
      .catch((err) => {
        console.log(err.message);
      });

  });

  //Edit
  router.post("/:id", (req, res) => {
    const values = [req.params.id, req.body.sold];
    const query = `
    UPDATE products
    SET sold = $2
    WHERE products.id = $1 RETURNING *;
    `;

    db.query(query, values)
      .then(data => {
        const products = data.rows;
        // console.log(data.rows[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });





  //Delete
  router.post("/:id/delete", (req, res) => {
    const id = req.params.id;

    const values = [`${id}`];
    const queryString = `
    UPDATE products
    SET available  = false
    WHERE products.id = $1  RETURNING *;`;
    db
      .query(queryString, values)
      .then((result) => {
        res.redirect('/');
        console.log(result.rows[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });

  });
  return router;
};

