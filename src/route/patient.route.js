import express from 'express';
import { getPatients, createPatient } from "../controller/patient.controller.js";


const patientRoutes = express.Router();

patientRoutes.route('/')
    // .get((req, res) => res.send('xxx'));

.get(getPatients);
    // .post(createPatient());

// patientRoutes.route('/:id')
//     .get(getPatient())
//     .put
//     .delete

export default patientRoutes;