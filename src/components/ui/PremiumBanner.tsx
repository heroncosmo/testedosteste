import React from 'react';
import { X, Zap, ExternalLink, LogIn, UserPlus, Search, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PremiumBannerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  showLogin?: boolean;
  featureType?: 'search' | 'filter' | 'recommendation' | 'action' | 'navigation';
}

const PremiumBanner: React.FC<PremiumBannerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  showLogin = false,
  featureType = 'action'
}) => {
  if (!isOpen) return null;

  // Função para redirecionar para a página de preços
  const handleUpgrade = () => {
    window.location.href = "/pricing";
    onClose();
  };

  // Função para redirecionar para a página de login
  const handleLogin = () => {
    window.location.href = "/login";
    onClose();
  };

  // Função para redirecionar para a página de cadastro
  const handleSignup = () => {
    window.location.href = "/register";
    onClose();
  };

  // Determinar ícone e cores baseado no tipo de feature
  const getFeatureStyles = () => {
    switch (featureType) {
      case 'search':
        return {
          icon: <Search className="h-8 w-8 text-blue-600" />,
          gradient: 'from-blue-500 to-indigo-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800'
        };
      case 'filter':
        return {
          icon: <Filter className="h-8 w-8 text-purple-600" />,
          gradient: 'from-purple-500 to-indigo-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-800'
        };
      case 'recommendation':
        return {
          icon: <Star className="h-8 w-8 text-amber-600" />,
          gradient: 'from-amber-500 to-yellow-600',
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-800'
        };
      case 'navigation':
        return {
          icon: <Zap className="h-8 w-8 text-green-600" />,
          gradient: 'from-green-500 to-teal-600',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800'
        };
      default:
        return {
          icon: <Zap className="h-8 w-8 text-blue-600" />,
          gradient: 'from-blue-600 to-purple-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800'
        };
    }
  };

  const styles = getFeatureStyles();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center">
          <div className={`w-16 h-16 bg-gradient-to-r ${styles.gradient} rounded-full mx-auto flex items-center justify-center mb-4`}>
            {styles.icon || <Zap className="h-8 w-8 text-white" />}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">
            {description}
          </p>
          
          <div className={`${styles.bgColor} p-4 rounded-lg mb-6 text-left`}>
            <h4 className={`font-semibold ${styles.textColor} mb-2`}>
              {showLogin ? 'Por que criar uma conta?' : 'Por que assinar o plano Pro?'}
            </h4>
            <ul className={`text-sm ${styles.textColor} space-y-1`}>
              <li className="flex items-start">
                <span className="text-green-500 mr-1">✓</span> 
                <span>{showLogin ? 'Acesso a leads gratuitos todos os dias' : 'Acesso ilimitado a todos os leads'}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-1">✓</span> 
                <span>{showLogin ? 'Salve empresas favoritas' : 'Contatos desbloqueados ilimitados'}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-1">✓</span> 
                <span>{showLogin ? 'Pesquisa básica de empresas' : 'Filtros avançados e busca premium'}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-1">✓</span> 
                <span>{showLogin ? 'Comece grátis, sem cartão de crédito' : 'AutoPiloto e WhatsApp em massa'}</span>
              </li>
            </ul>
          </div>
          
          {showLogin ? (
            <div className="flex space-x-3">
              <Button 
                onClick={handleSignup}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Criar conta grátis
              </Button>
              <Button 
                onClick={handleLogin}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Button 
                onClick={handleUpgrade}
                className={`flex-1 bg-gradient-to-r ${styles.gradient} hover:opacity-90 text-white`}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Assinar agora
              </Button>
              <Button 
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Mais tarde
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumBanner; 