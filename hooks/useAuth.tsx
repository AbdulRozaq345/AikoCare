'use client';

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import type { AxiosError } from 'axios';
import api from '@/lib/axios';
import Cookies from 'js-cookie';

type AuthUser = Record<string, unknown> | null;
type ValidationErrors = Partial<Record<string, string[]>>;

type LoginPayload = {
    email: string;
    password: string;
    setErrors: (errors: ValidationErrors) => void;
    redirectTo?: string;
};

type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    setErrors: (errors: ValidationErrors) => void;
    redirectTo?: string;
};

type AuthContextValue = {
    user: AuthUser;
    fetchUser: () => Promise<void>;
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser>(null);

    const fetchUser = useCallback(async () => {
        try {
            const res = await api.get('/api/user');
            setUser(res.data ?? null);
        } catch {
            setUser(null);
        }
    }, []);

    const login = useCallback(
        async ({ email, password, setErrors, redirectTo = '/' }: LoginPayload) => {
            setErrors({});
            try {
                await api.get('/sanctum/csrf-cookie');
                await api.post('/login', { email, password });
                await fetchUser();
                router.push(redirectTo);
            } catch (error) {
                const axiosError = error as AxiosError<{ errors?: ValidationErrors }>;
                if (axiosError.response?.status === 422 && axiosError.response.data?.errors) {
                    setErrors(axiosError.response.data.errors);
                } else {
                    setErrors({ general: ['Login gagal.'] });
                }
            }
        },
        [fetchUser, router],
    );

    const register = useCallback(
        async ({
            name,
            email,
            password,
            password_confirmation,
            setErrors,
            redirectTo = '/',
        }: RegisterPayload) => {
            setErrors({});
            try {
                await api.get('/sanctum/csrf-cookie');
                await api.post('/register', { name, email, password, password_confirmation });
                await fetchUser();
                router.push(redirectTo);
            } catch (error) {
                const axiosError = error as AxiosError<{ errors?: ValidationErrors }>;
                if (axiosError.response?.status === 422 && axiosError.response.data?.errors) {
                    setErrors(axiosError.response.data.errors);
                } else {
                    setErrors({ general: ['Registrasi gagal.'] });
                }
            }
        },
        [fetchUser, router],
    );

    const logout = useCallback(async () => {
        try {
            await api.get('/sanctum/csrf-cookie');
            const rawXsrf = Cookies.get('XSRF-TOKEN');
            const decodedXsrf = rawXsrf ? decodeURIComponent(rawXsrf) : undefined;

            await api.post(
                '/logout',
                undefined,
                decodedXsrf
                    ? {
                          headers: {
                              'X-XSRF-TOKEN': decodedXsrf,
                          },
                      }
                    : undefined,
            );
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            setUser(null);
            router.replace('/');
        }
    }, [router]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <AuthContext.Provider value={{ user, fetchUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};