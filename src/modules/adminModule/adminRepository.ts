import adminModel from "../../models/superAdminModel";

export const createAdmin = async (admin: any) => {
  const newAdmin = await adminModel.create(admin);
  console.log ('new admin registered...', admin)
  return newAdmin;
};

export const viewAdmin = async (email : any) =>{
    const admin = adminModel.findOne({email : email}).select('-password -salt');
    return admin;
}

export const viewAllAdmin = async()=>{
    const admins = adminModel.find().select("-password -salt");
    return admins;
}

export const isEmailExist = async (email: string) => {
  const admin = await adminModel.findOne({ email }).select("-password -salt");
  if(admin) return true;
  return false;
}