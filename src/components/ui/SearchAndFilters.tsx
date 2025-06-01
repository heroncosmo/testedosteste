import React, { useState, useEffect, useRef } from 'react';
import { Search, Zap, Clock, TrendingUp, Filter, X, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { Input } from './input';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CNAE } from '@/services/CNAEService';
<<<<<<< HEAD
import PremiumBanner, { globalDiscountState } from './PremiumBanner';
=======
import PremiumBanner from './PremiumBanner';
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
import { useAuth } from "@/providers/AuthProvider";

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  cnaeTerm: string;
  setCnaeTerm: (term: string) => void;
  showCnaeSelector: boolean;
  setShowCnaeSelector: (show: boolean) => void;
  selectedCnae: string | null;
  onCnaeSelect: (cnae: string) => void;
  onClearFilter: () => void;
}

// Lista de CNAEs mais comuns para sugestão inicial e fallback
const popularCnaes = [
  { code: '6201500', label: 'Desenvolvimento de Software' },
  { code: '6202300', label: 'Desenvolvimento de Sistemas' },
  { code: '6911701', label: 'Serviços advocatícios' },
  { code: '8630501', label: 'Clínicas Médicas' },
  { code: '4751201', label: 'Comércio de Informática' },
  { code: '7020400', label: 'Consultoria Empresarial' },
  { code: '8599603', label: 'Escolas e Cursos' },
  { code: '4781400', label: 'Vestuário e Moda' },
  { code: '5611201', label: 'Restaurantes' },
  { code: '7311400', label: 'Agências de Publicidade' },
  { code: '4712100', label: 'Minimercados e Mercearias' },
  { code: '5611202', label: 'Bares e Lanchonetes' },
  { code: '9602501', label: 'Salões de Beleza' },
  { code: '8650001', label: 'Psicologia e Psicanálise' },
  { code: '8630502', label: 'Odontologia' }
];

// Pesquisas populares com labels melhoradas
const popularSearches = [
  { id: 'novas24h', label: 'Abertas últimas 24h', icon: '🔥', premium: true },
  { id: 'novasSemana', label: 'Abertas esta semana', icon: '📅', premium: true },
<<<<<<< HEAD
  { id: 'poucosContatos', label: 'Nunca contatadas', icon: '💎', premium: true },
  { id: 'tech', label: 'Tecnologia e Inovação', icon: '💻', premium: false },
  { id: 'saude', label: 'Saúde e Bem-estar', icon: '🏥', premium: false },
  { id: 'educacao', label: 'Educação e Cursos', icon: '🎓', premium: false },
  { id: 'alimentacao', label: 'Alimentação e Bebidas', icon: '🍽️', premium: false },
  { id: 'servicos', label: 'Serviços Empresariais', icon: '🛠️', premium: false },
  { id: 'comercio', label: 'Comércio Varejista', icon: '🛒', premium: false },
=======
  { id: 'tech', label: 'Tecnologia e Inovação', icon: '💻', premium: false },
  { id: 'saude', label: 'Saúde e Bem-estar', icon: '🏥', premium: false },
  { id: 'alimentacao', label: 'Alimentação e Bebidas', icon: '🍽️', premium: false },
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
  { id: 'construcao', label: 'Construção Civil', icon: '🏗️', premium: false }
];

// Filtros melhorados
const filters = [
  { id: 'quentes', label: 'Leads Quentes', icon: '🔥', count: 247, premium: true },
  { id: 'hoje', label: 'Abertas Hoje', icon: '📆', premium: true },
  { id: 'novas24h', label: 'Últimas 24h', icon: '⏱️', premium: true },
<<<<<<< HEAD
  { id: 'novasMes', label: 'Abertas no Mês', icon: '📅', premium: true },
  { id: 'poucosContatos', label: 'Sem contato', icon: '💎', premium: true },
  { id: 'altaConversao', label: 'Alta conversão', icon: '📈', premium: true },
  { id: 'capital', label: 'Alto Capital', icon: '💰', premium: true },
  { id: 'sp', label: 'São Paulo', icon: '🏙️', premium: false },
  { id: 'rj', label: 'Rio de Janeiro', icon: '🏖️', premium: false },
  { id: 'restaurantes', label: 'Restaurantes', icon: '🍽️', premium: false },
  { id: 'clinicas', label: 'Clínicas', icon: '🏥', premium: false },
  { id: 'tech', label: 'Tech', icon: '💻', premium: false },
  { id: 'educacao', label: 'Educação', icon: '🎓', premium: false },
  { id: 'servicos', label: 'Serviços', icon: '🛠️', premium: false },
  { id: 'comercio', label: 'Comércio', icon: '🛒', premium: false },
=======
  { id: 'restaurantes', label: 'Restaurantes', icon: '🍽️', premium: false },
  { id: 'clinicas', label: 'Clínicas', icon: '🏥', premium: false },
  { id: 'tech', label: 'Tech', icon: '💻', premium: false },
  { id: 'capital', label: 'Alto Capital', icon: '💰', premium: true },
  { id: 'sp', label: 'São Paulo', icon: '🏙️', premium: false },
  { id: 'rj', label: 'Rio de Janeiro', icon: '🏖️', premium: false },
  { id: 'mg', label: 'Minas Gerais', icon: '⛰️', premium: false },
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
  { id: 'favoritos', label: 'Favoritos', icon: '⭐', premium: true },
  { id: 'recentes', label: 'Visualizados', icon: '👁️', premium: true }
];

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  cnaeTerm,
  setCnaeTerm,
  showCnaeSelector,
  setShowCnaeSelector,
  selectedCnae,
  onCnaeSelect,
  onClearFilter
}) => {
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [filteredCnaes, setFilteredCnaes] = useState<typeof popularCnaes>([]);
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);
<<<<<<< HEAD
  const [premiumFeature, setPremiumFeature] = useState({
    title: '',
    description: '',
    featureType: 'search' as 'search' | 'filter' | 'recommendation' | 'action' | 'navigation',
    planType: 'plus' as 'plus' | 'pro' | 'ultra'
=======
  const [premiumFeature, setPremiumFeature] = useState({ 
    title: '', 
    description: '',
    featureType: 'action' as 'search' | 'filter' | 'recommendation' | 'action' | 'navigation'
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
  });
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Desenvolvimento de software",
    "Empresas de São Paulo"
  ]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsPanelRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const { user } = useAuth();

  // Verificar se o scrolling horizontal é necessário
  useEffect(() => {
    const checkScroll = () => {
      if (filtersRef.current) {
        setShowScrollButtons(
          filtersRef.current.scrollWidth > filtersRef.current.clientWidth
        );
      }
    };
    
    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Função para scrollar os filtros
  const scrollFilters = (direction: 'left' | 'right') => {
    if (filtersRef.current) {
      const scrollAmount = 150;
      filtersRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Buscar CNAEs do Supabase conforme o usuário digita
  useEffect(() => {
    const fetchCnaes = async () => {
      if (!searchQuery || searchQuery.length < 2) {
        setFilteredCnaes([]);
        return;
      }

      try {
        // Buscar CNAEs no Supabase baseado no termo de busca (aumentando o limite para 15)
        const { data, error } = await supabase
          .from('empresas')
          .select('cnae_fiscal, cnae_descricao')
          .or(`cnae_descricao.ilike.%${searchQuery}%,razao_social.ilike.%${searchQuery}%`)
          .limit(15);

        if (error) {
          console.error('Erro ao buscar CNAEs:', error);
          throw error;
        }

        if (data && data.length > 0) {
          // Mapear e remover duplicatas
          const uniqueCnaes = Array.from(new Set(data.map(item => 
            JSON.stringify({
              code: item.cnae_fiscal?.toString() || '',
              label: item.cnae_descricao || 'Empresa'
            })
          ))).map(item => JSON.parse(item));
          
          setFilteredCnaes(uniqueCnaes);
        } else {
          // Fallback para a lista estática filtrada
          const filtered = popularCnaes.filter(cnae => 
            cnae.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cnae.code.includes(searchQuery)
          );
          setFilteredCnaes(filtered);
        }
      } catch (error) {
        console.error('Erro ao buscar CNAEs:', error);
        // Fallback para a lista estática
        const filtered = popularCnaes.filter(cnae => 
          cnae.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cnae.code.includes(searchQuery)
        );
        setFilteredCnaes(filtered);
      }
    };

    // Debounce para evitar muitas requisições
    const timeoutId = setTimeout(() => {
      fetchCnaes();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsPanelRef.current && 
        !suggestionsPanelRef.current.contains(event.target as Node) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => {
    setShowSearchSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string, isPremium: boolean = false) => {
    if (isPremium && !user) {
<<<<<<< HEAD
      setPremiumFeature({
        title: "Busca Avançada Pro",
        description: "Desbloqueie buscas avançadas e filtros premium para encontrar os melhores leads para seu negócio.",
        featureType: 'search',
        planType: 'pro'
      });
      setShowPremiumBanner(true);
      
      // Activate global discount countdown
      globalDiscountState.isTimerActive = true;
      
=======
    setPremiumFeature({
        title: "Busca Avançada Pro",
        description: "Desbloqueie buscas avançadas e filtros premium para encontrar os melhores leads para seu negócio.",
        featureType: 'search'
    });
    setShowPremiumBanner(true);
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      return;
    }
    
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
  };

  const handleCnaeClick = (cnae: any) => {
    // Sempre mostrar o banner Pro ao clicar em um CNAE
    setPremiumFeature({
      title: "Filtros CNAE Premium",
      description: `Para filtrar empresas com CNAE "${cnae.code} - ${cnae.label}", assine o plano Premium!`,
<<<<<<< HEAD
      featureType: 'filter',
      planType: 'pro'
    });
    setShowPremiumBanner(true);
    
    // Activate global discount countdown
    globalDiscountState.isTimerActive = true;
    
=======
      featureType: 'filter'
    });
    setShowPremiumBanner(true);
    
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
    // Atualizar o texto de busca visualmente, mas não executar a busca
    setSearchQuery(cnae.label);
    
    // Adicionar à lista de buscas recentes
    if (!recentSearches.includes(cnae.label)) {
      setRecentSearches(prev => [cnae.label, ...prev.slice(0, 4)]);
    }
    
    setShowSearchSuggestions(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Se não estiver logado ou busca for premium, mostrar banner
    if (searchQuery && !user) {
      setPremiumFeature({
        title: "Busca Avançada Premium",
<<<<<<< HEAD
        description: "Desbloqueie a busca avançada para encontrar empresas e setores específicos para seu negócio.",
        featureType: 'search',
        planType: 'pro'
      });
      setShowPremiumBanner(true);
      
      // Activate global discount countdown
      globalDiscountState.isTimerActive = true;
      
      return;
    }
    
    // Adicionar à lista de buscas recentes
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
=======
        description: "Acesse resultados de busca completos e detalhados para encontrar exatamente o que você procura.",
        featureType: 'search'
      });
      setShowPremiumBanner(true);
      return;
    }
    
    // Adicionar à lista de buscas recentes se não existir
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5)); // Manter apenas 5 buscas
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
    }
    
    setShowSearchSuggestions(false);
  };

  const handleFilterClick = (filterId: string) => {
<<<<<<< HEAD
    // Alguns filtros são premium e mostram banner
    const isPremiumFilter = filters.find(f => f.id === filterId)?.premium;
    
    if (isPremiumFilter && !user) {
      setPremiumFeature({
        title: "Filtros Premium",
        description: "Desbloqueie filtros avançados e encontre leads específicos para seu negócio.",
        featureType: 'filter',
        planType: 'pro'
      });
      setShowPremiumBanner(true);
      
      // Activate global discount countdown
      globalDiscountState.isTimerActive = true;
      
=======
    const filterItem = filters.find(f => f.id === filterId);
    
    // Se for um filtro premium e usuário não estiver logado, mostrar banner
    if (filterItem?.premium && !user) {
      switch(filterId) {
        case 'quentes':
          setPremiumFeature({
            title: "Leads Quentes",
            description: "Acesse leads identificados como quentes pela nossa IA, com maior probabilidade de conversão para seu negócio.",
            featureType: 'filter'
          });
          break;
        case 'hoje':
        case 'novas24h':
          setPremiumFeature({
            title: "Empresas Recém-Abertas",
            description: "Desbloqueie acesso a empresas recém-abertas e seja o primeiro a fazer contato.",
            featureType: 'filter'
          });
          break;
        case 'capital':
          setPremiumFeature({
            title: "Filtro por Capital Social",
            description: "Encontre empresas com alto capital social, ideais para vendas de maior valor.",
            featureType: 'filter'
          });
          break;
        case 'favoritos':
          setPremiumFeature({
            title: "Seus Favoritos",
            description: "Acesse rapidamente todas as empresas que você marcou como favoritas.",
            featureType: 'filter'
          });
          break;
        default:
          setPremiumFeature({
            title: "Filtro Premium",
            description: "Desbloqueie filtros avançados para refinar sua busca de leads.",
            featureType: 'filter'
          });
      }
      
      setShowPremiumBanner(true);
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      return;
    }
    
    setActiveFilter(filterId);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      {/* Barra de pesquisa com ícone e dica */}
      <form onSubmit={handleSearchSubmit} className="p-3 relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
        <Input
          ref={searchInputRef}
          type="text"
                  placeholder="Buscar empresas, CNAE ou segmento..."
          value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleInputFocus}
                  className="pl-10 pr-4 py-2 text-sm"
        />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
        {searchQuery && (
          <button 
            type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setSearchQuery('')}
          >
                    <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Buscar por nome de empresa, CNAE ou segmento</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
      
      {/* CNAE Filter Button */}
      <div className="px-3 pb-2 flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setShowCnaeSelector(!showCnaeSelector)}
                className={`flex items-center px-3 py-1.5 rounded-md text-xs ${
                  selectedCnae 
                    ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}
              >
                <Filter className="h-3 w-3 mr-1.5" />
                {selectedCnae 
                  ? `CNAE: ${selectedCnae}` 
                  : "Filtrar por CNAE"}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Filtrar empresas por código CNAE</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {selectedCnae && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onClearFilter}
                  className="ml-2 p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Limpar filtro de CNAE</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
                    </div>
      
      {/* Categorias e filtros com scroll */}
      <div className="relative px-2">
        {showScrollButtons && (
          <>
          <button 
            onClick={() => scrollFilters('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-sm"
            >
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </button>
            <button
              onClick={() => scrollFilters('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-sm"
          >
              <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>
          </>
        )}
        
        <div 
          ref={filtersRef}
          className="flex overflow-x-auto scrollbar-hide py-2 px-1 space-x-1.5"
        >
          {filters.map(filter => (
            <TooltipProvider key={filter.id}>
              <Tooltip>
                <TooltipTrigger asChild>
            <button
              key={filter.id}
                    className={`flex items-center space-x-1 whitespace-nowrap px-3 py-1.5 rounded-md text-xs ${
                      activeFilter === filter.id
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${filter.premium ? 'border-l-2 border-amber-400' : ''}`}
              onClick={() => handleFilterClick(filter.id)}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
                    {filter.count && (
                      <span className="bg-gray-200 text-gray-800 rounded-full px-1.5 text-xs ml-1">
                        {filter.count}
                      </span>
              )}
            </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {filter.premium 
                      ? `Recurso premium: ${filter.label}` 
                      : `Filtrar por: ${filter.label}`}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      
      {/* Premium Banner */}
      <PremiumBanner 
        isOpen={showPremiumBanner} 
<<<<<<< HEAD
        onClose={() => setShowPremiumBanner(false)}
=======
        onClose={() => setShowPremiumBanner(false)} 
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
        title={premiumFeature.title}
        description={premiumFeature.description}
        showLogin={!user}
        featureType={premiumFeature.featureType}
<<<<<<< HEAD
        planType={premiumFeature.planType}
=======
>>>>>>> d39f8955991ea090bc1da5ee665a5542125db897
      />
    </div>
  );
};

export default SearchAndFilters; 