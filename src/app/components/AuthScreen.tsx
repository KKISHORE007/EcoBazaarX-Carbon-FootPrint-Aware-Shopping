import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User as UserIcon, Shield, Leaf, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { AppState, User } from '../App';

type AuthScreenProps = {
  appState: AppState;
  updateAppState: (newState: Partial<AppState>) => void;
  onLogin: (user: User) => void;
};

export default function AuthScreen({ appState, updateAppState, onLogin }: AuthScreenProps) {
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;

    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumber) strength++;
    if (hasSpecialChar) strength++;
    if (isLongEnough) strength++;

    if (strength <= 2) return { strength: 1, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { strength: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 4) return { strength: 3, label: 'Good', color: 'bg-blue-500' };
    return { strength: 4, label: 'Strong', color: 'bg-green-500' };
  };

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough;
  };

  const handleLogin = () => {
  if (!loginEmail || !loginPassword) {
    toast.error('Please fill in all fields');
    return;
  }

  const email = loginEmail.trim().toLowerCase();

  const savedState = localStorage.getItem('ecoBazaarState');
  const users: User[] = savedState ? JSON.parse(savedState).users : [];

  const user = users.find(u => u.email === email);

  if (!user) {
    toast.error('No account found with this email');
    return;
  }

  if (user.role !== userType) {
    toast.error(`Account is registered as ${user.role}`);
    return;
  }

  if (user.password !== loginPassword) {
    toast.error('Incorrect password');
    return;
  }

  toast.success(`Welcome back, ${user.name}`);
  onLogin(user);
};


  const handleRegister = () => {
  if (!regName || !regEmail || !regPhone || !regPassword || !regConfirmPassword) {
    toast.error('Please fill in all fields');
    return;
  }

  const email = regEmail.trim().toLowerCase();

  const savedState = localStorage.getItem('ecoBazaarState');
  const state = savedState ? JSON.parse(savedState) : { users: [] };

  const users: User[] = state.users || [];

  if (users.find(u => u.email === email)) {
    toast.error('This email is already registered');
    return;
  }

  const newUser: User = {
    id: Date.now().toString(),
    name: regName,
    email,
    phone: regPhone,
    role: userType,
    ecoPoints: 0,
    totalCO2: 0,
    ecoBadges: [],
    password: regPassword,
  };

  const updatedUsers = [...users, newUser];

  updateAppState({ users: updatedUsers });

  toast.success('Registration successful');
  onLogin(newUser);
};

  const passwordStrength = getPasswordStrength(regPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#A5D6A7] to-[#2E7D32] relative overflow-hidden flex items-center justify-center p-4">
      {/* CO2 Bubbles Background */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/15 rounded-full flex items-center justify-center"
            style={{
              width: Math.random() * 60 + 30,
              height: Math.random() * 60 + 30,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -1000],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <span className="text-white/50 text-xs">CO₂</span>
          </motion.div>
        ))}
      </div>

      {/* Floating Leaves */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <Leaf className="text-white/30 w-8 h-8" />
          </motion.div>
        ))}
      </div>

      {/* Auth Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="shadow-2xl border-2 border-white/50">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-[#2E7D32] to-[#69F0AE] p-4 rounded-full">
                <Leaf className="w-12 h-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-[#2E7D32] to-[#69F0AE] bg-clip-text text-transparent">
              EcoBazaar
            </CardTitle>
            <CardDescription>Shop Green, Live Clean</CardDescription>
          </CardHeader>

          <CardContent>
            {/* User Type Toggle */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={userType === 'user' ? 'default' : 'outline'}
                className={`flex-1 ${userType === 'user' ? 'bg-[#2E7D32]' : ''}`}
                onClick={() => setUserType('user')}
              >
                <UserIcon className="w-4 h-4 mr-2" />
                User
              </Button>
              <Button
                variant={userType === 'admin' ? 'default' : 'outline'}
                className={`flex-1 ${userType === 'admin' ? 'bg-[#2E7D32]' : ''}`}
                onClick={() => setUserType('admin')}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>

            <Tabs value={authTab} onValueChange={(v) => setAuthTab(v as 'login' | 'register')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              {/* LOGIN TAB */}
              <TabsContent value="login" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 pr-10"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    {loginEmail && (
                      <div className="absolute right-3 top-3">
                        {validateEmail(loginEmail) ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]"
                  onClick={handleLogin}
                >
                  Login as {userType}
                </Button>
              </TabsContent>

              {/* REGISTER TAB */}
              <TabsContent value="register" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="reg-name"
                      placeholder="John Doe"
                      className="pl-10 pr-10"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                    />
                    {regName && (
                      <div className="absolute right-3 top-3">
                        {regName.length >= 2 ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 pr-10"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                    />
                    {regEmail && (
                      <div className="absolute right-3 top-3">
                        {validateEmail(regEmail) ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="reg-phone"
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      className="pl-10 pr-10"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                    />
                    {regPhone && (
                      <div className="absolute right-3 top-3">
                        {validatePhone(regPhone) ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {regPassword && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded ${
                              level <= passwordStrength.strength
                                ? passwordStrength.color
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-xs font-medium ${
                        passwordStrength.strength >= 4 ? 'text-green-600' : 
                        passwordStrength.strength >= 3 ? 'text-blue-600' :
                        passwordStrength.strength >= 2 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        Password Strength: {passwordStrength.label}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="reg-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {regConfirmPassword && (
                    <div className="flex items-center gap-1 text-xs">
                      {regPassword === regConfirmPassword && regConfirmPassword.length > 0 ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-600 font-medium">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-red-600 font-medium">Passwords don't match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <Button
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]"
                  onClick={handleRegister}
                >
                  Register as {userType}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
