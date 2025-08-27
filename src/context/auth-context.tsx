'use client';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthContextType, AuthState, AuthResponse } from '@/lib/types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    const router = useRouter();

    const apiCall = async (url: string, options: RequestInit = {}) => {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include',
            ...options,
        });

        return response.json();
    };

    const checkAuth = useCallback(async () => {
        try {
            setAuthState((prev: AuthState): AuthState => ({ ...prev, isLoading: true }));

            const data: AuthResponse = await apiCall('/api/auth/me');

            if (data.success && data.user) {
                setAuthState({
                    user: data.user,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } else {
                setAuthState({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data: AuthResponse = await apiCall('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            if (data.success && data.user) {
                setAuthState({
                    user: data.user,
                    isAuthenticated: true,
                    isLoading: false,
                });

                router.push('/reviews');

                return { success: true, message: data.message };
            } else {
                return {
                    success: false,
                    message: data.message || 'Login failed'
                };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'Network error. Please try again.'
            };
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            const data: AuthResponse = await apiCall('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
            });

            if (data.success) {
                const loginResult = await login(email, password);
                return loginResult;
            } else {
                return {
                    success: false,
                    message: data.message || 'Signup failed'
                };
            }
        } catch (error) {
            console.error('Signup error:', error);
            return {
                success: false,
                message: 'Network error. Please try again.'
            };
        }
    };

    const logout = async () => {
        try {
            await apiCall('/api/auth/logout', {
                method: 'POST',
            });

            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });

            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
            router.push('/login');
        }
    };

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const value: AuthContextType = {
        ...authState,
        login,
        signup,
        logout,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
