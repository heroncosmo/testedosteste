import React, { useState } from 'react';
import { Lead } from '@/hooks/useLeads';
import { Star, MapPin, Users, Lock, Copy, Send, AlarmClock, ExternalLink, Zap, Info, X, Building, Check, ChevronRight, User, Globe, Sparkles, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface LeadCardProps {
  lead: Lead;
  isSelected: boolean;
  onToggleSelection: (id: number) => void;
  onUnlock: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onSendWhatsApp: (id: number) => void;
  onSendEmail: (id: number) => void;
  onOpenChat: (id: number) => void;
  isLoggedIn?: boolean;
}

const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  isSelected,
  onToggleSelection,
  onUnlock,
  onToggleFavorite,
  onSendWhatsApp,
  onSendEmail,
  onOpenChat,
  isLoggedIn = false
}) => {
  const [showAutoPilotModal, setShowAutoPilotModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showCnaeInfo, setShowCnaeInfo] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  // Função para copiar texto para a área de transferência
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copiado com sucesso!`);
    }).catch(err => {
      console.error('Erro ao copiar texto: ', err);
      toast.error('Erro ao copiar texto');
    });
  };

  // Função para abrir o WhatsApp com o número e mensagem personalizada
  const openWhatsApp = (phone: string) => {
    if (!isLoggedIn) {
      setShowPricingModal(true);
      return;
    }
    
    // Limpar o número de telefone (remover caracteres não numéricos)
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Se o número começar com 0 ou tiver um ponto, remover
    let normalizedPhone = cleanPhone;
    if (normalizedPhone.startsWith('0')) {
      normalizedPhone = normalizedPhone.substring(1);
    }
    
    // Se o número não começar com 55 (Brasil), adicionar
    const fullPhone = normalizedPhone.startsWith('55') ? normalizedPhone : `55${normalizedPhone}`;
    
    // Criar mensagem personalizada baseada no tipo de empresa
    let message = `Olá, tudo bem? Vi sua empresa ${lead.companyName} e gostaria de saber mais sobre seus produtos/serviços.`;
    
    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir o WhatsApp com a mensagem
    window.open(`https://api.whatsapp.com/send?phone=${fullPhone}&text=${encodedMessage}`, '_blank');
    
    toast.success("Abrindo WhatsApp...");
  };

  // Função para fazer uma ligação telefônica
  const makePhoneCall = (phone: string) => {
    if (!isLoggedIn) {
      setShowPricingModal(true);
      return;
    }
    
    // Limpar o número de telefone (remover caracteres não numéricos)
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Abrir a discagem telefônica
    window.open(`tel:${cleanPhone}`, '_blank');
    
    toast.success("Iniciando chamada...");
  };

  // Função para enviar email
  const sendEmail = (email: string) => {
    if (!isLoggedIn) {
      setShowPricingModal(true);
      return;
    }
    
    // Criar assunto personalizado
    const subject = encodeURIComponent(`Contato - ${lead.companyName}`);
    
    // Criar corpo do email personalizado
    const body = encodeURIComponent(`Olá,\n\nVi sua empresa ${lead.companyName} e gostaria de saber mais sobre seus produtos/serviços.\n\nAtenciosamente,`);
    
    // Abrir o cliente de email padrão
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    
    toast.success("Abrindo cliente de email...");
  };

  // Determinar as iniciais para o avatar
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Gerar uma cor de fundo baseada no nome da empresa
  const generateAvatarBgColor = (name: string) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-indigo-500 to-indigo-600',
      'from-pink-500 to-pink-600'
    ];
    
    const hash = name.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    return colors[hash % colors.length];
  };

  // Determinar a cor do badge de match
  const getMatchBadgeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  // Formatar o texto do match
  const formatMatchText = (percentage: number) => {
    return `${percentage}%`;
  };

  // Determinar se é um lead premium
  const isPremium = lead.isPremium;

  // Obter as iniciais para o avatar
  const initials = getInitials(lead.companyName);
  
  // Obter a cor de fundo do avatar
  const avatarBgColor = generateAvatarBgColor(lead.companyName);
  
  // Verificar se o lead está desbloqueado de fato
  const isReallyUnlocked = lead.isUnlocked && isLoggedIn;

  // Formatação de CNAE para exibição
  const formatCnae = (cnae: string | undefined) => {
    if (!cnae) return null;
    
    // Formatação padrão XX.XX-X/XX
    if (cnae.length === 7) {
      return `${cnae.substring(0, 2)}.${cnae.substring(2, 4)}-${cnae.substring(4, 5)}/${cnae.substring(5)}`;
    }
    return cnae;
  };

  // Animação de highlight para elementos novos
  const highlightAnimation = "animate-highlight-fade";

  return (
    <div 
      className={`bg-white border rounded-lg shadow-sm py-3 px-3 relative hover:bg-gray-50 transition-colors ${highlightAnimation} ${isSelected ? 'bg-green-50 border-green-300' : 'border-gray-200'} mb-2`}
      onClick={() => onToggleSelection(lead.id)}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="relative mt-0.5">
          <div 
            className={`w-5 h-5 rounded border ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'} flex items-center justify-center cursor-pointer absolute -top-0.5 -left-0.5 z-10`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelection(lead.id);
            }}
          >
            {isSelected && <Check className="h-3 w-3 text-white" />}
          </div>
          
          <div className={`w-11 h-11 bg-gradient-to-br ${avatarBgColor} rounded-lg flex items-center justify-center font-bold text-sm text-white ${isSelected ? 'ring-2 ring-green-500' : ''}`}>
            {lead.avatar || initials}
          </div>
          
          {/* Badge premium */}
          {isPremium && (
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-amber-500 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center">
              ⭐
            </div>
          )}
        </div>
        
        {/* Conteúdo do Lead */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              {isReallyUnlocked ? (
                <div className="flex items-center space-x-1">
                  <h3 className="font-semibold text-gray-900 truncate text-sm">{lead.companyName}</h3>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(lead.companyName, 'Nome da empresa');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                    title="Copiar nome da empresa para a área de transferência"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <h3 className="font-semibold text-gray-900 truncate text-sm relative">
                  <span>{lead.companyName.substring(0, 3)}</span>
                  <span className="bg-gradient-to-r from-transparent to-transparent via-gray-200 px-1 mx-1 rounded">•••</span>
                  <span>{lead.companyName.substring(lead.companyName.length - 3)}</span>
                </h3>
              )}
              <p className="text-xs text-gray-500 truncate">{lead.description}</p>
            </div>
            
            <div className="flex items-center space-x-1 ml-2">
              <Badge className={`${getMatchBadgeColor(lead.matchPercentage)} text-xs py-0.5 px-1.5`}>
                {formatMatchText(lead.matchPercentage)}
              </Badge>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(lead.id);
                }}
                className={`${lead.isFavorited ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-500 transition-colors`}
                aria-label={lead.isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                title={lead.isFavorited ? "Remover esta empresa dos favoritos" : "Adicionar esta empresa aos favoritos"}
              >
                <Star className={`h-4 w-4 ${lead.isFavorited ? 'fill-yellow-500' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Localização e informações da empresa - estilo iFood */}
          <div className="flex items-center text-xs text-gray-500 mt-1.5 flex-wrap">
              <div className="flex items-center mr-2">
              <MapPin className="h-3 w-3 mr-0.5 text-green-600" />
                <span>{lead.location}</span>
              </div>
              
              <div className="flex items-center mr-2">
              <Users className="h-3 w-3 mr-0.5 text-blue-600" />
                <span>{lead.employeeCount}</span>
              </div>
              
              {/* CNAE (sempre visível mas formatado diferente baseado no desbloqueio) */}
              {lead.cnae && (
                <div className="flex items-center">
                <Building className="h-3 w-3 mr-0.5 text-purple-600" />
                  {isReallyUnlocked ? (
                    <>
                      <span 
                        className="text-xs cursor-pointer text-blue-600 hover:text-blue-800 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCnaeInfo(true);
                      }}
                        title="Ver detalhes do CNAE"
                      >
                        {formatCnae(lead.cnae)}
                        <Info className="h-2.5 w-2.5 ml-0.5" />
                      </span>
                    </>
                  ) : (
                    <span className="text-xs">
                      CNAE: {lead.cnae.substring(0, 2)}...
                    </span>
                  )}
                </div>
              )}
          </div>
          
          {/* Insights de IA (se disponível) */}
          {lead.aiInsights && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-2 border-blue-300 pl-2 pr-1 py-1 mt-2 text-[10px] leading-tight text-blue-700 rounded-r-md">
              <span className="font-medium">IA:</span> {lead.aiInsights}
            </div>
          )}
          
          {/* Informações detalhadas quando desbloqueado */}
          {isReallyUnlocked ? (
            <div className="mt-3 border border-green-100 bg-green-50 rounded-md p-2 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-medium text-green-800 flex items-center">
                  <span className="mr-1">Informações de Contato</span>
                  <span className="bg-green-200 text-green-800 text-[10px] px-1 rounded">Desbloqueado</span>
                </h4>
                    <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Abrir modal com todos os detalhes
                    setShowCompanyDetails(true);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                >
                  Ver detalhes completos
                  <ChevronRight className="h-3 w-3 ml-0.5" />
                    </button>
                  </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  {/* Telefone Principal */}
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-700">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center">
                      <span className="text-xs text-gray-800 truncate mr-1">{lead.contactPhone || "Não informado"}</span>
                      {lead.contactPhone && (
                        <div className="flex space-x-1">
                          <button 
                            className="text-gray-500 hover:text-blue-700" 
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(lead.contactPhone!, 'Telefone');
                            }}
                            title="Copiar telefone para a área de transferência"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <button 
                            className="text-green-500 hover:text-green-700" 
                            onClick={(e) => {
                              e.stopPropagation();
                              openWhatsApp(lead.contactPhone!);
                            }}
                            title="Abrir WhatsApp"
                          >
                            <Send className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1 flex items-center">
                      <span className="text-xs text-gray-800 truncate mr-1">{lead.contactEmail || "Não informado"}</span>
                      {lead.contactEmail && (
                        <div className="flex space-x-1">
                          <button 
                            className="text-gray-500 hover:text-blue-700" 
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(lead.contactEmail!, 'Email');
                            }}
                            title="Copiar email para a área de transferência"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <button 
                            className="text-orange-500 hover:text-orange-700" 
                            onClick={(e) => {
                              e.stopPropagation();
                              sendEmail(lead.contactEmail!);
                            }}
                            title="Enviar email"
                          >
                            <Send className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-700">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-800 truncate">{lead.nomeFantasia || lead.companyName}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-3">
                  <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (lead.contactPhone) {
                      openWhatsApp(lead.contactPhone);
                    } else {
                      toast.error("Número de telefone não disponível");
                    }
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1.5 rounded-md flex items-center justify-center text-xs"
                    title="Enviar mensagem via WhatsApp para este contato"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  Enviar no WhatsApp
                  </button>
                  
                  <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (lead.contactEmail) {
                      sendEmail(lead.contactEmail);
                    } else {
                      toast.error("Email não disponível");
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1.5 rounded-md flex items-center justify-center text-xs"
                    title="Enviar email para este contato"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Enviar Email
                  </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (lead.contactPhone) {
                      makePhoneCall(lead.contactPhone);
                    } else {
                      toast.error("Número de telefone não disponível");
                    }
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1.5 rounded-md flex items-center justify-center text-xs"
                  title="Ligar para este contato"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Ligar
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-md p-2 animate-fade-in">
              <div className="flex justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex">
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="flex items-center justify-between flex-1">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 font-medium">
                          {lead.contactPhone ? 
                            lead.contactPhone : 
                            "Telefone bloqueado"}
                        </span>
                        <Lock className="h-3 w-3 ml-1 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="flex items-center justify-between flex-1">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 font-medium">
                          {lead.contactEmail ? 
                            lead.contactEmail : 
                            "Email bloqueado"}
                        </span>
                        <Lock className="h-3 w-3 ml-1 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onUnlock(lead.id);
                  }}
                  className="ml-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg min-w-[70px] h-full flex flex-col items-center justify-center shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
                  title="Desbloqueie este contato para ver todas as informações e entrar em contato"
                >
                  <Lock className="h-4 w-4 mb-1" />
                  <span className="text-[10px] font-medium">Desbloquear</span>
                  <span className="text-[8px] bg-white bg-opacity-30 px-1 rounded mt-1">-1 crédito</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de Autopiloto */}
      {showAutoPilotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowAutoPilotModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <AlarmClock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ative o Autopiloto</h3>
              <p className="text-gray-600 mb-6">
                Com o plano Pro, nosso sistema inteligente enviará mensagens automaticamente para seus leads mais promissores, aumentando sua taxa de conversão.
              </p>
              
              <div className="bg-blue-50 p-3 rounded-lg mb-6">
                <p className="text-sm text-blue-700">
                  <span className="font-bold">Autopiloto inclui:</span> Escolha automática de leads, criação de mensagens personalizadas com IA, envio em horários otimizados e relatórios detalhados.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={() => {
                    setShowAutoPilotModal(false);
                    window.location.href = "http://localhost:8080/pricing";
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver planos
                </Button>
                <Button 
                  onClick={() => setShowAutoPilotModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Pricing para WhatsApp */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowPricingModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-green-600" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Desbloqueie o WhatsApp ilimitado</h3>
              <p className="text-gray-600 mb-6">
                Assine um de nossos planos e tenha acesso ilimitado a envios de WhatsApp, incluindo envios automáticos em massa para aumentar suas conversões.
              </p>
              
              <div className="bg-green-50 p-3 rounded-lg mb-6">
                <p className="text-sm text-green-700">
                  <span className="font-bold">Recursos inclusos:</span> Desbloquear contatos ilimitados, envio em massa, templates personalizados e acompanhamento de resultados.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={() => {
                    setShowPricingModal(false);
                    window.location.href = "http://localhost:8080/pricing";
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver planos
                </Button>
                <Button 
                  onClick={() => setShowPricingModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Agora não
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Informações do CNAE */}
      {showCnaeInfo && lead.cnae && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowCnaeInfo(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4 overflow-hidden">
                <span className="text-blue-600 font-mono font-bold text-xs">
                  {formatCnae(lead.cnae)}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Detalhes do CNAE</h3>
              <p className="text-gray-600 mb-4">
                {lead.description}
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                <h4 className="font-semibold text-blue-800 mb-2">Sobre este segmento:</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
                    <span>Este CNAE representa atividades de {lead.description.toLowerCase()}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
                    <span>Empresas neste segmento geralmente buscam soluções de {getSegmentNeeds(lead.cnae)}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
                    <span>Este é um {isHighPotentialCnae(lead.cnae) ? 'segmento de alto potencial' : 'segmento tradicional'} para conversão</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={() => setShowCnaeInfo(false)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Entendi
                </Button>
                
                <Button 
                  onClick={() => {
                    setShowCnaeInfo(false);
                    window.location.href = "http://localhost:8080/pricing";
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Mais leads deste CNAE
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Detalhes Completos da Empresa */}
      {showCompanyDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setShowCompanyDetails(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-left">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${avatarBgColor} rounded-lg flex items-center justify-center font-bold text-lg text-white mr-3`}>
                  {lead.avatar || initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{lead.companyName}</h3>
                  <p className="text-sm text-gray-600">{lead.description}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Dados da Empresa */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Building className="h-4 w-4 mr-1 text-blue-600" />
                    Dados da Empresa
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Razão Social</p>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-800">{lead.razaoSocial || "Não informado"}</p>
                        {lead.razaoSocial && (
                          <button 
                            onClick={() => copyToClipboard(lead.razaoSocial!, 'Razão Social')}
                            className="text-gray-400 hover:text-gray-600 ml-1"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Nome Fantasia</p>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-800">{lead.nomeFantasia || "Não informado"}</p>
                        {lead.nomeFantasia && (
                          <button 
                            onClick={() => copyToClipboard(lead.nomeFantasia!, 'Nome Fantasia')}
                            className="text-gray-400 hover:text-gray-600 ml-1"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">CNPJ</p>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-800">{lead.cnpj || "Não informado"}</p>
                        {lead.cnpj && (
                          <button 
                            onClick={() => copyToClipboard(lead.cnpj!, 'CNPJ')}
                            className="text-gray-400 hover:text-gray-600 ml-1"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">CNAE</p>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-800">{formatCnae(lead.cnae) || "Não informado"}</p>
                        <button 
                          onClick={() => setShowCnaeInfo(true)}
                          className="text-blue-500 hover:text-blue-700 ml-1"
                        >
                          <Info className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Natureza Jurídica</p>
                      <p className="text-sm text-gray-800">{lead._secure_natureza_juridica || "Não informado"}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Situação Cadastral</p>
                      <p className="text-sm text-gray-800">{lead._secure_situacao_cadastral || "Não informado"}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Data de Abertura</p>
                      <p className="text-sm text-gray-800">{lead.dataAbertura || "Não informado"}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Capital Social</p>
                      <p className="text-sm text-gray-800">{lead.capitalSocial || "Não informado"}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Número de Funcionários</p>
                      <p className="text-sm text-gray-800">{lead.employeeCount || "Não informado"}</p>
                    </div>
                  </div>
                </div>
                
                {/* Endereço Completo */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-green-600" />
                    Localização
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Endereço Completo</p>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-800">{lead.fullAddress || "Não informado"}</p>
                        {lead.fullAddress && (
                          <button 
                            onClick={() => copyToClipboard(lead.fullAddress!, 'Endereço')}
                            className="text-gray-400 hover:text-gray-600 ml-1"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Logradouro</p>
                      <p className="text-sm text-gray-800">{lead.logradouro || "Não informado"}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Número</p>
                      <p className="text-sm text-gray-800">{lead.numero || "S/N"}</p>
                    </div>
                    
                    {lead.complemento && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Complemento</p>
                        <p className="text-sm text-gray-800">{lead.complemento}</p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Bairro</p>
                      <p className="text-sm text-gray-800">{lead.bairro || "Não informado"}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">CEP</p>
                      <p className="text-sm text-gray-800">{lead.cep || "Não informado"}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Cidade/Estado</p>
                      <p className="text-sm text-gray-800">{lead.location || "Não informado"}</p>
                    </div>
                  </div>
                </div>
                
                {/* Informações de Contato */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-1 text-purple-600" />
                    Contato Principal
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Nome</p>
                      <p className="text-sm text-gray-800">{lead.nomeFantasia || lead.companyName}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Telefone Principal</p>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-800">{lead.contactPhone || "Não informado"}</p>
                        {lead.contactPhone && (
                          <div className="flex space-x-1 ml-2">
                            <button 
                              onClick={() => copyToClipboard(lead.contactPhone!, 'Telefone')}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            <button 
                              onClick={() => openWhatsApp(lead.contactPhone!)}
                              className="text-green-500 hover:text-green-700"
                            >
                              <Send className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">E-mail</p>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-800">{lead.contactEmail || "Não informado"}</p>
                        {lead.contactEmail && (
                          <div className="flex space-x-1 ml-2">
                            <button 
                              onClick={() => copyToClipboard(lead.contactEmail!, 'Email')}
                              className="text-gray-500 hover:text-blue-700"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            <button 
                              onClick={() => sendEmail(lead.contactEmail!)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Send className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Insights de IA */}
                {lead.aiInsights && (
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-2 border-blue-300">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Sparkles className="h-4 w-4 mr-1 text-blue-600" />
                      Insights de IA
                    </h4>
                    <p className="text-sm text-blue-700">{lead.aiInsights}</p>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button 
                  onClick={() => {
                    if (lead.contactPhone) {
                      openWhatsApp(lead.contactPhone);
                    } else {
                      toast.error("Número de telefone não disponível");
                    }
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  Enviar no WhatsApp
                </Button>
                <Button 
                  onClick={() => setShowCompanyDetails(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Função auxiliar para determinar necessidades do segmento baseado no CNAE
const getSegmentNeeds = (cnae: string): string => {
  const cnaePrefix = cnae.substring(0, 2);
  
  // Mapeamento de algumas categorias comuns
  const needsMap: {[key: string]: string} = {
    '62': 'infraestrutura de TI, marketing digital e automação',
    '69': 'sistemas de gestão, segurança de dados e comunicação',
    '86': 'sistemas de agendamento, gestão de pacientes e marketing',
    '56': 'delivery, presença online e sistemas de pedidos',
    '47': 'e-commerce, gestão de estoque e marketing digital',
    '85': 'plataformas de ensino, gestão escolar e comunicação',
    '43': 'orçamentos, gestão de projetos e captação de clientes'
  };
  
  return needsMap[cnaePrefix] || 'gestão empresarial, marketing e presença digital';
};

// Função para determinar CNAEs de alto potencial
const isHighPotentialCnae = (cnae: string): boolean => {
  // CNAEs considerados de alto potencial (exemplo)
  const highPotentialPrefixes = ['62', '69', '70', '86', '71', '73'];
  const cnaePrefix = cnae.substring(0, 2);
  
  return highPotentialPrefixes.includes(cnaePrefix);
};

export default LeadCard; 