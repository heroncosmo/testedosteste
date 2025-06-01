interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageCount: number;
}

export default function SuccessModal({
  isOpen,
  onClose,
  messageCount
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-slide-up">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-success text-2xl"></i>
          </div>
          <h3 className="font-bold text-lg mb-2">Mensagens Enviadas!</h3>
          <p className="text-gray-600 text-sm mb-4">
            {messageCount} mensagens WhatsApp foram enviadas com sucesso. Você receberá notificações quando os contatos responderem.
          </p>
          
          {/* Stats */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="font-bold text-whatsapp">{messageCount}</div>
                <div className="text-xs text-gray-600">Enviadas</div>
              </div>
              <div>
                <div className="font-bold text-conversion">87%</div>
                <div className="text-xs text-gray-600">Taxa resp.</div>
              </div>
              <div>
                <div className="font-bold text-action-blue">2h</div>
                <div className="text-xs text-gray-600">Tempo médio</div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full bg-whatsapp text-white py-3 rounded-lg font-bold hover:bg-whatsapp-dark transition-colors"
          >
            Continuar Prospectando
          </button>
        </div>
      </div>
    </div>
  );
}
