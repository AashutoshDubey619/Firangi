const auth = require('./auth');
const authorization = require('./authorization');

module.exports = {
    ...auth,
    ...authorization
};
