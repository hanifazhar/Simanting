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

app.post('/add-pasien', function (req, res) {
    const { nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp } = req.body;

    const queryStr = " INSERT INTO pasien ( nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp VALUES (?,?,?,?,?,?,?,?,?)) "
    conn.query(queryStr, [nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp], function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).json ({
                "success": false,
                "message": "gagal menyimpan data pasien",
                "data": err.message
            })
        }
        res.status(200).json ({
            "success": true,
            "message": "berhasil menambahkan data pasien",
            "data": results
        });
    })
})
