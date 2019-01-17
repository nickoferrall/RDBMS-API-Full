const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const responseStatus = {
  success: 200,
  postCreated: 201,
  badRequest: 400,
  notFound: 404,
  serverError: 500
};

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(responseStatus.success).json(cohorts);
    })
    .catch(err => res.status(responseStatus.serverError).json(err));
});

router.post('/', async (req, res) => {
  try {
    const ids = await db('cohorts').insert(req.body);
    const cohortResponse = await db('cohorts').where({ id: ids[0] });
    res.status(responseStatus.postCreated).json(cohortResponse);
  } catch (error) {
    if (error.errno === 19) {
      res.status(responseStatus.badRequest).json({
        message: 'You must include a name that does not exist in the database.'
      });
    } else {
      res
        .status(responseStatus.serverError)
        .json({ message: 'Error adding cohort.' });
    }
  }
});

router.get('/:id', async (req, res) => {
  try {
    const animalId = await db('cohorts').where({ id: req.params.id });
    if (animalId.length === 0) {
      res.status(responseStatus.notFound).json({ message: 'ID not found.' });
    } else {
      res.status(responseStatus.success).json(animalId);
    }
  } catch (error) {
    res
      .status(responseStatus.badRequest)
      .json({ message: 'Unable to find cohort.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteAnimal = await db('cohorts')
      .where({ id: req.params.id })
      .del();
    if (!deleteAnimal) {
      res
        .status(responseStatus.badRequest)
        .json({ message: 'This ID does not exist in the database.' });
    } else {
      res.status(responseStatus.success).json(deleteAnimal);
    }
  } catch (error) {
    res
      .status(responseStatus.badRequest)
      .json({ errorMessage: 'Unable to delete that cohort.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const changes = req.body;
    const myUpdate = await db('cohorts')
      .where({ id: req.params.id })
      .update(changes);
    if (!myUpdate) {
      res
        .status(responseStatus.badRequest)
        .json({ message: 'This ID does not exist in the database.' });
    } else {
      res.status(responseStatus.success).json(myUpdate);
    }
  } catch (error) {
    res
      .status(responseStatus.badRequest)
      .json({ errorMessage: 'Unable to update that cohort.' });
  }
});

module.exports = router;
