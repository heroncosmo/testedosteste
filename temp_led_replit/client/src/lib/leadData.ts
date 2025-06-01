import { Lead } from "@shared/schema";

export const mockLeads: Omit<Lead, 'id' | 'createdAt'>[] = [
  {
    companyName: "TechSolutions LTDA",
    description: "Desenvolvimento de Software",
    location: "São Paulo, SP",
    employeeCount: "50-100 funcionários",
    segment: "tech",
    contactName: "Carlos Mendez",
    contactEmail: "carlos@techsolutions.com",
    contactPhone: "(11) 99876-5432",
    contactRole: "Executivo",
    matchPercentage: 95,
    isUnlocked: true,
    isPremium: true,
    isHot: true,
    aiInsights: "Alta probabilidade de conversão • Melhor horário: 14h-16h • Segmento em crescimento +23%",
    tags: ["tech", "software", "premium"],
    avatar: "TS"
  },
  {
    companyName: "Tech Pro Solutions",
    description: "Consultoria em TI • Enterprise",
    location: "Faria Lima, SP",
    employeeCount: "200+ funcionários",
    segment: "tech",
    contactName: "Carlos Silva",
    contactEmail: null,
    contactPhone: null,
    contactRole: "Manager",
    matchPercentage: 98,
    isUnlocked: false,
    isPremium: false,
    isHot: true,
    aiInsights: "Potencial de R$ 100k+ em vendas • Decisor direto • Histórico de investimento em soluções",
    tags: ["tech", "consultoria", "enterprise"],
    avatar: "TP"
  },
  {
    companyName: "Restaurante Bella Vista",
    description: "Gastronomia • Delivery Premium",
    location: "Moema, SP",
    employeeCount: "25 funcionários",
    segment: "restaurantes",
    contactName: "Roberto Silva",
    contactEmail: null,
    contactPhone: null,
    contactRole: "Proprietário",
    matchPercentage: 88,
    isUnlocked: false,
    isPremium: false,
    isHot: false,
    aiInsights: "12 usuários visualizaram nas últimas 24h. 87% de taxa de resposta neste segmento.",
    tags: ["restaurante", "delivery", "gastronomia"],
    avatar: "RB"
  },
  {
    companyName: "Clínica MedCenter",
    description: "Saúde • Medicina Geral",
    location: "Vila Madalena, SP",
    employeeCount: "40 funcionários",
    segment: "clinicas",
    contactName: "Dra. Maria Santos",
    contactEmail: null,
    contactPhone: null,
    contactRole: "Diretora",
    matchPercentage: 92,
    isUnlocked: false,
    isPremium: false,
    isHot: true,
    aiInsights: "Expansão planejada para 2024 • Alto investimento em tecnologia • Decisor rápido",
    tags: ["saude", "clinica", "medicina"],
    avatar: "MC"
  },
  {
    companyName: "StartupFlow Inc",
    description: "Fintech • Pagamentos Digitais",
    location: "Pinheiros, SP",
    employeeCount: "15-30 funcionários",
    segment: "tech",
    contactName: "João Pedro",
    contactEmail: null,
    contactPhone: null,
    contactRole: "CTO",
    matchPercentage: 94,
    isUnlocked: false,
    isPremium: true,
    isHot: true,
    aiInsights: "Startup em crescimento acelerado • Necessidade urgente de automação • Budget aprovado",
    tags: ["fintech", "startup", "pagamentos"],
    avatar: "SF"
  }
];

export const getLeadsBySegment = (segment: string) => {
  return mockLeads.filter(lead => lead.segment === segment);
};

export const getHotLeads = () => {
  return mockLeads.filter(lead => lead.isHot);
};

export const searchLeads = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return mockLeads.filter(lead => 
    lead.companyName.toLowerCase().includes(lowercaseQuery) ||
    lead.description.toLowerCase().includes(lowercaseQuery) ||
    lead.segment.toLowerCase().includes(lowercaseQuery) ||
    lead.contactName.toLowerCase().includes(lowercaseQuery)
  );
};
