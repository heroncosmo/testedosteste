import { supabase } from './supabase';

export interface EmpresaProcessada {
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
}

function processEmpresa(empresa: any): EmpresaProcessada {
  const companyName = empresa.nome_fantasia || empresa.razao_social || 'Empresa';
  const avatar = companyName.split(' ').map((word: string) => word[0]).join('').toUpperCase().slice(0, 2);
  
  // Determinar segmento baseado no CNAE
  let segment = 'outros';
  const cnaeDesc = empresa.cnae_descricao?.toLowerCase() || '';
  if (cnaeDesc.includes('tecnologia') || cnaeDesc.includes('software') || cnaeDesc.includes('informática')) {
    segment = 'tech';
  } else if (cnaeDesc.includes('restaurante') || cnaeDesc.includes('alimentação')) {
    segment = 'restaurantes';
  } else if (cnaeDesc.includes('saúde') || cnaeDesc.includes('médica') || cnaeDesc.includes('clínica')) {
    segment = 'clinicas';
  }

  // Determinar tamanho da empresa baseado no porte
  let employeeCount = 'Não informado';
  const porte = empresa.porte;
  if (porte === 1) employeeCount = '1-9 funcionários';
  else if (porte === 3) employeeCount = '10-49 funcionários';
  else if (porte === 5) employeeCount = '50-99 funcionários';
  else if (porte === 6) employeeCount = '100+ funcionários';

  const location = `${empresa.municipio || 'N/A'}, ${empresa.uf || 'N/A'}`;
  
  return {
    cnpjBasico: empresa.cnpj_basico,
    companyName,
    description: empresa.cnae_descricao || 'Atividade empresarial',
    location,
    employeeCount,
    segment,
    contactName: 'Contato Principal',
    contactEmail: empresa.email || null,
    contactPhone: empresa.telefone_1 || empresa.telefone_2 || null,
    contactRole: 'Responsável',
    matchPercentage: Math.floor(Math.random() * 20) + 80, // 80-99%
    isUnlocked: false,
    isPremium: Math.random() > 0.7,
    isHot: Math.random() > 0.6,
    aiInsights: `Empresa ativa desde ${empresa.data_inicio_atividade || 'N/A'} • ${empresa.situacao_cadastral || 'Situação regular'} • Potencial de conversão baseado no segmento`,
    tags: [segment, empresa.uf?.toLowerCase() || 'brasil'],
    avatar
  };
}

export async function buscarEmpresas(limit = 50, offset = 0) {
  try {
    const { data, error } = await supabase
      .from('empresas')
      .select('*')
      .not('razao_social', 'is', null)
      .not('municipio', 'is', null)
      .eq('codigo_situacao_cadastral', 2) // Apenas empresas ativas
      .limit(limit)
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Erro ao buscar empresas:', error);
      return [];
    }

    return data.map(processEmpresa);
  } catch (error) {
    console.error('Erro na conexão com Supabase:', error);
    return [];
  }
}

export async function buscarEmpresasPorSegmento(segment: string, limit = 50) {
  try {
    let query = supabase
      .from('empresas')
      .select('*')
      .not('razao_social', 'is', null)
      .not('municipio', 'is', null)
      .eq('codigo_situacao_cadastral', 2)
      .limit(limit);

    // Filtros avançados por segmento baseado no CNAE
    const segmentFilters = {
      'tech': 'cnae_descricao.ilike.%tecnologia%,cnae_descricao.ilike.%software%,cnae_descricao.ilike.%informática%,cnae_descricao.ilike.%desenvolvimento%,cnae_descricao.ilike.%programação%',
      'saude': 'cnae_descricao.ilike.%saúde%,cnae_descricao.ilike.%médica%,cnae_descricao.ilike.%clínica%,cnae_descricao.ilike.%hospital%,cnae_descricao.ilike.%odontológica%',
      'alimentacao': 'cnae_descricao.ilike.%restaurante%,cnae_descricao.ilike.%alimentação%,cnae_descricao.ilike.%lanchonete%,cnae_descricao.ilike.%padaria%,cnae_descricao.ilike.%bar%',
      'educacao': 'cnae_descricao.ilike.%educação%,cnae_descricao.ilike.%ensino%,cnae_descricao.ilike.%escola%,cnae_descricao.ilike.%curso%,cnae_descricao.ilike.%treinamento%',
      'construcao': 'cnae_descricao.ilike.%construção%,cnae_descricao.ilike.%obras%,cnae_descricao.ilike.%engenharia%,cnae_descricao.ilike.%arquitetura%,cnae_descricao.ilike.%edificação%',
      'servicos': 'cnae_descricao.ilike.%serviços%,cnae_descricao.ilike.%consultoria%,cnae_descricao.ilike.%assessoria%,cnae_descricao.ilike.%manutenção%,cnae_descricao.ilike.%limpeza%',
      'comercio': 'cnae_descricao.ilike.%comércio%,cnae_descricao.ilike.%varejo%,cnae_descricao.ilike.%loja%,cnae_descricao.ilike.%venda%,cnae_descricao.ilike.%distribuidora%',
      'industria': 'cnae_descricao.ilike.%indústria%,cnae_descricao.ilike.%fabricação%,cnae_descricao.ilike.%manufatura%,cnae_descricao.ilike.%produção%,cnae_descricao.ilike.%metalúrgica%',
      'financeiro': 'cnae_descricao.ilike.%financeiro%,cnae_descricao.ilike.%banco%,cnae_descricao.ilike.%crédito%,cnae_descricao.ilike.%seguro%,cnae_descricao.ilike.%investimento%',
      'transporte': 'cnae_descricao.ilike.%transporte%,cnae_descricao.ilike.%logística%,cnae_descricao.ilike.%frete%,cnae_descricao.ilike.%entrega%,cnae_descricao.ilike.%táxi%',
      'imobiliario': 'cnae_descricao.ilike.%imobiliário%,cnae_descricao.ilike.%imóveis%,cnae_descricao.ilike.%corretor%,cnae_descricao.ilike.%incorporação%,cnae_descricao.ilike.%aluguel%'
    };

    if (segmentFilters[segment as keyof typeof segmentFilters]) {
      query = query.or(segmentFilters[segment as keyof typeof segmentFilters]);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar empresas por segmento:', error);
      return [];
    }

    return data.map(processEmpresa);
  } catch (error) {
    console.error('Erro na busca por segmento:', error);
    return [];
  }
}

export async function pesquisarEmpresas(query: string, limit = 50) {
  try {
    const { data, error } = await supabase
      .from('empresas')
      .select('*')
      .or(`razao_social.ilike.%${query}%,nome_fantasia.ilike.%${query}%,cnae_descricao.ilike.%${query}%`)
      .not('razao_social', 'is', null)
      .eq('codigo_situacao_cadastral', 2)
      .limit(limit);

    if (error) {
      console.error('Erro ao pesquisar empresas:', error);
      return [];
    }

    return data.map(processEmpresa);
  } catch (error) {
    console.error('Erro na pesquisa:', error);
    return [];
  }
}

export async function buscarSugestoes(query: string) {
  try {
    const { data, error } = await supabase
      .from('empresas')
      .select('cnae_descricao')
      .ilike('cnae_descricao', `%${query}%`)
      .not('cnae_descricao', 'is', null)
      .eq('codigo_situacao_cadastral', 2)
      .limit(20);

    if (error) {
      console.error('Erro ao buscar sugestões:', error);
      return [];
    }

    // Extrair sugestões únicas de CNAEs
    const sugestoes = new Set<string>();
    data.forEach(empresa => {
      if (empresa.cnae_descricao) {
        // Adicionar CNAE completo
        sugestoes.add(empresa.cnae_descricao);
        
        // Adicionar palavras-chave do CNAE
        const palavras = empresa.cnae_descricao
          .toLowerCase()
          .split(/[,\-\s]+/)
          .filter(palavra => 
            palavra.length > 3 && 
            palavra.includes(query.toLowerCase()) &&
            !['ltda', 'eireli', 'mei', 'empresa'].includes(palavra)
          );
        
        palavras.forEach(palavra => {
          if (palavra.length > 4) {
            sugestoes.add(palavra.charAt(0).toUpperCase() + palavra.slice(1));
          }
        });
      }
    });

    return Array.from(sugestoes).slice(0, 8);
  } catch (error) {
    console.error('Erro ao buscar sugestões:', error);
    return [];
  }
}