import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, View } from '@/types';

interface AuthContextType {
  user: User | null;
  currentView: View;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  setView: (view: View) => void;
  isAuthenticated: boolean;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  updateUser: (data: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'influencer' | 'brand';
  handle?: string;
  category?: string;
  companyName?: string;
  industry?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Función para generar hash simple de contraseña
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
};

// Validar email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar contraseña
const isValidPassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'La contraseña debe tener al menos una mayúscula' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'La contraseña debe tener al menos una minúscula' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'La contraseña debe tener al menos un número' };
  }
  return { valid: true, message: '' };
};

// Rate limit: máximo 5 intentos fallidos en 5 minutos
const RATE_LIMIT_KEY = 'influconnect_login_attempts';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutos

const getLoginAttempts = (): { count: number; firstAttempt: number } => {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return { count: 0, firstAttempt: 0 };
    return JSON.parse(raw);
  } catch {
    return { count: 0, firstAttempt: 0 };
  }
};

const recordFailedAttempt = (): void => {
  const data = getLoginAttempts();
  const now = Date.now();
  if (now - data.firstAttempt > LOCKOUT_MS) {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ count: 1, firstAttempt: now }));
  } else {
    const newCount = data.count + 1;
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ count: newCount, firstAttempt: data.firstAttempt }));
  }
};

const clearLoginAttempts = (): void => {
  localStorage.removeItem(RATE_LIMIT_KEY);
};

const isLoginBlocked = (): { blocked: boolean; message?: string } => {
  const data = getLoginAttempts();
  if (data.count < MAX_ATTEMPTS) return { blocked: false };
  const elapsed = Date.now() - data.firstAttempt;
  if (elapsed >= LOCKOUT_MS) {
    clearLoginAttempts();
    return { blocked: false };
  }
  const remainingMin = Math.ceil((LOCKOUT_MS - elapsed) / 60000);
  return {
    blocked: true,
    message: `Demasiados intentos fallidos. Por seguridad, espera ${remainingMin} minuto(s) antes de intentar de nuevo.`,
  };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('landing');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('influconnect_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Redirigir al home
        setCurrentView('home');
      } catch (e) {
        localStorage.removeItem('influconnect_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      return { success: false, message: 'El email es requerido' };
    }
    if (!isValidEmail(trimmedEmail)) {
      return { success: false, message: 'El email no es válido' };
    }
    if (!trimmedPassword) {
      return { success: false, message: 'La contraseña es requerida' };
    }

    const block = isLoginBlocked();
    if (block.blocked) {
      return { success: false, message: block.message };
    }

    const users = JSON.parse(localStorage.getItem('influconnect_users') || '[]');
    const foundUser = users.find((u: any) => u.email.toLowerCase() === trimmedEmail.toLowerCase());

    if (!foundUser) {
      recordFailedAttempt();
      return { success: false, message: 'Usuario no encontrado. Por favor regístrate primero.' };
    }

    if (foundUser.passwordHash !== hashPassword(trimmedPassword)) {
      recordFailedAttempt();
      return { success: false, message: 'Contraseña incorrecta. Verifica tus datos e intenta de nuevo.' };
    }

    clearLoginAttempts();

    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
      name: foundUser.name,
      avatar: foundUser.avatar,
    };

    localStorage.setItem('influconnect_user', JSON.stringify(userData));
    setUser(userData);
    setCurrentView('home');

    return { success: true };
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    // Validaciones
    if (!data.email.trim()) {
      return { success: false, message: 'El email es requerido' };
    }
    if (!isValidEmail(data.email)) {
      return { success: false, message: 'El email no es válido' };
    }
    if (!data.name.trim()) {
      return { success: false, message: 'El nombre es requerido' };
    }
    if (!data.password) {
      return { success: false, message: 'La contraseña es requerida' };
    }

    const passwordValidation = isValidPassword(data.password);
    if (!passwordValidation.valid) {
      return { success: false, message: passwordValidation.message };
    }

    // Validaciones específicas por rol
    if (data.role === 'influencer') {
      if (!data.handle?.trim()) {
        return { success: false, message: 'El usuario de Instagram es requerido' };
      }
      if (!data.category?.trim()) {
        return { success: false, message: 'La categoría es requerida' };
      }
    } else if (data.role === 'brand') {
      if (!data.companyName?.trim()) {
        return { success: false, message: 'El nombre de la empresa es requerido' };
      }
      if (!data.industry?.trim()) {
        return { success: false, message: 'La industria es requerida' };
      }
    }

    // Verificar si el email ya existe
    const users = JSON.parse(localStorage.getItem('influconnect_users') || '[]');
    if (users.some((u: any) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, message: 'Este email ya está registrado' };
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      email: data.email.toLowerCase(),
      passwordHash: hashPassword(data.password),
      name: data.name,
      role: data.role,
      avatar: data.role === 'influencer' 
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=D4AF37&color=000`
        : undefined,
      handle: data.handle,
      category: data.category,
      companyName: data.companyName,
      industry: data.industry,
      createdAt: new Date().toISOString(),
    };

    // Guardar usuario
    users.push(newUser);
    localStorage.setItem('influconnect_users', JSON.stringify(users));

    return { success: true, message: 'Registro exitoso. Ahora puedes iniciar sesión.' };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('influconnect_user');
    setUser(null);
    setCurrentView('landing');
  }, []);

  const setView = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('influconnect_user', JSON.stringify(updatedUser));
      
      // Actualizar también en la lista de usuarios
      const users = JSON.parse(localStorage.getItem('influconnect_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data };
        localStorage.setItem('influconnect_users', JSON.stringify(users));
      }
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      currentView,
      login,
      logout,
      setView,
      isAuthenticated: !!user,
      register,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
