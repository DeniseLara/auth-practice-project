export interface User {
    id: string
    email: string
    password: string
    name: string
    createdAt?: Date
}

export interface RegisterData {
    name: string
    email: string
    password: string
}

export interface LoginData {
    email: string
    password: string
}