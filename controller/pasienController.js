import connection from '../config/db.js';

export const getDataPasien = (req, res) => {
    const queryStr = "SELECT * FROM pasien";
     connection.query(queryStr, function(err, results) {
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
}

export const addPasien = (req, res) => {
    const { nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp } = req.body;

    const queryStr = ` INSERT INTO pasien ( nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp ) VALUES (?,?,?,?,?,?,?,?,?) `
    connection.query(queryStr, [nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp], function (err, results) {
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
}

export const getDataPasienById = (req, res) => {
    const pasienId = req.query.id;
    const queryStr = `SELECT * FROM pasien WHERE id = ?`;
    connection.query(queryStr, [pasienId], function(err, results) {
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
}

export const updatePasien = (req, res) => {
    const { nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp } = req.body;
    const pasienId = req.query.id;

    const queryStr = `UPDATE pasien SET nama=?, alamat=?, jenis_kelamin=?, berat_badan=?, tinggi_badan=?, golongan_darah=?, usia=?, tensi=?, no_hp=? WHERE id=?`;
    const values = [ nama, alamat, jenis_kelamin, berat_badan, tinggi_badan, golongan_darah, usia, tensi, no_hp, pasienId];
    connection.query(queryStr, values, function (err, results) {
        if (err) {
            console.log(err)
            return res.status(500).json ({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })
        }

        if(results.affectedRows > 0) {
            return res.status(200).json({
                "success": true,
                "message": "berhasil mengubah data pasien",
                "data": results
            })
        } else {
            return res.status(404).json({
                "success": false,
                "message": "Gagal mengubah data pasien",
                "data": null
            })
        }
    })
}

export const deletePasien = (req, res) => {
    const pasienId = req.body.id;
    const queryStr = `DELETE FROM pasien WHERE id = ?`
    connection.query(queryStr, [pasienId], function (err, results) {
        if (err) {
            console.log(err)
            return res.status(500).json ({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })
        }
        if (results.affectedRows > 0) {
            return res.status(200).json({
                "success": true,
                "message": "Pasien berhasil dihapus",
                "data": results
            })
        } else {
            return res.status(404).json ({ "message": "Pasien tidak ditemukan" })
        }
    })
}