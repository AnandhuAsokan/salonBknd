import CompanySettings from "../../models/companySettingsModel";

export const findCompanySettingsByName = async (nameAlias: string) => {
  return await CompanySettings.findOne({ nameAlias }).select('companyName');
};