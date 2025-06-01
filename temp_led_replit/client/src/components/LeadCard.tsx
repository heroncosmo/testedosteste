import { LeadWithInteraction } from "@/hooks/useLeads";

interface LeadCardProps {
  lead: LeadWithInteraction;
  isSelected: boolean;
  onToggleSelection: (leadId: number) => void;
  onUnlock: (leadId: number) => void;
  onToggleFavorite: (leadId: number) => void;
  onSendWhatsApp: (leadId: number) => void;
  onSendEmail: (leadId: number) => void;
  onOpenChat: (leadId: number) => void;
}

export default function LeadCard({
  lead,
  isSelected,
  onToggleSelection,
  onUnlock,
  onToggleFavorite,
  onSendWhatsApp,
  onSendEmail,
  onOpenChat
}: LeadCardProps) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 95) return "bg-whatsapp";
    if (percentage >= 90) return "bg-conversion";
    return "bg-emerald-500";
  };

  const getAvatarGradient = (avatar: string) => {
    const gradients = {
      "TS": "from-blue-500 to-blue-600",
      "TP": "from-orange-500 to-red-500", 
      "RB": "from-green-500 to-emerald-600",
      "MC": "from-purple-500 to-pink-500",
      "SF": "from-indigo-500 to-purple-600"
    };
    return gradients[avatar as keyof typeof gradients] || "from-gray-500 to-gray-600";
  };

  return (
    <div className={`bg-white border-b border-gray-50 p-4 relative hover:bg-gray-25 transition-colors lead-card ${isSelected ? 'selected' : ''}`}>
      <div className="flex items-start space-x-3">
        {/* Checkbox and Avatar */}
        <div className="relative">
          <input 
            type="checkbox" 
            className="absolute top-0 left-0 w-5 h-5 opacity-0 z-10 cursor-pointer selection-checkbox"
            checked={isSelected}
            onChange={() => onToggleSelection(lead.id)}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={`w-12 h-12 bg-gradient-to-br ${getAvatarGradient(lead.avatar)} rounded-xl flex items-center justify-center font-bold text-lg text-white selection-overlay`}>
            {lead.avatar}
          </div>
          {/* Premium/Hot badge */}
          {lead.isPremium && (
            <div className="absolute -top-1 -right-1 bg-warning text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
              PRO
            </div>
          )}
          {lead.isHot && !lead.isPremium && (
            <div className="absolute -top-1 -right-1 bg-conversion text-white text-xs px-1.5 py-0.5 rounded-full font-bold animate-pulse">
              🔥
            </div>
          )}
        </div>
        
        {/* Lead Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-900">
                {lead.isUserUnlocked || lead.isUnlocked ? lead.companyName : `${lead.companyName.split(' ')[0]} ${'•'.repeat(lead.companyName.length - lead.companyName.split(' ')[0].length)}`}
              </h3>
              <p className="text-sm text-gray-600">{lead.description}</p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <i className="fas fa-map-marker-alt mr-1"></i>
                <span>{lead.location}</span>
                <span className="mx-2">•</span>
                <span>{lead.employeeCount}</span>
              </div>
            </div>
            {/* Match percentage */}
            <div className="flex flex-col items-end">
              <div className={`${getMatchColor(lead.matchPercentage)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                {lead.matchPercentage}% Match
              </div>
              <button 
                onClick={() => onToggleFavorite(lead.id)}
                className="mt-2 text-gray-400 hover:text-warning transition-colors"
              >
                <i className={`${lead.isFavorited ? 'fas text-warning' : 'far'} fa-star`}></i>
              </button>
            </div>
          </div>
          
          {/* AI Insights */}
          {lead.aiInsights && (
            <div className={`${lead.isPremium ? 'bg-blue-50 border-blue-200 text-blue-700' : lead.isHot ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-purple-50 border-purple-200 text-purple-700'} border rounded-lg p-3 mb-3`}>
              <div className="flex items-center text-xs mb-1">
                <i className={`${lead.isPremium ? 'fas fa-brain' : lead.isHot ? 'fas fa-exclamation-triangle' : 'fas fa-star'} mr-1`}></i>
                <span className="font-medium">
                  {lead.isPremium ? 'IA Insights' : lead.isHot ? 'Alta demanda' : 'Potencial Premium'}
                </span>
              </div>
              <p className="text-xs">
                {lead.aiInsights}
              </p>
            </div>
          )}
          
          {/* Contact info */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center text-sm">
              <i className="fas fa-user-tie text-gray-400 w-4"></i>
              <span className="ml-2 text-gray-700">
                {lead.isUserUnlocked || lead.isUnlocked ? lead.contactName : `${lead.contactName.split(' ')[0]} ${'•'.repeat(6)}`}
              </span>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                lead.contactRole === 'Executivo' ? 'bg-green-100 text-green-800' :
                lead.contactRole === 'Manager' ? 'bg-gray-100 text-gray-600' :
                lead.contactRole === 'Proprietário' ? 'bg-blue-100 text-blue-800' :
                lead.contactRole === 'Diretora' ? 'bg-purple-100 text-purple-800' :
                'bg-indigo-100 text-indigo-800'
              }`}>
                {lead.contactRole}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <i className="fas fa-envelope text-gray-400 w-4"></i>
              <span className={`ml-2 text-gray-700 ${!(lead.isUserUnlocked || lead.isUnlocked) ? 'blur-text' : ''}`}>
                {(lead.isUserUnlocked || lead.isUnlocked) && lead.contactEmail ? lead.contactEmail : 'carlos@••••••••.com'}
              </span>
              {(lead.isUserUnlocked || lead.isUnlocked) && lead.contactEmail ? (
                <button className="ml-auto text-action-blue hover:text-action-blue-dark">
                  <i className="fas fa-external-link-alt"></i>
                </button>
              ) : (
                <i className="fas fa-lock ml-auto text-gray-400"></i>
              )}
            </div>
            <div className="flex items-center text-sm">
              <i className="fab fa-whatsapp text-whatsapp w-4"></i>
              <span className={`ml-2 text-gray-700 ${!(lead.isUserUnlocked || lead.isUnlocked) ? 'blur-text' : ''}`}>
                {(lead.isUserUnlocked || lead.isUnlocked) && lead.contactPhone ? lead.contactPhone : '(11) 9••••-••••'}
              </span>
              {(lead.isUserUnlocked || lead.isUnlocked) && lead.contactPhone ? (
                <button className="ml-auto text-whatsapp hover:text-whatsapp-dark">
                  <i className="fas fa-external-link-alt"></i>
                </button>
              ) : (
                <i className="fas fa-lock ml-auto text-gray-400"></i>
              )}
            </div>
          </div>
          
          {/* Lead Status Banner */}
          {lead.isUserUnlocked || lead.isUnlocked ? (
            <div className="bg-gradient-to-r from-success to-emerald-600 text-white p-3 rounded-lg mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-check-circle mr-2"></i>
                    <span className="font-bold text-sm">Lead Desbloqueado!</span>
                  </div>
                  <p className="text-xs opacity-90">Contato disponível para uso</p>
                </div>
              </div>
            </div>
          ) : lead.isPremium ? (
            <div className="bg-gradient-to-r from-warning to-conversion text-white p-3 rounded-lg mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-crown mr-2"></i>
                    <span className="font-bold text-sm">Lead Premium</span>
                  </div>
                  <p className="text-xs opacity-90">Contato executivo + dados completos</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-conversion to-conversion-dark text-white p-3 rounded-lg mb-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full transform translate-x-6 -translate-y-6"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center mb-1">
                      <i className="fas fa-unlock mr-2"></i>
                      <span className="font-bold text-sm">Desbloquear para ver contatos</span>
                    </div>
                    <p className="text-xs opacity-90">Contato executivo + dados completos</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Buttons */}
      {lead.isUserUnlocked || lead.isUnlocked ? (
        <div className="flex space-x-2 mt-3">
          <button 
            onClick={() => onSendWhatsApp(lead.id)}
            className="flex-1 bg-whatsapp text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center space-x-2 hover:bg-whatsapp-dark transition-colors"
          >
            <i className="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
          </button>
          <button 
            onClick={() => onSendEmail(lead.id)}
            className="flex-1 bg-action-blue text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center space-x-2 hover:bg-action-blue-dark transition-colors"
          >
            <i className="fas fa-envelope"></i>
            <span>Email</span>
          </button>
          <button 
            onClick={() => onOpenChat(lead.id)}
            className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <i className="fas fa-comment"></i>
          </button>
        </div>
      ) : (
        <button 
          onClick={() => onUnlock(lead.id)}
          className="w-full bg-conversion hover:bg-conversion-dark text-white py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center space-x-2 transition-colors"
        >
          <i className="fas fa-unlock"></i>
          <span>Desbloquear por 1 Crédito</span>
        </button>
      )}
    </div>
  );
}
