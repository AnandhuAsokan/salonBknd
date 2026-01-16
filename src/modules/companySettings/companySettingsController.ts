import { Request, Response } from 'express';
import CompanySettings from '../../models/companySettingsModel';
import { findCompanySettingsByName } from './companySettingsRepository';
import { createNameAlias } from '../../utils/helper';

export const createCompanySettings = async (req: Request, res: Response) => {
  try {
    const { companyName, logoUrl, tagline, gstNumber, panNumber, contactDetails, address, defaultTaxRate, currency, bookingConfig, razorpay, workingHours, defaultPolicies, theme, isBranchSpecific, branch } = req.body;
    const nameAlias = createNameAlias(companyName);
    const existingCompanySettings = await findCompanySettingsByName(nameAlias);
    if (existingCompanySettings) {
        return res.status(400).json({ message: 'Company settings already exists' });
      }      
    const companySettings = await CompanySettings.create({ companyName, nameAlias, logoUrl, tagline, gstNumber, panNumber, contactDetails, address, defaultTaxRate, currency, bookingConfig, razorpay, workingHours, defaultPolicies, theme, isBranchSpecific, branch });
    res.status(201).json(companySettings);
  } catch (error : any) {
    res.status(500).json({ message: error.message });
  }
};