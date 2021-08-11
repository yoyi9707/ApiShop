const express = require('express');
const router = express.Router();
const pkg = require('../../package.json');


const app = express();
app.set('pkg', pkg);

router.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
});

module.exports = router;