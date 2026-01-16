import e from "express";
import { createAdmin, viewAllAdmin, viewAdmin } from "./adminRepository";

export const CreateAdmin = async (email : String, password : String) => {
    console.log('Creating admin...')
    const admin = {email : email,
        password: password,
        role: 'SuperAdmin',
        createdAt : Date.now()
    }
    const create = createAdmin(admin)
    return create
}

export const ViewAllAdmins = async () => {
    const admins = viewAllAdmin()
    return admins
}

export const ViewAdmin = async (email : String) => {
    const admin = viewAdmin(email)
    return admin
}