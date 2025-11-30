import { useState } from "react";
import { LoginData, RegisterData, User } from "../types/user.type";
import { useAuthContext } from "../context/AuthContext";

const URL = 'http://localhost:3000/auth';

export function useAuth() {
    const { setUser } = useAuthContext()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async(userData: RegisterData) => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(`${URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(userData)
            });

            if (!res.ok) {
                throw new Error("error en registro");
            }

            const data = await res.json();
            setUser(data.user);
            return true
        } catch (err) {
            setError("error al realizar registro");
            return false;
        } finally {
            setLoading(false);
        }
    }

    const login = async(credentials: LoginData) => {
        setLoading(true)
        setError(null);

        try {
            const res = await fetch(`${URL}/login`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(credentials)
            });

            if (!res.ok) {
                throw new Error("error en login")
            }

            const data = await res.json();
            setUser(data.user);
            return true;
        } catch (err) {
            setError("error al realizar login")
            return false
        } finally {
            setLoading(false);
        }
    };

    const logout = async() => {
        setLoading(true);

        try {
            await fetch(`${URL}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            setError("error al cerrar sesión")
        } finally {
            setUser(null)
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        register,
        login,
        logout
    }
}