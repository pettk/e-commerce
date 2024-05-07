const db = require('../db');


module.exports = class User  {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;

    }

    async save() {
        try {
            const saveUser = await db.query('INSERT INTO users(username, password, email) VALUES($1, $2, $3', [this.username, this.password, this.email]);
            return saveUser.rows[0];
        } catch(err) {
            throw err;
        }
    }

    static async findById(id) {
        try {
            const findUser = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
            return findUser.rows[0];
        } catch (err) {
            throw err;
        }
    }

    static async findByUsername(username) {
        try {
            const findUser = await db.query('SELECT * FROM users WHERE username = $1', [username]);
            return findUser.rows[0];
        } catch (err) {
            throw err;
        }
    }

    async update(data) {
        const {id, username, password, email} = data;
        try {
            const updatedProduct = await db.query('UPDATE users SET username = $1, password = $2, email = $3 WHERE user_id = $4 RETURNING *',
                                            [username, password, email, id]);
            if(updatedProduct.rows.length === 0) {
                return null;
            }
            return updatedProduct.rows[0];
        } catch (err) {
            throw err;
        }
    }
}   
