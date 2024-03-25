import express from 'express';
import getGroups from '../controllers/groups.controller.js';

const router = express.Router();

//Routes
router.get('/groups', getGroups);

export default router;
