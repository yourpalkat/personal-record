'use strict';

const express = require('express');
const router = express.Router();
const runService = require('./runService');

router.route('/new')
  .post(async (req, res, next) => {
    try {
      const run = await runService.createRun(req.body.data);
      res.status(201).json({
        data: [run]
      });
    } catch (e) {
      next(e);
    }
  });

router.route('/')
  .post(async (req, res, next) => {
    try {
      // Need to send currently logged in user's id to listRuns({ userId: $id }) or some such
      const allRuns = await runService.listRuns(req.body.data);
      res.status(201).json({
        data: [allRuns]
      });
    } catch (e) {
      next(e);
    }
  });

exports.router = router;