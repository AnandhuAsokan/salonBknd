import e from "express";
import { createUser, viewAllUser, viewUser } from "./userRepository";

export const CreateUser = async (email : String, password : String) => {
    console.log('Creating user...')
    const user = {email : email,
        password: password,
        role: 'User',
        createdAt : Date.now()
    }
    const create = createUser(user)
    return create
}

export const ViewAllUsers = async () => {
    const users = viewAllUser()
    return users
}

export const ViewUser = async (email : String) => {
    const user = viewUser(email)
    return user
}