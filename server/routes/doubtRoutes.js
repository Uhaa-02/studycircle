const express = require('express');
const router = express.Router();
const { createDoubt, getDoubts, updateDoubt, deleteDoubt } = require('../controllers/doubtController');

router.post('/', createDoubt);
router.get('/', getDoubts);
router.put('/:id', updateDoubt);
router.delete('/:id', deleteDoubt);

module.exports = router;