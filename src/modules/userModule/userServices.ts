import e from "express";
import { createUser, viewAllUser, viewUser, viewUserById } from "./userRepository";

export const CreateUser = async (email : String, password : String, name : String) => {
    console.log('Creating user...')
    const user = {email : email,
        password: password,
        role: 'User',
        name : name,
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

export const ViewUserById = async (id : String) => {
    const user = viewUserById(id)
    return user
}