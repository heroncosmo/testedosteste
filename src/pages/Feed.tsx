import { useState, useEffect, useRef, useCallback, Component, Fragment } from "react";
import { useLeads } from "@/hooks/useLeads";
import { useSelection } from "@/hooks/useSelection";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { cnaeService, CNAE } from "@/services/CNAEService";
import creditService from "@/services/creditService";
import WelcomeNotification from "@/components/ui/WelcomeNotification";
import TopStatusBar from "@/components/ui/TopStatusBar";
import SearchAndFilters from "@/components/ui/SearchAndFilters";
import BulkSelectionBar from "@/components/ui/BulkSelectionBar";
import LeadCard from "@/components/ui/LeadCard";
import BottomNavigation from "@/components/ui/BottomNavigation";
<<<<<<< HEAD
import PremiumBanner, { globalDiscountState } from "@/components/ui/PremiumBanner";
=======
import PremiumBanner from "@/components/ui/PremiumBanner";
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CNAEsList from "@/components/CNAEsList";
<<<<<<< HEAD
import { User, AlertCircle, Home, Flame, Zap, Star, Filter, ArrowRight, Bell, Search, Clock, MapPin, Building } from "lucide-react";
=======
import { User, AlertCircle, Home, Flame, Zap, Star, Filter, ArrowRight, Bell, Search } from "lucide-react";
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897

// ErrorBoundary para capturar erros na renderização
class ErrorBoundary extends Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
            <div className="flex items-center justify-center mb-4 text-red-500">
              <AlertCircle size={40} />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">Algo deu errado</h2>
            <p className="text-gray-600 text-center mb-4">
              Ocorreu um erro ao carregar esta página. Por favor, tente novamente.
            </p>
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded mb-4 overflow-auto max-h-24">
              {this.state.error?.toString()}
            </div>
            <Button 
              className="w-full" 
              onClick={() => window.location.reload()}
            >
              Recarregar página
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Adicionar estilos de scrollbar hide e animações
const scrollbarHideStyle = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  @keyframes slideUp {
    0% { transform: translateY(100%); }
    100% { transform: translateY(0); }
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
`;

export default function Feed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("quentes");
  const [activeTab, setActiveTab] = useState("feed");
  const [creditsRemaining, setCreditsRemaining] = useState(7);
  const [cnaeTerm, setCnaeTerm] = useState("");
  const [selectedCnae, setSelectedCnae] = useState<string | null>(null);
  const [cnaes, setCnaes] = useState<CNAE[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showCnaeSelector, setShowCnaeSelector] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState({
    title: "",
    description: "",
<<<<<<< HEAD
    featureType: 'action' as 'search' | 'filter' | 'recommendation' | 'action' | 'navigation',
    planType: 'plus' as 'plus' | 'pro' | 'ultra'
=======
    featureType: 'action' as 'search' | 'filter' | 'recommendation' | 'action' | 'navigation'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
  });
  
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const { user, session } = useAuth();
  
  const { 
    data: leads,
    isLoading,
    unlockLead,
    toggleFavorite,
    loadMoreLeads,
    filterByCnae,
    resetData
  } = useLeads();
  
  const {
    selectedLeads,
    selectedCount,
    toggleSelection,
    clearSelection,
    isSelected
  } = useSelection();

  // Mensagens promocionais aleatórias para mostrar entre os leads
  const promoMessages = [
    {
<<<<<<< HEAD
      title: "Auto WhatsApp Pro",
      message: "Economize 5 horas por dia enviando mensagens automaticamente para leads sem sair do WhatsApp Web. ROI imediato no primeiro mês.",
=======
      title: "Auto Whatsapp",
      message: "Envie mensagens automaticamente para leads sem sair do WhatsApp Web.",
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      cta: "Liberar Auto WhatsApp",
      icon: "message-circle",
      timer: 15
    },
    {
      title: "30 Milhões de Empresas",
<<<<<<< HEAD
      message: "Enquanto você lê isso, seu concorrente já contatou 5 novos clientes. Desbloqueie acesso a mais de 30 milhões de empresas e não fique para trás.",
=======
      message: "Desbloqueie acesso a mais de 30 milhões de empresas em nosso banco de dados.",
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      cta: "Ver Todas Empresas",
      icon: "database",
      timer: 45
    },
    {
<<<<<<< HEAD
      title: "Empresas Abertas Hoje",
      message: "Seja o primeiro a entrar em contato! Empresas novas têm 3x mais chances de fechar negócio com o primeiro contato e você será esse primeiro.",
      cta: "Ver Leads Recentes",
=======
      title: "Leads Quentes",
      message: "Veja empresas abertas hoje, esta semana e este mês - seja o primeiro a entrar em contato!",
      cta: "Ver Leads Quentes",
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      icon: "flame",
      timer: 30
    },
    {
<<<<<<< HEAD
      title: "Funcionário IA 24h/dia",
      message: "Por apenas R$33 por dia, tenha um funcionário que nunca dorme, nunca adoece, não pede férias e gera leads qualificados 24h/dia, 7 dias por semana.",
      cta: "Ativar Funcionário IA",
=======
      title: "Piloto Automático",
      message: "Nossa IA encontra leads e envia mensagens automaticamente enquanto você foca no fechamento.",
      cta: "Ativar Piloto Automático",
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      icon: "zap",
      timer: 20
    },
    {
<<<<<<< HEAD
      title: "Leads Nunca Contatados",
      message: "Acesse empresas que nunca foram contatadas - oportunidades virgens com taxa de resposta 3x maior que leads já abordados por outros vendedores.",
      cta: "Ver Leads Exclusivos",
=======
      title: "Filtros Avançados",
      message: "Encontre exatamente o que procura com filtros por localização, tamanho e faturamento.",
      cta: "Desbloquear Filtros",
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      icon: "filter",
      timer: 25
    }
  ];

  // Mensagens persuasivas para as recomendações
  const recommendationItems = [
    {
      icon: "⚡",
      title: "Leads Premium",
      description: "Empresas com alta chance de conversão para seu negócio",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      iconBgColor: "bg-blue-100",
      iconTextColor: "text-blue-600"
    },
    {
      icon: "🔥",
<<<<<<< HEAD
      title: "Empresas Novas (24h)",
      description: "Abertas hoje - seja o primeiro a entrar em contato!",
=======
      title: "Leads Quentes",
      description: "Empresas abertas recentemente procurando seus serviços",
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      bgColor: "bg-orange-50 hover:bg-orange-100",
      iconBgColor: "bg-orange-100",
      iconTextColor: "text-orange-600"
    },
    {
      icon: "🎯",
      title: "Match Perfeito",
      description: "Empresas com perfil ideal para o que você oferece",
      bgColor: "bg-green-50 hover:bg-green-100",
      iconBgColor: "bg-green-100",
      iconTextColor: "text-green-600"
    },
    {
      icon: "💼",
      title: "Empresas Locais",
      description: "Negócios próximos de você para contato direto",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      iconBgColor: "bg-purple-100",
      iconTextColor: "text-purple-600"
    },
    {
      icon: "🚀",
<<<<<<< HEAD
      title: "Abertas Este Mês",
      description: "Oportunidades recentes em busca de fornecedores",
=======
      title: "Alta Conversão",
      description: "Leads que já converteram em setores similares",
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      bgColor: "bg-amber-50 hover:bg-amber-100",
      iconBgColor: "bg-amber-100",
      iconTextColor: "text-amber-600"
    }
  ];

<<<<<<< HEAD
  // Add new popular filters with location options
  const popularFilters = [
    { id: 'novas24h', label: 'Abertas 24h', icon: '��', premium: true },
    { id: 'novasMes', label: 'Abertas no mês', icon: '📅', premium: true },
    { id: 'altaConversao', label: 'Alta conversão', icon: '📈', premium: true },
    { id: 'poucosContatos', label: 'Pouco contatadas', icon: '💎', premium: true },
    // Estados - todos premium
    { id: 'saopaulo', label: 'São Paulo', icon: '🏙️', premium: true },
    { id: 'riodejaneiro', label: 'Rio de Janeiro', icon: '🏖️', premium: true },
    { id: 'minasgerais', label: 'Minas Gerais', icon: '⛰️', premium: true },
    { id: 'parana', label: 'Paraná', icon: '🌲', premium: true },
    { id: 'bahia', label: 'Bahia', icon: '🌊', premium: true },
    // Cidades - todos premium
    { id: 'sp-capital', label: 'SP Capital', icon: '🏙️', premium: true },
    { id: 'campinas', label: 'Campinas', icon: '🏢', premium: true },
    { id: 'rj-capital', label: 'RJ Capital', icon: '🏖️', premium: true },
    { id: 'bh', label: 'Belo Horizonte', icon: '⛰️', premium: true },
    // Segmentos - não premium
    { id: 'servicos', label: 'Serviços', icon: '🛠️', premium: false },
    { id: 'comercio', label: 'Comércio', icon: '🛒', premium: false },
    { id: 'educacao', label: 'Educação', icon: '🎓', premium: false },
    { id: 'saude', label: 'Saúde', icon: '⚕️', premium: false },
    { id: 'tecnologia', label: 'Tecnologia', icon: '💻', premium: false }
  ];

=======
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
  // Ocultar a notificação de boas-vindas após 5 segundos
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Adicionar os estilos ao documento
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = scrollbarHideStyle;
    document.head.appendChild(styleElement);
    
    // Corrigir: Manter referência ao elemento de estilo para remoção segura
    const styleRef = styleElement;
    
    return () => {
      // Verificar se o elemento ainda está no DOM antes de tentar removê-lo
      if (document.head.contains(styleRef)) {
        document.head.removeChild(styleRef);
      }
    };
  }, []);

  // Carregar CNAEs de acordo com o termo de busca
  useEffect(() => {
    const filteredCnaes = cnaeService.searchCNAEs(cnaeTerm);
    setCnaes(filteredCnaes);
  }, [cnaeTerm]);

  // Carregar informações de créditos quando o usuário estiver logado
  useEffect(() => {
    const loadUserCredits = async () => {
      if (session?.user?.id) {
        try {
          // Verificar se o usuário tem créditos no sistema
          let credits = await creditService.getRemainingCredits(session.user.id);
          
          // Se não encontrou créditos, inicializar com o plano gratuito
          if (credits === 0) {
            try {
              // Tenta inicializar, mas se a tabela não existir, vai falhar silenciosamente
              const initialized = await creditService.initializeUserCredits(session.user.id, 'free');
              if (initialized) {
                // Recarregar créditos após inicialização
                credits = await creditService.getRemainingCredits(session.user.id);
              }
            } catch (initError) {
              console.error("Erro ao inicializar créditos (tabela pode não existir):", initError);
              // Definir um valor padrão para UI
              credits = 7;
            }
          }
          
          setCreditsRemaining(credits);
        } catch (error) {
          console.error("Erro ao carregar créditos do usuário:", error);
          // Mesmo em caso de erro, definir um valor padrão para mostrar na interface
          setCreditsRemaining(7);
        }
      }
    };
    
    loadUserCredits();
  }, [session]);

  // Otimizar o carregamento de mais leads
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    
    console.log('Carregando mais leads, página:', page);
    setIsLoadingMore(true);
    
    // Usar o hook loadMoreLeads que já gerencia a conexão com a API
    loadMoreLeads(page, 10, selectedCnae)
      .then(newLeads => {
        if (newLeads.length < 10) {
          setHasMore(false);
          console.log('Não há mais leads para carregar');
        } else {
          console.log(`${newLeads.length} leads carregados com sucesso`);
        }
        setPage(prev => prev + 1);
      })
      .catch(error => {
        console.error("Erro ao carregar mais leads:", error);
        // Em caso de erro, também parar de tentar carregar mais
        setHasMore(false);
        toast.error("Não foi possível carregar mais leads");
      })
      .finally(() => {
        setIsLoadingMore(false);
      });
  }, [isLoadingMore, hasMore, page, loadMoreLeads, selectedCnae]);

  // Configurar o observador de interseção para rolagem infinita com otimização
  useEffect(() => {
    // Limpa o observador existente antes de criar um novo
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    
    // Verificar se temos leads e se a referência loadMoreRef existe
    if (!leads || leads.length === 0 || !loadMoreRef.current) return;
    
    // Variáveis para debounce
    let isThrottled = false;
    const throttleTime = 1000; // 1 segundo entre carregamentos
    
    // Função para manipular a interseção
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry && entry.isIntersecting && hasMore && !isLoadingMore && !isThrottled) {
        console.log('Elemento de carregamento visível, carregando mais dados...');
        
        // Ativar throttle para evitar carregamentos excessivos
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, throttleTime);
        
        handleLoadMore();
      }
    };
    
    // Configuração do observador com threshold e rootMargin melhorados
    const options = {
      root: null,
      rootMargin: '200px', // Aumentado para 200px para detectar mais cedo
      threshold: 0.1 // Diminuído para 0.1 (10%) para detectar mais facilmente
    };

    // Criar o novo observador
    observerRef.current = new IntersectionObserver(handleIntersection, options);

    // Observar o elemento de carregamento
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
      console.log('Observador configurado para rolagem infinita');
    }

    // Limpeza ao desmontar
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [hasMore, isLoadingMore, handleLoadMore, leads]);

  // Resetar o estado quando o CNAE é alterado
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [selectedCnae]);

  // Filter leads based on search and active filter
  const filteredLeads = (leads || []).filter(lead => {
    // Se não for usuário premium, não aplicamos o filtro de busca (apenas visual)
    const isPremiumUser = false; // Por enquanto, nenhum usuário é premium
    const matchesSearch = !searchQuery || isPremiumUser || 
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === "quentes" ? lead.isHot : 
                         activeFilter === "all" ? true : 
                         activeFilter === "tech";
    
    return matchesSearch && matchesFilter;
  });

  const handleUnlockLead = async (leadId: number) => {
    if (!session) {
      // Show premium banner instead of toast for non-logged in users
      setPremiumFeature({
<<<<<<< HEAD
        title: "Desbloqueie Contatos Ilimitados",
        description: "Tenha acesso a telefones, emails e dados completos de mais de 30 milhões de empresas. Seja o primeiro a contatar empresas recém-abertas com 5x mais chances de conversão. Assine agora com desconto especial!",
        featureType: 'action',
        planType: 'plus'
      });
      setShowPremiumBanner(true);
      
      // Activate global discount countdown when showing any banner
      globalDiscountState.isTimerActive = true;
      
=======
        title: "Desbloqueie Leads Ilimitados",
        description: "Crie uma conta gratuita e comece a desbloquear contatos de empresas hoje mesmo. Tenha acesso a informações completas para expandir sua rede de clientes!",
        featureType: 'action'
      });
      setShowPremiumBanner(true);
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      return;
    }
    
    if (creditsRemaining <= 0) {
      // Mostrar modal de upgrade se não tiver créditos
      setPremiumFeature({
        title: "Sem créditos disponíveis",
<<<<<<< HEAD
        description: "Assine o plano Plus e tenha contatos ilimitados! Pare de perder oportunidades e comece a gerar resultados agora mesmo. Retorno garantido já no primeiro mês com apenas 5 novos clientes.",
        featureType: 'action',
        planType: 'plus'
=======
        description: "Você não tem mais créditos para desbloquear contatos. Faça upgrade para continuar explorando oportunidades!",
        featureType: 'action'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      });
      setShowPremiumBanner(true);
      return;
    }
    
    // Indicar que está processando
    toast.success("🎉 Lead desbloqueado com sucesso! Você pode agora acessar todos os dados de contato.", {
      duration: 3000,  // Tempo maior mas ainda desaparece após 3 segundos
      style: {
        background: 'linear-gradient(to right, #4ade80, #22c55e)',
        color: 'white',
        border: 'none'
      },
    });
    
    try {
      // Registrar no banco de dados o desbloqueio e consumir um crédito
      const success = await creditService.useCredit(session.user.id, leadId.toString());
      
      if (!success) {
        toast.error("Não foi possível desbloquear este lead. Tente novamente.");
        return;
      }
      
      // Atualizar créditos restantes
      const remainingCredits = await creditService.getRemainingCredits(session.user.id);
      setCreditsRemaining(remainingCredits);
      
      // Desbloquear o lead localmente
      unlockLead(leadId);
    } catch (error) {
      console.error("Erro ao desbloquear lead:", error);
      toast.error("Erro ao desbloquear lead. Tente novamente mais tarde.");
    }
  };

  const handleBulkMessage = () => {
    if (!session) {
      setPremiumFeature({
        title: "Mensagens em Massa",
        description: "Envie mensagens para múltiplos leads de uma só vez e economize seu tempo. Crie sua conta gratuitamente para começar!",
<<<<<<< HEAD
        featureType: 'action',
        planType: 'pro'
=======
        featureType: 'action'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      });
      setShowPremiumBanner(true);
      return;
    }
    
    if (selectedCount === 0) {
      toast.error("Selecione pelo menos um lead");
      return;
    }
    
    toast.success(`Mensagem enviada para ${selectedCount} leads`);
    clearSelection();
  };

  const handleBulkFavorite = () => {
    if (!session) {
      setPremiumFeature({
        title: "Organize seus Leads Favoritos",
        description: "Marque leads como favoritos para acompanhamento rápido e eficiente. Crie uma conta agora para começar a organizar suas oportunidades!",
<<<<<<< HEAD
        featureType: 'action',
        planType: 'plus'
=======
        featureType: 'action'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      });
      setShowPremiumBanner(true);
      return;
    }
    
    selectedLeads.forEach(leadId => toggleFavorite(leadId));
    toast.success(`${selectedCount} leads adicionados aos favoritos`);
    clearSelection();
  };

  const handleSendWhatsApp = (leadId: number) => {
    if (!session) {
      setPremiumFeature({
<<<<<<< HEAD
        title: "WhatsApp Direto - Feche Negócios Mais Rápido",
        description: "Envie mensagens diretamente para decisores via WhatsApp e aumente suas taxas de resposta em 300%. Empresas respondem 5x mais rápido no WhatsApp do que por email ou ligação. Comece agora!",
        featureType: 'action',
        planType: 'plus'
=======
        title: "Mensagens Diretas via WhatsApp",
        description: "Crie sua conta gratuita para enviar mensagens diretamente para os leads via WhatsApp e aumentar suas chances de conversão!",
        featureType: 'action'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      });
      setShowPremiumBanner(true);
      return;
    }
    
    toast.success("Abrindo WhatsApp...");
  };

  const handleSendEmail = (leadId: number) => {
    if (!session) {
      setPremiumFeature({
        title: "Comunicação Profissional por Email",
        description: "Entre ou crie sua conta para enviar emails profissionais personalizados diretamente para os leads.",
<<<<<<< HEAD
        featureType: 'action',
        planType: 'plus'
=======
        featureType: 'action'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      });
      setShowPremiumBanner(true);
      return;
    }
    
    toast.success("Abrindo email...");
  };

  const handleOpenChat = (leadId: number) => {
    if (!session) {
      setPremiumFeature({
        title: "Chat Interno com Leads",
        description: "Acesse nosso sistema de chat interno e organize todas as suas conversas com leads em um só lugar. Crie sua conta gratuitamente!",
<<<<<<< HEAD
        featureType: 'action',
        planType: 'plus'
=======
        featureType: 'action'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      });
      setShowPremiumBanner(true);
      return;
    }
    
    toast.success("Abrindo chat...");
  };

  const handleCnaeSelect = (code: string) => {
    setSelectedCnae(code);
    setShowCnaeSelector(false);
    // Resetar a busca com o novo CNAE selecionado
    setPage(1);
    setHasMore(true);
  };

  // Handler para busca por CNAE - modificado para mostrar banner Pro
  const handleCnaeSearch = useCallback((cnae: string) => {
    if (!cnae) return;
    
    console.log('Tentativa de busca por CNAE:', cnae);
    // Mostrar banner Pro em vez de filtrar
    setPremiumFeature({
      title: "Filtros CNAE Premium",
      description: `Para encontrar empresas com CNAE "${cnae}", assine o plano Premium e desbloqueie filtros avançados!`,
<<<<<<< HEAD
      featureType: 'filter',
      planType: 'plus'
    });
    setShowPremiumBanner(true);
    
    // Activate global discount countdown when showing any banner
    globalDiscountState.isTimerActive = true;
    
=======
      featureType: 'filter'
    });
    setShowPremiumBanner(true);
    
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
    // Não filtra de verdade, apenas exibe o banner
    // filterByCnae(cnae); - desativado
  }, []);

  // Handler para clicar nos itens recomendados
  const handleRecommendationClick = (item: any) => {
    let description = "";
<<<<<<< HEAD
    let planType: 'plus' | 'pro' | 'ultra' = 'plus';
=======
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
    
    switch(item.title) {
      case "Leads Premium":
        description = "Desbloqueie acesso a leads premium com 3x mais chances de conversão. Nossas análises identificam empresas prontas para comprar seus produtos ou serviços.";
<<<<<<< HEAD
        planType = 'plus';
        break;
      case "Leads Quentes":
        description = "Seja o primeiro a contatar empresas recém-abertas antes da concorrência. Empresas novas estão ativamente buscando fornecedores e parceiros como você!";
        planType = 'plus';
        break;
      case "Match Perfeito":
        description = "Nossa IA analisa seu perfil e encontra empresas que mais combinam com seu produto ou serviço. Aumente suas taxas de conversão em até 67%!";
        planType = 'ultra';
        break;
      case "Empresas Locais":
        description = "Encontre empresas perto de você para contato direto e fechamento rápido. Negócios locais preferem trabalhar com parceiros próximos.";
        planType = 'plus';
        break;
      case "Alta Conversão":
        description = "Acesse empresas que já converteram para negócios similares ao seu. Economize tempo focando apenas em leads qualificados.";
        planType = 'pro';
        break;
      default:
        description = `Acesse ${item.title} e encontre as melhores oportunidades para seu negócio. Desbloqueie este recurso premium!`;
        planType = 'plus';
=======
        break;
      case "Leads Quentes":
        description = "Seja o primeiro a contatar empresas recém-abertas antes da concorrência. Empresas novas estão ativamente buscando fornecedores e parceiros como você!";
        break;
      case "Match Perfeito":
        description = "Nossa IA analisa seu perfil e encontra empresas que mais combinam com seu produto ou serviço. Aumente suas taxas de conversão em até 67%!";
        break;
      case "Empresas Locais":
        description = "Encontre empresas perto de você para contato direto e fechamento rápido. Negócios locais preferem trabalhar com parceiros próximos.";
        break;
      case "Alta Conversão":
        description = "Acesse empresas que já converteram para negócios similares ao seu. Economize tempo focando apenas em leads qualificados.";
        break;
      default:
        description = `Acesse ${item.title} e encontre as melhores oportunidades para seu negócio. Desbloqueie este recurso premium!`;
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
    }
    
    setPremiumFeature({
      title: item.title,
      description: description,
<<<<<<< HEAD
      featureType: 'recommendation',
      planType
    });
    setShowPremiumBanner(true);
    
    // Activate global discount countdown when showing any banner
    globalDiscountState.isTimerActive = true;
=======
      featureType: 'recommendation'
    });
    setShowPremiumBanner(true);
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
  };
  
  // Handler para o botão "Ver todos"
  const handleViewAllClick = () => {
    setPremiumFeature({
      title: "Acesso Completo a Leads Premium",
      description: "Desbloqueie acesso ilimitado a mais de 30 milhões de empresas em nosso banco de dados. Encontre o cliente perfeito com filtros avançados, busca por CNAE e recomendações personalizadas baseadas em IA.",
<<<<<<< HEAD
      featureType: 'recommendation',
      planType: 'ultra'
    });
    setShowPremiumBanner(true);
    
    // Activate global discount countdown when showing any banner
    globalDiscountState.isTimerActive = true;
  };

  // Enhance premium features with more persuasive descriptions
  const handleFilterClick = (filterId: string) => {
    const filter = popularFilters.find(f => f.id === filterId);
    const isPremiumFilter = filter?.premium;
    
    if (isPremiumFilter && !user) {
      // Check if it's a location filter
      const isLocationFilter = filterId.includes('sp') || filterId.includes('rio') || 
                               filterId.includes('minas') || filterId.includes('parana') ||
                               filterId.includes('bahia') || filterId.includes('capital') ||
                               filterId.includes('bh') || filterId.includes('campinas');
      
      if (isLocationFilter) {
        setPremiumFeature({
          title: `Leads em ${filter?.label} - Exclusivo Plus`,
          description: "Encontre clientes próximos a você! Filtre empresas por estado e cidade para contatos locais e maiores chances de conversão. Economize em deslocamentos e foque em clientes da sua região.",
          featureType: 'filter',
          planType: 'plus'
        });
      } else if (filterId === 'novas24h' || filterId === 'novasMes') {
        setPremiumFeature({
          title: `Empresas Recém-Abertas - Oportunidade Única`,
          description: "Empresas novas têm 5x mais chances de contratar serviços. Seja o primeiro a entrar em contato antes da concorrência e feche negócios com quem ainda está definindo fornecedores.",
          featureType: 'filter',
          planType: 'plus'
        });
      } else if (filterId === 'poucosContatos') {
        setPremiumFeature({
          title: "Leads Virgens - Nunca Contatados",
          description: "Acesse empresas que ninguém contatou ainda! Sem concorrência, sem caixa de entrada lotada, apenas você oferecendo soluções para necessidades reais. Taxa de resposta 3x maior.",
          featureType: 'filter',
          planType: 'plus'
        });
      } else if (filterId === 'altaConversao') {
        setPremiumFeature({
          title: "Leads com Alta Taxa de Conversão",
          description: "Nossa IA identifica empresas com maior probabilidade de compra baseado em histórico de conversões similares. Economize tempo e foque em quem realmente está pronto para fechar negócio.",
          featureType: 'filter',
          planType: 'plus'
        });
      } else {
        setPremiumFeature({
          title: `${filter?.label} - Filtro Premium`,
          description: "Desbloqueie filtros avançados para encontrar leads específicos para seu negócio. Economize horas de prospecção manual e encontre clientes ideais em segundos.",
          featureType: 'filter',
          planType: 'plus'
        });
      }
      
      setShowPremiumBanner(true);
      
      // Activate global discount countdown
      globalDiscountState.isTimerActive = true;
      
      return;
    }
    
    setActiveFilter(filterId);
=======
      featureType: 'recommendation'
    });
    setShowPremiumBanner(true);
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-green-500 text-xl animate-pulse">🚀</span>
          </div>
          <p className="text-sm text-gray-600">Carregando oportunidades...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Top Status Bar Simplificado */}
        <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center flex-1 gap-3">
            <div className="flex items-center shrink-0">
<<<<<<< HEAD
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-500 text-sm">🚀</span>
=======
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <span className="text-green-500 text-sm">🚀</span>
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
              </div>
              <span className="font-bold text-lg ml-2 hidden sm:inline">Lead Pilot</span>
              <span className="font-bold text-lg ml-2 sm:hidden">LP</span>
            </div>
            
            {/* Search Bar integrado ao topo */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-gray-400" />
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setPremiumFeature({
                    title: "Busca Avançada Premium",
                    description: "Desbloqueie a busca avançada para encontrar leads específicos para seu negócio.",
<<<<<<< HEAD
                    featureType: 'search',
                    planType: 'plus'
=======
                    featureType: 'search'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
                  });
                  setShowPremiumBanner(true);
                }}>
                  <input
                    type="text"
                    placeholder="Buscar empresas, CNAE..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-100 w-full pl-7 pr-3 py-1.5 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-colors"
                  />
                </form>
              </div>
            </div>
          </div>
          
          <div className="flex items-center ml-2">
            {user ? (
              <>
<<<<<<< HEAD
                <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                  <span className="text-gray-500">🪙</span>
=======
                <div className="flex items-center space-x-1 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
                  <span className="text-amber-500">🪙</span>
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
                  <span className="text-gray-700">{creditsRemaining}/10</span>
                </div>
              </>
            ) : (
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                onClick={() => {
                  setPremiumFeature({
                    title: "Entre ou Crie sua Conta",
                    description: "Desbloqueie o acesso a leads exclusivos e ferramentas avançadas para impulsionar suas vendas!",
<<<<<<< HEAD
                    featureType: 'action',
                    planType: 'plus'
=======
                    featureType: 'action'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
                  });
                  setShowPremiumBanner(true);
                }}
              >
                Entrar
              </Button>
            )}
          </div>
        </div>
        
<<<<<<< HEAD
        {/* Add a persuasive explanation banner below the top status bar */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-2 border-b border-gray-200">
          <p className="text-xs text-gray-700 leading-tight">
            <span className="font-semibold">Mais de 30 milhões de empresas</span> disponíveis para você prospectar. Encontre leads quentes abertos nas últimas 24h com alto potencial de conversão.
          </p>
        </div>
        
=======
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
        {/* Welcome notification (conditional) */}
        {showWelcome && (
          <WelcomeNotification onClose={() => setShowWelcome(false)} />
        )}
        
        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col min-h-0">
            {/* Categoria Pills (estilo iFood com rolagem horizontal) */}
            <div className="scrollbar-hide overflow-x-auto pb-2 pt-3">
              <div className="flex space-x-2 px-4 min-w-max">
                <Button 
                  variant={activeFilter === "all" ? "default" : "outline"} 
                  size="sm"
<<<<<<< HEAD
                  className={`whitespace-nowrap rounded-full text-xs px-4 ${activeFilter === "all" ? "bg-blue-500 hover:bg-blue-600" : ""}`}
=======
                  className={`whitespace-nowrap rounded-full text-xs px-4 ${activeFilter === "all" ? "bg-green-500 hover:bg-green-600" : ""}`}
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
                  onClick={() => {
                    // Todos is not premium, so directly change filter
                    setActiveFilter("all");
                  }}
                >
                  <Home className="h-3.5 w-3.5 mr-1" />
                  Todas
                </Button>
<<<<<<< HEAD
                
                {/* Seletor de Estados (simulado) */}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="whitespace-nowrap rounded-full text-xs px-4 border-blue-200 text-blue-700 bg-blue-50"
                  onClick={() => {
                    setPremiumFeature({
                      title: "Filtro por Estado - Recurso Plus",
                      description: "Encontre leads próximos da sua região! Filtre por qualquer estado do Brasil e aumente suas chances de conversão com contatos locais. Assine o plano Plus para desbloquear.",
                      featureType: 'filter',
                      planType: 'plus'
                    });
                    setShowPremiumBanner(true);
                    globalDiscountState.isTimerActive = true;
                  }}
                >
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  Selecionar Estado ▾
                </Button>
                
                {/* Seletor de Cidades (simulado) */}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="whitespace-nowrap rounded-full text-xs px-4 border-blue-200 text-blue-700 bg-blue-50"
                  onClick={() => {
                    setPremiumFeature({
                      title: "Filtro por Cidade - Recurso Plus",
                      description: "Prospecte empresas da sua cidade! Filtrar por cidade permite encontrar clientes próximos, economizar em deslocamentos e focar em negócios locais. Assine o plano Plus para desbloquear.",
                      featureType: 'filter',
                      planType: 'plus'
                    });
                    setShowPremiumBanner(true);
                    globalDiscountState.isTimerActive = true;
                  }}
                >
                  <Building className="h-3.5 w-3.5 mr-1" />
                  Selecionar Cidade ▾
                </Button>
                
                {popularFilters.map(filter => (
                  <Button 
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "outline"} 
                    size="sm"
                    className={`whitespace-nowrap rounded-full text-xs px-4 ${activeFilter === filter.id ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                    onClick={() => handleFilterClick(filter.id)}
                  >
                    <span className="mr-1">{filter.icon}</span>
                    {filter.label}
                  </Button>
                ))}
                
=======
                <Button 
                  variant={activeFilter === "quentes" ? "default" : "outline"} 
                  size="sm"
                  className={`whitespace-nowrap rounded-full text-xs px-4 ${activeFilter === "quentes" ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                  onClick={() => {
                    // Show premium banner for hot leads filter
                    setPremiumFeature({
                      title: "Leads Quentes",
                      description: "Acesse leads identificados como quentes pela nossa IA, com maior probabilidade de conversão para seu negócio.",
                      featureType: 'filter'
                    });
                    setShowPremiumBanner(true);
                  }}
                >
                  <Flame className="h-3.5 w-3.5 mr-1" />
                  Oportunidades Quentes
                </Button>
                <Button 
                  variant={activeFilter === "tech" ? "default" : "outline"} 
                  size="sm"
                  className={`whitespace-nowrap rounded-full text-xs px-4 ${activeFilter === "tech" ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                  onClick={() => {
                    // Show premium banner for tech filter
                    setPremiumFeature({
                      title: "Empresas de Tecnologia",
                      description: "Acesse leads do setor de tecnologia e encontre as melhores oportunidades para seu negócio.",
                      featureType: 'filter'
                    });
                    setShowPremiumBanner(true);
                  }}
                >
                  <Zap className="h-3.5 w-3.5 mr-1" />
                  Tecnologia
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="whitespace-nowrap rounded-full text-xs px-4"
                  onClick={() => {
                    setPremiumFeature({
                      title: "Leads Favoritos",
                      description: "Acesse e organize todos os seus leads favoritos em um só lugar para acompanhamento fácil.",
                      featureType: 'filter'
                    });
                    setShowPremiumBanner(true);
                  }}
                >
                  <Star className="h-3.5 w-3.5 mr-1" />
                  Favoritos
                </Button>
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
                <Button 
                  variant="outline" 
                  size="sm"
                  className="whitespace-nowrap rounded-full text-xs px-4"
                  onClick={() => {
                    setPremiumFeature({
                      title: "Filtros Avançados",
                      description: "Desbloqueie filtros avançados para encontrar leads específicos por localização, tamanho da empresa, faturamento e muito mais.",
<<<<<<< HEAD
                      featureType: 'filter',
                      planType: 'plus'
=======
                      featureType: 'filter'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
                    });
                    setShowPremiumBanner(true);
                  }}
                >
                  <Filter className="h-3.5 w-3.5 mr-1" />
<<<<<<< HEAD
                  Mais Filtros
=======
                  Filtros
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
                </Button>
              </div>
            </div>
            
            {/* Seção de Recomendações (estilo iFood com textos persuasivos) */}
            <div className="bg-white py-3 px-4 mt-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">Recomendados para você</h3>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-blue-600 p-0 h-auto text-xs flex items-center"
                  onClick={handleViewAllClick}
                >
                  Ver todos
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              <div className="scrollbar-hide overflow-x-auto -mx-1 pb-2">
                <div className="flex space-x-3 px-1 min-w-max">
<<<<<<< HEAD
                  {recommendationItems.map((item, idx) => {
                    // Define a standard style for all items
                    const standardStyle = {
                      bgColor: "bg-gray-100 hover:bg-gray-200",
                      iconBgColor: "bg-gray-200",
                      iconTextColor: "text-blue-600"
                    };
                    
                    return (
                      <div 
                        key={idx} 
                        className={`flex-shrink-0 w-36 ${standardStyle.bgColor} rounded-lg p-3 flex flex-col items-center text-center cursor-pointer transition-colors`}
                        onClick={() => handleRecommendationClick(item)}
                      >
                        <div className={`w-10 h-10 ${standardStyle.iconBgColor} rounded-full flex items-center justify-center mb-2`}>
                          <span className={`${standardStyle.iconTextColor} text-xl`}>{item.icon}</span>
                        </div>
                        <h4 className="text-xs font-medium text-gray-800">{item.title}</h4>
                        <p className="text-[10px] text-gray-600 mt-1">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
=======
                  {recommendationItems.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-shrink-0 w-36 ${item.bgColor} rounded-lg p-3 flex flex-col items-center text-center cursor-pointer transition-colors`}
                      onClick={() => handleRecommendationClick(item)}
                    >
                      <div className={`w-10 h-10 ${item.iconBgColor} rounded-full flex items-center justify-center mb-2`}>
                        <span className={`${item.iconTextColor} text-xl`}>{item.icon}</span>
                      </div>
                      <h4 className="text-xs font-medium text-gray-800">{item.title}</h4>
                      <p className="text-[10px] text-gray-600 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
          </div>
        </div>
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
        
            {/* Main Feed */}
            <div className="flex-1 overflow-y-auto pt-2">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
                  <p>Carregando leads...</p>
                </div>
              ) : leads.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <p>Nenhum lead encontrado.</p>
                  {selectedCnae && (
                    <Button
                      onClick={() => {
                        setSelectedCnae(null);
                        resetData();
                      }}
                      variant="link"
                      className="mt-2"
                    >
                      Limpar filtro
                    </Button>
                  )}
<<<<<<< HEAD
                </div>
              ) : (
                <div className="space-y-2 pb-20 px-4">
                  {leads.map((lead, index) => (
                    <Fragment key={lead.id}>
                      <LeadCard
                        lead={lead}
                        isSelected={isSelected(lead.id)}
=======
            </div>
          ) : (
                <div className="space-y-2 pb-20 px-4">
                  {leads.map((lead, index) => (
                    <Fragment key={lead.id}>
                  <LeadCard
                    lead={lead}
                    isSelected={isSelected(lead.id)}
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
                        onToggleSelection={() => toggleSelection(lead.id)}
                        onUnlock={() => handleUnlockLead(lead.id)}
                        onToggleFavorite={() => toggleFavorite(lead.id)}
                        onSendWhatsApp={() => handleSendWhatsApp(lead.id)}
                        onSendEmail={() => handleSendEmail(lead.id)}
                        onOpenChat={() => handleOpenChat(lead.id)}
                        isLoggedIn={!!user}
<<<<<<< HEAD
                      />
                      
                      {/* Mostrar banner promocional após cada 5 itens - com design simplificado */}
                      {index > 0 && index % 5 === 0 && (
                        <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-gray-800 text-sm">
                              {promoMessages[index % promoMessages.length].title}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">
=======
                  />
                  
                      {/* Mostrar banner promocional após cada 5 itens */}
                      {index > 0 && index % 5 === 0 && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-3 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-blue-800 text-sm">
                              {promoMessages[index % promoMessages.length].title}
                            </h3>
                            <p className="text-xs text-blue-600 mt-1">
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
                              {promoMessages[index % promoMessages.length].message}
                            </p>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                            onClick={() => {
                              setPremiumFeature({
                                title: promoMessages[index % promoMessages.length].title,
                                description: promoMessages[index % promoMessages.length].message,
<<<<<<< HEAD
                                featureType: 'action',
                                planType: 'plus'
=======
                                featureType: 'action'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
                              });
                              setShowPremiumBanner(true);
                            }}
                          >
                            {promoMessages[index % promoMessages.length].cta}
                          </Button>
                        </div>
                      )}
                    </Fragment>
                  ))}
                  
                  {/* Infinite scrolling trigger */}
                  {hasMore && (
                    <div
                      ref={loadMoreRef}
                      className="h-10 flex items-center justify-center text-sm text-gray-500"
                    >
                      {isLoadingMore ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                          Carregando mais leads...
                        </>
                      ) : (
                        "Carregue mais..."
                      )}
                    </div>
                  )}
<<<<<<< HEAD
                </div>
              )}
            </div>
=======
            </div>
          )}
              </div>
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
          </div>
        </div>
        
        {/* Bottom Navigation */}
        <BottomNavigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        {/* Barra de seleção em massa (visível quando itens são selecionados) */}
        <BulkSelectionBar 
          selectedCount={selectedCount}
          onClearSelection={clearSelection}
          onBulkMessage={handleBulkMessage}
          onBulkFavorite={handleBulkFavorite}
        />
        
        {/* Mostrar o Premium Banner (substitui o modal atual) */}
        <PremiumBanner 
          isOpen={showPremiumBanner} 
          onClose={() => setShowPremiumBanner(false)}
          title={premiumFeature.title}
          description={premiumFeature.description}
          showLogin={!user}
          featureType={premiumFeature.featureType}
        />
      </div>
    </ErrorBoundary>
  );
} 