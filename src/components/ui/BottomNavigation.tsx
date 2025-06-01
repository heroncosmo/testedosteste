import React, { useState } from 'react';
import { Home, MessageSquare, Star, BarChart, User, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
<<<<<<< HEAD
import PremiumBanner, { globalDiscountState } from './PremiumBanner';
=======
import PremiumBanner from './PremiumBanner';
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
import { useAuth } from '@/providers/AuthProvider';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  setActiveTab
}) => {
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState({
    title: '',
    description: '',
<<<<<<< HEAD
    featureType: 'navigation' as 'search' | 'filter' | 'recommendation' | 'action' | 'navigation',
    planType: 'plus' as 'plus' | 'pro' | 'ultra' // Add plan type to differentiate pricing
=======
    featureType: 'navigation' as 'search' | 'filter' | 'recommendation' | 'action' | 'navigation'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
  });
  const { user } = useAuth();

  const tabs = [
<<<<<<< HEAD
    { id: 'feed', label: 'Inicio', icon: Home, isPro: false, tooltip: 'Feed de empresas', route: '/' },
    { id: 'conversations', label: 'WhatsApp Ilimitado', icon: MessageSquare, hasNotification: true, isPro: true, tooltip: 'Envio ilimitado de mensagens (Premium)', route: '/conversations', planType: 'plus' },
    { id: 'whatsapp-auto', label: 'WhatsApp em Massa', icon: MessageSquare, isPro: true, tooltip: 'Automação de WhatsApp (Premium)', route: '/whatsapp-auto', planType: 'pro' },
    { id: 'auto-piloto', label: 'Funcionário IA', icon: BarChart, isPro: true, tooltip: 'Campanhas automatizadas (Premium)', route: '/auto-piloto', planType: 'ultra' },
=======
    { id: 'feed', label: 'Feed', icon: Home, isPro: false, tooltip: 'Feed de empresas', route: '/' },
    { id: 'conversations', label: 'Conversas', icon: MessageSquare, hasNotification: true, isPro: true, tooltip: 'Gerenciar conversas ativas (Premium)', route: '/conversations' },
    { id: 'whatsapp-auto', label: 'WhatsApp em Massa', icon: MessageSquare, isPro: true, tooltip: 'Automação de WhatsApp (Premium)', route: '/whatsapp-auto' },
    { id: 'auto-piloto', label: 'Funcionário IA', icon: BarChart, isPro: true, tooltip: 'Campanhas automatizadas (Premium)', route: '/auto-piloto' },
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
    { id: 'profile', label: 'Perfil', icon: User, isPro: false, tooltip: 'Gerenciar seu perfil', route: '/profile' }
  ];
  
  // Função para mostrar banner de upgrade ao clicar em recurso PRO
<<<<<<< HEAD
  const handleTabClick = (tab: string, isPro: boolean, route: string, planType: 'plus' | 'pro' | 'ultra' = 'plus') => {
=======
  const handleTabClick = (tab: string, isPro: boolean, route: string) => {
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
    if (isPro) {
      // Configurar mensagem premium com base no recurso
      switch(tab) {
        case 'conversations':
          setPremiumFeature({
            title: "Gerenciador de Conversas",
            description: "Organize e acompanhe todas as suas conversas com leads em um só lugar. Nunca mais perca um lead importante!",
<<<<<<< HEAD
            featureType: 'navigation',
            planType: 'plus'
=======
            featureType: 'navigation'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
          });
          break;
        case 'whatsapp-auto':
          setPremiumFeature({
            title: "WhatsApp Automático",
            description: "Economize horas enviando mensagens personalizadas em massa para centenas de leads. Aumente suas chances de venda em até 5x com automação inteligente!",
<<<<<<< HEAD
            featureType: 'navigation',
            planType: 'pro'
=======
            featureType: 'navigation'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
          });
          break;
        case 'auto-piloto':
          setPremiumFeature({
            title: "Auto Piloto - IA para Vendas",
            description: "Deixe nossa IA encontrar leads qualificados e enviar mensagens automaticamente enquanto você foca no fechamento. Imagine acordar toda manhã com novas conversas iniciadas sem qualquer esforço!",
<<<<<<< HEAD
            featureType: 'navigation',
            planType: 'ultra'
=======
            featureType: 'navigation'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
          });
          break;
        default:
          setPremiumFeature({
            title: "Recurso Premium",
            description: "Desbloqueie todos os recursos premium para maximizar suas conversões e potencializar seu negócio.",
<<<<<<< HEAD
            featureType: 'navigation',
            planType
=======
            featureType: 'navigation'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
          });
      }
      
      setShowPremiumBanner(true);
<<<<<<< HEAD
      
      // Activate global discount countdown
      globalDiscountState.isTimerActive = true;
      
=======
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      return;
    }
    
    setActiveTab(tab);
    // Redirecionar para a rota apropriada
    if (window.location.pathname !== route) {
      window.location.href = route;
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 pt-1 pb-1 z-50 shadow-sm">
        <div className="flex justify-around max-w-lg mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
              <TooltipProvider key={tab.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
            <button
              className="flex flex-col items-center justify-center relative"
<<<<<<< HEAD
                        onClick={() => handleTabClick(tab.id, tab.isPro, tab.route, tab.planType as 'plus' | 'pro' | 'ultra')}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-500' : tab.isPro ? 'text-gray-300' : 'text-gray-400'}`} />
                {tab.hasNotification && (
                  <span className="absolute -top-1 -right-1 bg-gray-400 w-1.5 h-1.5 rounded-full"></span>
                )}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'text-blue-500' : tab.isPro ? 'text-gray-300' : 'text-gray-500'}`}>
                {tab.label}
              </span>
              {tab.isPro && (
                <div className={`absolute -top-1 -right-2 rounded-sm px-1 shadow-sm ${
                  tab.planType === 'plus' ? 'bg-gray-500' : 
                  tab.planType === 'pro' ? 'bg-blue-500' : 
                  'bg-purple-500'
                }`}>
                  <span className="text-[8px] font-bold text-white">
                    {tab.planType === 'plus' ? 'PLUS' : 
                     tab.planType === 'pro' ? 'PRO' : 
                     'ULTRA'}
                  </span>
                </div>
              )}
              {isActive && <div className="w-1 h-1 bg-blue-500 rounded-full mt-0.5"></div>}
=======
                        onClick={() => handleTabClick(tab.id, tab.isPro, tab.route)}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'text-green-500' : tab.isPro ? 'text-gray-300' : 'text-gray-400'}`} />
                {tab.hasNotification && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 w-1.5 h-1.5 rounded-full"></span>
                )}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'text-green-500' : tab.isPro ? 'text-gray-300' : 'text-gray-500'}`}>
                {tab.label}
              </span>
              {tab.isPro && (
                <div className="absolute -top-1 -right-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-sm px-1 shadow-sm">
                  <span className="text-[8px] font-bold text-white">PRO</span>
                </div>
              )}
              {isActive && <div className="w-1 h-1 bg-green-500 rounded-full mt-0.5"></div>}
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
            </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-xs">{tab.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
          );
        })}
      </div>
    </div>
      
      {/* Premium Banner */}
      <PremiumBanner 
        isOpen={showPremiumBanner}
        onClose={() => setShowPremiumBanner(false)}
        title={premiumFeature.title}
        description={premiumFeature.description}
        showLogin={!user}
        featureType={premiumFeature.featureType}
<<<<<<< HEAD
        planType={premiumFeature.planType} // Pass the plan type to the banner
=======
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      />
    </>
  );
};

export default BottomNavigation; 