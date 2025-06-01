interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  creditsRemaining: number;
}

export default function UnlockModal({
  isOpen,
  onClose,
  onConfirm,
  creditsRemaining
}: UnlockModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-slide-up">
        <div className="text-center">
          <div className="w-16 h-16 bg-conversion/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-unlock text-conversion text-2xl"></i>
          </div>
          <h3 className="font-bold text-lg mb-2">Desbloquear Contato</h3>
          <p className="text-gray-600 text-sm mb-4">
            Você está prestes a usar 1 crédito para acessar as informações completas deste lead.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <div className="flex justify-between text-sm">
              <span>Créditos restantes:</span>
              <span className="font-bold text-whatsapp">{creditsRemaining}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Após desbloqueio:</span>
              <span className="font-bold text-conversion">{creditsRemaining - 1}</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 bg-conversion text-white py-3 rounded-lg font-bold hover:bg-conversion-dark transition-colors"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
