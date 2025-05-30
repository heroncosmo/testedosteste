import { useState, useEffect, useRef, useCallback } from "react";
import { useLeads } from "@/hooks/useLeads";
import { useSelection } from "@/hooks/useSelection";
import WelcomeNotification from "@/components/WelcomeNotification";
import TopStatusBar from "@/components/TopStatusBar";
import SearchAndFilters from "@/components/SearchAndFilters";
import BulkSelectionBar from "@/components/BulkSelectionBar";
import LeadCard from "@/components/LeadCard";
import BottomNavigation from "@/components/BottomNavigation";
import UnlockModal from "@/components/UnlockModal";
import BulkMessageModal from "@/components/BulkMessageModal";
import SendingProgressModal from "@/components/SendingProgressModal";
import SuccessModal from "@/components/SuccessModal";
import AuthModal from "@/components/AuthModal";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("quentes");
  
  const { data: leads = [], isLoading } = useLeads();
  
  // Filter leads based on search and active filter
  const filteredLeads = (leads || []).filter(lead => {
    const matchesSearch = !searchQuery || 
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.segment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === "quentes" ? lead.isHot : 
                         activeFilter === "all" ? true : 
                         lead.segment === activeFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  const unlockLead = (leadId: number) => {
    // TODO: Implement unlock functionality with API
    console.log('Unlocking lead:', leadId);
  };
  
  const toggleFavorite = (leadId: number) => {
    // TODO: Implement favorite functionality with API
    console.log('Toggling favorite:', leadId);
  };

  const {
    selectedLeads,
    selectedCount,
    toggleSelection,
    clearSelection,
    isSelected
  } = useSelection();

  const [activeTab, setActiveTab] = useState("feed");
  const [creditsRemaining, setCreditsRemaining] = useState(7);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showBulkMessageModal, setShowBulkMessageModal] = useState(false);
  const [showSendingModal, setShowSendingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [leadToUnlock, setLeadToUnlock] = useState<number | null>(null);

  const handleUnlockLead = (leadId: number) => {
    if (creditsRemaining <= 0) {
      alert("Sem créditos suficientes. Faça upgrade do seu plano!");
      return;
    }
    setLeadToUnlock(leadId);
    setShowUnlockModal(true);
  };

  const confirmUnlock = () => {
    if (leadToUnlock) {
      unlockLead(leadToUnlock);
      setCreditsRemaining(prev => prev - 1);
      setShowUnlockModal(false);
      setLeadToUnlock(null);
      // Show toast notification here
    }
  };

  const handleBulkMessage = () => {
    if (selectedCount === 0) {
      alert("Selecione pelo menos um lead");
      return;
    }
    setShowBulkMessageModal(true);
  };

  const handleSendBulkMessage = (message: string) => {
    setShowBulkMessageModal(false);
    setShowSendingModal(true);
  };

  const handleSendingComplete = () => {
    setShowSendingModal(false);
    setShowSuccessModal(true);
    clearSelection();
  };

  const handleSendWhatsApp = (leadId: number) => {
    // Simulate WhatsApp send
    alert(`Abrindo WhatsApp para lead ${leadId}...`);
  };

  const handleSendEmail = (leadId: number) => {
    // Simulate email send
    alert(`Abrindo email para lead ${leadId}...`);
  };

  const handleOpenChat = (leadId: number) => {
    // Simulate chat opening
    alert(`Abrindo conversa para lead ${leadId}...`);
  };

  const selectedLeadNames = filteredLeads
    .filter(lead => selectedLeads.includes(lead.id))
    .map(lead => lead.companyName);

  const selectedLeadsData = filteredLeads.filter(lead => selectedLeads.includes(lead.id));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-whatsapp/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-rocket text-whatsapp text-2xl animate-bounce-gentle"></i>
          </div>
          <p className="text-gray-600">Carregando oportunidades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative">
      <WelcomeNotification />
      
      <TopStatusBar 
        creditsRemaining={creditsRemaining}
        totalCredits={10}
        notificationCount={3}
      />
      
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      <BulkSelectionBar
        selectedCount={selectedCount}
        onClearSelection={clearSelection}
        onBulkMessage={handleBulkMessage}
        onBulkFavorite={() => {
          selectedLeads.forEach(leadId => toggleFavorite(leadId));
          clearSelection();
        }}
      />
      
      {/* Main Feed */}
      <div className="flex-1 overflow-y-auto pb-20">
        {filteredLeads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <i className="fas fa-search text-4xl mb-4"></i>
            <p>Nenhuma empresa encontrada</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              isSelected={isSelected(lead.id)}
              onToggleSelection={toggleSelection}
              onUnlock={handleUnlockLead}
              onToggleFavorite={toggleFavorite}
              onSendWhatsApp={handleSendWhatsApp}
              onSendEmail={handleSendEmail}
              onOpenChat={handleOpenChat}
            />
          ))
        )}
        
        {/* Load More Indicator */}
        {leads.length > 0 && (
          <div className="p-4 text-center">
            <button className="text-whatsapp font-medium text-sm hover:text-whatsapp-dark transition-colors">
              Carregar mais oportunidades
              <i className="fas fa-chevron-down ml-2"></i>
            </button>
          </div>
        )}
      </div>
      
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {/* Modals */}
      <UnlockModal
        isOpen={showUnlockModal}
        onClose={() => setShowUnlockModal(false)}
        onConfirm={confirmUnlock}
        creditsRemaining={creditsRemaining}
      />
      
      <BulkMessageModal
        isOpen={showBulkMessageModal}
        onClose={() => setShowBulkMessageModal(false)}
        onSend={handleSendBulkMessage}
        selectedLeads={selectedLeadsData}
      />
      
      <SendingProgressModal
        isOpen={showSendingModal}
        selectedLeads={selectedLeadNames}
        onComplete={handleSendingComplete}
      />
      
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        messageCount={selectedCount}
      />
    </div>
  );
}
