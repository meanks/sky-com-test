import { Router } from 'express';
import {
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller';

const router = Router();

router.get('/', getUser);
router.post('/create-user', createUser);
router.patch('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export default router;
