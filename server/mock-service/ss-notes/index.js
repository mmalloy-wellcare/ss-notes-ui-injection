'use strict';

const express = require('express');
const router = express.Router();

// mocks for notes API
router.use('/ss/notes', require('./api/notes'));
router.use('/ss/notes-collection', require('./api/notes'));

module.exports = router;