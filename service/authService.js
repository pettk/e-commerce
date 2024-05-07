const User = require("../models/user");
const UserInstance = new User();

module.exports = class AuthService {
    async register(data) {
        const { username } = data;
        try {
             const findUser = await UserInstance.findByUsername(username);
             if(findUser) {
                throw createError(409, 'Username already in use');
             } 
            
             UserInstance.save(data)
        } catch(err) {
            throw createError(500, err);
        }
    }

    async login(data) {
        const { username, password} = data;

        try {
            const findUser = await UserInstance.findByUsername(username);

            if(findUser.password !== password) {
                throw createError(401, 'Incorrect username or password');
            }
        } catch(err) {
            throw createError(500, err);
        }
    }
}