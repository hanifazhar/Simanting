import express from 'express';
import {
    getDataPasien,
    addPasien,
    getDataPasienById,
    updatePasien,
    deletePasien
} from '../controller/pasienController.js';

const router = express.Router();

router.get('/get-data-pasien', getDataPasien);
router.post('/add-pasien', addPasien);
router.get('/get-data-pasien/:id', getDataPasienById);
router.post('update-pasien', updatePasien);
router.post('delete-pasien',deletePasien);

export default router;