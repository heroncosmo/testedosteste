import React, { useState } from 'react';
import { X, MessageSquare, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PremiumBanner from './PremiumBanner';
import { useAuth } from '@/providers/AuthProvider';

interface BulkSelectionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkMessage: () => void;
  onBulkFavorite: () => void;
}

const BulkSelectionBar: React.FC<BulkSelectionBarProps> = ({
  selectedCount,
  onClearSelection,
  onBulkMessage,
  onBulkFavorite
}) => {
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState({
    title: '',
    description: '',
    featureType: 'action' as 'search' | 'filter' | 'recommendation' | 'action' | 'navigation'
  });
  const { user } = useAuth();
  
  // Função para lidar com o clique no botão de mensagem em massa
  const handleBulkMessage = () => {
    // Mostrar banner premium
    setPremiumFeature({
      title: "WhatsApp em Massa & AutoPiloto",
      description: "Envie mensagens automáticas para múltiplos leads de uma só vez e configure envios automáticos com o AutoPiloto para aumentar suas conversões!",
      featureType: 'action'
    });
    setShowPremiumBanner(true);
  };
  
  // Função para lidar com o clique no botão de favoritos
  const handleBulkFavorite = () => {
    // Se não estiver logado, mostrar banner de login
    if (!user) {
      setPremiumFeature({
        title: "Marcar Leads como Favoritos",
        description: "Organize seus leads favoritos para acompanhamento rápido e eficiente. Crie uma conta para começar!",
        featureType: 'action'
      });
      setShowPremiumBanner(true);
      return;
    }
    
    // Chamar diretamente pois essa função não precisa ser Premium
    onBulkFavorite();
  };
  
  if (selectedCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-16 left-0 right-0 z-40 animate-slide-up">
        <div className="bg-green-600 shadow-lg mx-4 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
        <button
          onClick={onClearSelection}
              className="mr-2 text-green-200 hover:text-white"
              aria-label="Limpar seleção"
        >
              <X className="h-4 w-4" />
        </button>
            <span className="text-white text-sm font-medium">
              {selectedCount} {selectedCount === 1 ? 'empresa selecionada' : 'empresas selecionadas'}
            </span>
      </div>
          
      <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-green-700 hover:bg-green-800 text-white border-none flex items-center"
              onClick={handleBulkFavorite}
            >
              <Star className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Favoritar</span>
            </Button>
            
            <Button 
              size="sm"
              className="bg-white text-green-700 hover:bg-green-50 flex items-center"
              onClick={handleBulkMessage}
        >
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">WhatsApp em massa</span>
            </Button>
          </div>
        </div>
        
        {/* Texto informativo sobre AutoPiloto */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 mx-4 mt-1 rounded-lg p-2 text-center text-xs text-white shadow-lg">
          <span className="flex items-center justify-center">
            <Zap className="h-3 w-3 mr-1 text-yellow-400" />
            WhatsApp em Massa e AutoPiloto: Envio automático para leads selecionados
          </span>
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
      />
    </>
  );
};

export default BulkSelectionBar; 