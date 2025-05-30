interface BulkSelectionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkMessage: () => void;
  onBulkFavorite: () => void;
}

export default function BulkSelectionBar({
  selectedCount,
  onClearSelection,
  onBulkMessage,
  onBulkFavorite
}: BulkSelectionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-whatsapp text-white px-4 py-3 flex justify-between items-center animate-slide-up sticky top-32 z-30">
      <div className="flex items-center space-x-3">
        <button 
          onClick={onClearSelection}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>
        <span className="font-medium">{selectedCount} selecionados</span>
      </div>
      <div className="flex space-x-3">
        <button 
          onClick={onBulkMessage}
          className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
        >
          <i className="fab fa-whatsapp"></i>
          <span className="text-sm font-medium">Enviar WhatsApp</span>
        </button>
        <button 
          onClick={onBulkFavorite}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <i className="fas fa-star"></i>
        </button>
      </div>
    </div>
  );
}
