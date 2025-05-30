import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    whatsapp: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      
      if (response.ok) {
        const user = await response.json();
        onAuthSuccess(user);
        onClose();
      } else {
        alert('Email ou senha incorretos');
      }
    } catch (error) {
      alert('Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.whatsapp.match(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)) {
      alert('WhatsApp deve estar no formato (11) 99999-9999');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });
      
      if (response.ok) {
        const user = await response.json();
        onAuthSuccess(user);
        onClose();
        alert('Conta criada com sucesso! Você ganhou 10 créditos grátis!');
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao criar conta');
      }
    } catch (error) {
      alert('Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            Acesse sua conta
          </DialogTitle>
          <p className="text-center text-gray-600 text-sm">
            Faça login ou crie sua conta para desbloquear contatos
          </p>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Criar Conta</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  required
                  value={registerData.name}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="whatsapp">WhatsApp *</Label>
                <Input
                  id="whatsapp"
                  required
                  value={registerData.whatsapp}
                  onChange={(e) => setRegisterData(prev => ({ 
                    ...prev, 
                    whatsapp: formatWhatsApp(e.target.value) 
                  }))}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Obrigatório para receber notificações importantes
                </p>
              </div>
              
              <div>
                <Label htmlFor="register-password">Senha</Label>
                <Input
                  id="register-password"
                  type="password"
                  required
                  minLength={6}
                  value={registerData.password}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Criando conta...' : 'Criar conta grátis'}
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                ✨ Ganhe 10 créditos grátis ao criar sua conta
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}