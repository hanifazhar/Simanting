const express = require('express');
const conn = require('./config/db.js');

const app = express();

app.listen(3000, () => {
    console.log("Server berjalan di port 3000")
});

app.get('/get-data-pasien', function(req, res) {
     const queryStr = "SELECT * FROM pasien";
     conn.query(queryStr, function(err, results) {
        if (err) {
            console.log(err);
            return res.status(500).json ({
                "success": false,
                "message": "gagal menampilkan data pasien",
                "data": err.message
            })
        }
        res.status(200).json ({
            "success": true,
            "message": "berhasil menampilkan data pasien",
            "data": results
        });
    })
})
