import userModel from "../../models/userModel";

export const createUser = async (user: any) => {
  const newUser = await userModel.create(user);
  console.log ('new user registered...', user)
  return newUser;
};

export const viewUser = async (email : any) =>{
    const user = userModel.findOne(email);
    return user;
}

export const viewAllUser = async()=>{
    const users = userModel.find();
    return users;
}

export const isEmailExist = async (email: string) => {
  const user = await userModel.findOne({ email });
  if(user) return true;
  return false;
}