import { Avatar } from '@controllers';
import { Router } from 'express';

const router = Router();

router.post('/admin/avatar/get-access-token', Avatar.getAccessToken);

export default router;
