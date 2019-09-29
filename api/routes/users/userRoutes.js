'use strict';

const express = require('express');
const router = express.Router();
const userService = require('./userService');
const tokenService = require('../../utils/tokenService');

router.route('/signup')
  .post(async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body.data);
      res.status(201).json({
        data: [user]
      });
    } catch (e) {
      next(e);
    }
  });

router.route('/login')
  .post(async (req, res, next) => {
    try {
      const user = await userService.isUser(req.body.data);
      if (user) {
        const token = await tokenService.issueToken(user);
        res.status(200).json({
          data: {
            token,
            user
          }
        })
      } else {
        res.status(401).send("Login failed: username or password was incorrect!");
      }
    } catch (e) {
      next(e);
    }
  });

exports.router = router;

// GET /users/
// router.route('/')
//   .get(async (req, res, next) => {
//     try {
//       // 1. Fetch all users from database
//       const users = await userService.listUsers();
//       // 2. Respond with list of users
//       res.status(200).send({
//         data: users,
//       });
//     } catch (e) {
//       // 3. If error, send to the error handler
//       next(e);
//     }
//   });

// POST /users/
// router.route('/')
//   .post(async (req, res, next) => {
//     // 1. Get data from request body
//     // Format of the request for this destructuring would look like:
//     /*
//       {
//         "bookData": {
//           "name": "Moby Dick",
//           "author": "Herman Melville",
//           "summary": "Really good book. It's about a lot of stuff"
//         }
//       }
//     */
//     // Play around with the destructuring if you would like the request to be sent in a different way
//     const { userData } = req.body;
//     try {
//       // 2. Create user from data
//       const user = await userService.createUser(userData);
//       // 3. Respond with created user
//       res.status(200).send({
//         data: [user],
//       });
//     } catch (e) {
//       // 4. If error, send to the error handler
//       next(e);
//     }
//   });