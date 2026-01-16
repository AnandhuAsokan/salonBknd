import { Router } from 'express';
import { createCompanySettings } from './companySettingsController';

const router = Router();

router.post('/create', createCompanySettings);

export default router;