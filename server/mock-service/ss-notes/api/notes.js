const express = require('express');
const router = express.Router();
const mockLib = require('@nextgen/node-support').mock.service;

// TODO: Remove when cross application communication is implemented
// *This mock is temporary until we have application communication working

// get notes 
router.get('/', (req, res) => {
    mockLib.serveMock(req, res, 'ss-notes/notes/list.of.notes.json');
});

module.exports = router;
