import { Chat } from '@controllers';
import { Router } from 'express';

const router = Router();

/**
 * Use RESTful routes only
 * @see https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
 */
router.post('/admin/chat/chat-rag', Chat.chatRag);

export default router;
