import { useQuery } from '@tanstack/react-query';

export interface EmpresaWithInteraction {
  cnpjBasico: string;
  companyName: string;
  description: string;
  location: string;
  employeeCount: string;
  segment: string;
  contactName: string;
  contactEmail: string | null;
  contactPhone: string | null;
  contactRole: string;
  matchPercentage: number;
  isUnlocked: boolean;
  isPremium: boolean;
  isHot: boolean;
  aiInsights: string;
  tags: string[];
  avatar: string;
  isUserUnlocked?: boolean;
  isFavorited?: boolean;
}

export interface LeadWithInteraction extends EmpresaWithInteraction {
  id: number;
}

export const useEmpresas = (segment?: string, search?: string) => {
  return useQuery({
    queryKey: ['/api/empresas', { segment, search }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (segment && segment !== 'all') params.append('segment', segment);
      if (search) params.append('search', search);
      
      const response = await fetch(`/api/empresas?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch empresas');
      }
      const empresas: EmpresaWithInteraction[] = await response.json();
      
      return empresas.map((empresa, index) => ({
        ...empresa,
        id: index + 1,
        isUserUnlocked: empresa.isUnlocked,
        isFavorited: false
      }));
    },
  });
};

export const useLeads = () => {
  return useEmpresas();
};