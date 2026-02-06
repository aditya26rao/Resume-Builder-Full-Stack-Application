import expresss from 'express';
import protect from '../middlewares/authMiddleware';
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from '../controllers/resumeController.js';
import upload from '../configs/multer.js';

const resumeRouter = expresss.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update', upload.single('image'), protect, updateResume);
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById);
resumeRouter.get('/get/public/:resumeId', getPublicResumeById);

export default resumeRouter