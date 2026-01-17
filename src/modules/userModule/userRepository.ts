import userModel from "../../models/userModel";

export const createUser = async (user: any) => {
  const newUser = await userModel.create(user);
  console.log ('new user registered...', user)
  return newUser;
};

export const viewUser = async (email : any) =>{
    const user = userModel.findOne({email:email}).select("-password -salt");
    return user;
}

export const viewUserById = async (id : any) =>{
    const user = userModel.findById(id).select("-password -salt");
    return user;
}

export const viewAllUser = async()=>{
    const users = userModel.find().select("-password -salt");
    return users;
}

export const isEmailExist = async (email: string) => {
  const user = await userModel.findOne({ email });
  if(user) return true;
  return false;
}