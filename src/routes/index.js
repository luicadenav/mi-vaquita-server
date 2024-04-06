import express from 'express';
import groupsControllers from '../controllers/groups.controller.js';

const router = express.Router();

//Routes
router.get('/groups', groupsControllers.getGroups);
router.post('/create', groupsControllers.createGroup);

export default router;
