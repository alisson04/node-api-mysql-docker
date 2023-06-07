import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/patient.query.js';

const HttpStatus = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
}

export const getPatients = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, fetching patients`);
    // res.status(HttpStatus.NOT_FOUND.code)
    //     .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Not ex1111111ists'))


    database.query(QUERY.SELECT_PATIENTS, (error, results) => {
       if (! results) {
           res.status(HttpStatus.OK.code)
               .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No patients founded'));
       } else {
           res.status(HttpStatus.NO_CONTENT.code)
               .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, 'No patients founded'))
       }
    });


    // res.send('ddd');
   // res.status(HttpStatus.OK.code)
   //     .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No patients founded'))
};

// });
// {
    // logger.info(`${req.method} ${req.originalUrl}, fetching patients`);
    // database.query(QUERY.SELECT_PATIENTS, (error, results) => {
    //    if (! results) {
    //        res.status(HttpStatus.OK.code)
    //            .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No patients founded'));
    //    } else {
    //        res.status(HttpStatus.NO_CONTENT.code)
    //            .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status, 'No patients founded'))
    //    }
    // });
// }

export const createPatient = (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, creating patient`);
    database.query(QUERY.CREATE_PATIENT, Object.values(req.body), (error, results) => {
       if (! results) {
           res.status(HttpStatus.NO_CONTENT.code)
               .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status))
       } else {
           const patient = { id: results.insertedId, ...req.body, created_at: new Date() };
           res.status(HttpStatus.CREATED.code)
               .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Patient created`,
                   { patient}));
       }
    });
}

export default HttpStatus;