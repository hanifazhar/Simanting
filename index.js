const express = require('express');
const conn = require('./config/db.js');

const app = express();

app.use(express.json());

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

    const queryStr = ` INSERT INTO pasien ( nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp ) VALUES (?,?,?,?,?,?,?,?,?) `
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

app.get('/get-data-pasien-by-id', function(req, res) {
    const pasienId = req.query.id;
    const queryStr = `SELECT * FROM pasien WHERE id = ?`;
    conn.query(queryStr, [pasienId], function(err, results) {
       if (err) {
        return res.status(500).json({ message: 'Gagal Menampilkan Data Pasien' });
       }
       if (results.length === 0) {
        return res.status(404).json({ message: 'Pasien tidak ditemukan' });
       }
       res.status(200).json ({
           "success": true,
           "message": "Berhasil menampilkan data pasien",
           "data": results
       });
   })
})

app.post('/update-pasien', function (req, res) {
    const { nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp } = req.body;
    const pasienId = req.query.id;

    if(!nama || !alamat || !jenis_kelamin || !berat_badan || !tinggi_badan || !golongan_darah || !usia || !tensi || !no_hp) {
        return res.status(400).json({ message: "Data Tidak Boleh Kosong"});
    }

    const queryStr = `SELECT nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp FROM pasien WHERE id = ?`;
    conn.query(queryStr, [nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp], function (err, results) {
        if (err) {
            console.log(err)
            return res.status(500).json ({
                "success": false,
                "message": "gagal mengubah data pasien",
                "data": err.message
            })
        }
        return res.status(200).json({
            "success": true,
            "message": "berhasil mengubah data pasien",
            "data": results
        })
    })
})
