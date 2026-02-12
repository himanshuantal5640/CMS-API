import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getChatsByThread, sendChat } from '../controllers/chats.controller.js';

const router = express.Router();

router.get('/:threadId',authMiddleware,getChatsByThread);
router.post('/',authMiddleware,sendChat);

export default router;