const express = require('express');
const db = require('../db');
const itemsRouter = express.Router();
module.exports = itemsRouter;

itemsRouter.get('/', async (req, res) => {
    try {
        const fetchData = await db.query('SELECT product_id, name, description, price, quantity, created_at FROM products');
        const products = fetchData.rows;
        res.json(products);
    } catch(err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}); 

itemsRouter.post('/', async (req, res) => {
    try {
        const {name, description, price, quantity} = req.body;
        const newProduct = await db.query('INSERT INTO products(name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *', [name, description, price, quantity]); 
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }

});

itemsRouter.put('/:itemId', async (req, res) => {
    try {
        const {itemId} = req.params;
        const {name, description, price, quantity} = req.body;
        const updatedProduct = await db.query('UPDATE products SET name = $1, description = $2, price = $3, quantity = $4 WHERE product_id = $5 RETURNING *',
                                            [name, description, price, quantity, itemId]);
        if (updatedProduct.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(201).json(updatedProduct).rows[0];
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

itemsRouter.get('/:itemId', async (req, res) => {
    try {
        const {itemId} = req.params;
        const getProduct = await db.query('SELECT * FROM products WHERE product_id = $1',[itemId]);
        if (getProduct.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(getProduct.rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

itemsRouter.delete('/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;
        const deletedProduct = await db.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [itemId]);
        if (deletedProduct.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).send("Delete Success");
    } catch(err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});