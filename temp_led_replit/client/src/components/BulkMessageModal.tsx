import { useState } from "react";
import { messageTemplates, replaceTemplateVariables } from "@/lib/templates";
import { LeadWithInteraction } from "@/hooks/useLeads";

interface BulkMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  selectedLeads: LeadWithInteraction[];
}

export default function BulkMessageModal({
  isOpen,
  onClose,
  onSend,
  selectedLeads
}: BulkMessageModalProps) {
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  if (!isOpen) return null;

  const handleSelectTemplate = (templateId: string) => {
    const template = messageTemplates.find(t => t.id === templateId);
    if (template) {
      setMessage(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const insertVariable = (variable: string) => {
    const textarea = document.getElementById('bulkMessageText') as HTMLTextAreaElement;
    if (textarea) {
      const cursorPos = textarea.selectionStart;
      const textBefore = message.substring(0, cursorPos);
      const textAfter = message.substring(cursorPos);
      
      setMessage(textBefore + variable + textAfter);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(cursorPos + variable.length, cursorPos + variable.length);
      }, 0);
    }
  };

  const handleSend = () => {
    if (!message.trim()) {
      alert("Digite uma mensagem");
      return;
    }
    onSend(message);
    setMessage("");
    setSelectedTemplate("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-w-md h-3/4 animate-slide-up">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
            <div>
              <h3 className="font-bold text-lg">Enviar WhatsApp</h3>
              <p className="text-sm text-gray-500">{selectedLeads.length} contatos selecionados</p>
            </div>
          </div>
          <button 
            onClick={handleSend}
            className="bg-whatsapp text-white px-4 py-2 rounded-lg font-medium hover:bg-whatsapp-dark transition-colors"
          >
            Enviar
          </button>
        </div>
        
        {/* Selected Contacts Preview */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2 mb-2">
            <i className="fas fa-users text-gray-500"></i>
            <span className="text-sm font-medium text-gray-700">Contatos selecionados:</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {selectedLeads.slice(0, 3).map((lead, index) => (
              <div key={index} className="flex-shrink-0 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {lead.companyName}
              </div>
            ))}
            {selectedLeads.length > 3 && (
              <div className="flex-shrink-0 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                +{selectedLeads.length - 3} mais
              </div>
            )}
          </div>
        </div>
        
        {/* Message Templates */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Templates:</span>
            <button className="text-whatsapp text-sm font-medium">+ Criar</button>
          </div>
          <div className="space-y-2">
            {messageTemplates.slice(0, 3).map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedTemplate === template.id 
                    ? 'bg-whatsapp/10 border border-whatsapp' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium text-sm">{template.name}</div>
                <div className="text-xs text-gray-600">{template.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Message Composition */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Sua mensagem:</label>
            <span className="text-xs text-gray-500">{message.length}/500</span>
          </div>
          <textarea
            id="bulkMessageText"
            placeholder="Digite sua mensagem personalizada..."
            className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-whatsapp/20 focus:border-whatsapp transition-colors text-sm"
            maxLength={500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          {/* Variables Helper */}
          <div className="mt-3">
            <div className="text-xs text-gray-500 mb-2">Variáveis disponíveis:</div>
            <div className="flex flex-wrap gap-2">
              {['{NOME}', '{EMPRESA}', '{SEGMENTO}'].map((variable) => (
                <button
                  key={variable}
                  onClick={() => insertVariable(variable)}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-200 transition-colors"
                >
                  {variable}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
