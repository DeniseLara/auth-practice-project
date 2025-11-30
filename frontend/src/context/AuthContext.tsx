import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import type { User } from "../types/user.type";

const URL = 'http://localhost:3000/auth';

export interface AuthContextType {
    user: User | null
    setUser: (user: User | null) => void
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Al montar la app, preguntamos al backend si ya hay cookie válida
    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch(`${URL}/profile`, {
                    credentials: "include",   
                });

                if (!res.ok) {
                    setUser(null);
                } else {
                    const data = await res.json();
                    setUser(data.user); 
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
       throw new Error('useAuthContext debe usarse dentro de AuthProvider');
    }
    return context
}