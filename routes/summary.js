const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
    //json으로 송출
    const conn = res.locals.conn;
    const limit = req.query['limit'];
    const fields = req.query['fields'];
    const query = `SELECT ${fields} FROM summary_status ORDER BY date DESC LIMIT ${limit}`;
    try {
        conn.beginTransaction();
        const [row,field] = await conn.query(query);
        conn.commit();
        conn.release();
        res.json(row);
    }
    catch(err) {
        conn.release();
        next(err);
    }
});

module.exports = router;
