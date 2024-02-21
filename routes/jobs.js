const express = require ('express');
const {getJobs,getJob} = require('../controllers/jobs');
const router = express.Router();

router.route('/').get(getJobs);
router.route('/:id').get(getJob);

module.exports = router;