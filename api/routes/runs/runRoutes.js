'use strict';

const express = require('express');
const router = express.Router();
const runService = require('./runService');
const requireAuth = require('../../middleware/auth');

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
  .get(requireAuth, async (req, res, next) => {
    try {
      const allRuns = await runService.listRuns();
      res.status(200).send({
        data: allRuns
      });
    } catch (e) {
      next(e);
    }
  });

router.route('/:id')
  .get(requireAuth, async (req, res, next) => {
    try {
      const run = await runServices.getRunById(req.params.id);
      res.status(200).send({
        data: run
      });
    } catch (e) {
      next(e);
    }
  });

exports.router = router;