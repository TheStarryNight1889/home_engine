module.exports.default = {
    server: process.env.SERVER || 'localhost',
    port: process.env.PORT || 1883,
    username: process.env.USERNAME || 'admin',
    password: process.env.PASSWORD || 'admin',
};