const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/recordsController');

router.get('/', ctrl.getAllRecords);
router.get('/:id', ctrl.getRecord);
router.post('/', ctrl.createRecord);
router.put('/:id', ctrl.updateRecord);
router.delete('/:id', ctrl.deleteRecord);

module.exports = router;
