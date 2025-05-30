interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterOptions = [
  { id: "quentes", label: "Quentes", icon: "fas fa-fire", count: 247 },
  { id: "tech", label: "Tecnologia", icon: "fas fa-laptop-code", count: 1250 },
  { id: "saude", label: "Saúde", icon: "fas fa-stethoscope", count: 890 },
  { id: "alimentacao", label: "Alimentação", icon: "fas fa-utensils", count: 2340 },
  { id: "educacao", label: "Educação", icon: "fas fa-graduation-cap", count: 567 },
  { id: "construcao", label: "Construção", icon: "fas fa-hard-hat", count: 1890 },
  { id: "servicos", label: "Serviços", icon: "fas fa-tools", count: 3450 },
  { id: "comercio", label: "Comércio", icon: "fas fa-shopping-cart", count: 5670 },
  { id: "industria", label: "Indústria", icon: "fas fa-industry", count: 2100 },
  { id: "financeiro", label: "Financeiro", icon: "fas fa-dollar-sign", count: 450 },
  { id: "transporte", label: "Transporte", icon: "fas fa-truck", count: 1200 },
  { id: "imobiliario", label: "Imobiliário", icon: "fas fa-home", count: 890 }
];

export default function SearchAndFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange
}: SearchAndFiltersProps) {
  return (
    <div className="p-4 bg-white border-b border-gray-100">
      <div className="relative mb-3">
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <input 
          type="text" 
          placeholder="Buscar empresas, segmentos..." 
          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl border-0 focus:bg-white focus:ring-2 focus:ring-whatsapp/20 transition-all text-sm"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      {/* Functional filters */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-1 transition-colors ${
              activeFilter === filter.id
                ? "bg-whatsapp text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <i className={filter.icon}></i>
            <span>{filter.label}</span>
            {activeFilter === filter.id && (
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
