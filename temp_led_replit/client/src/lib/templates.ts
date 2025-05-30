export interface MessageTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  segment?: string;
}

export const messageTemplates: MessageTemplate[] = [
  {
    id: "business",
    name: "Negócios Gerais",
    description: "Olá! Vi que vocês trabalham com...",
    content: "Olá {NOME}! Vi que vocês trabalham com {SEGMENTO}. Tenho uma solução que pode ajudar a aumentar a eficiência e resultados da {EMPRESA}. Posso apresentar uma proposta personalizada?",
  },
  {
    id: "tech",
    name: "Empresas de TI",
    description: "Oi! Sou especialista em soluções tech...",
    content: "Oi {NOME}! Sou especialista em soluções tecnológicas para empresas como a {EMPRESA}. Trabalho com automação de processos que podem otimizar significativamente as operações da área de {SEGMENTO}. Que tal conversarmos?",
    segment: "tech"
  },
  {
    id: "restaurant",
    name: "Restaurantes",
    description: "Olá! Ajudo restaurantes a aumentar delivery...",
    content: "Olá {NOME}! Ajudo restaurantes como o {EMPRESA} a aumentar as vendas através de marketing digital e otimização de delivery. Posso apresentar estratégias específicas para o segmento de {SEGMENTO}?",
    segment: "restaurantes"
  },
  {
    id: "clinicas",
    name: "Clínicas Médicas",
    description: "Oi! Especialista em marketing para clínicas...",
    content: "Oi {NOME}! Sou especialista em marketing digital para clínicas como a {EMPRESA}. Posso ajudar a aumentar agendamentos e melhorar a presença digital na área de {SEGMENTO}. Vamos conversar?",
    segment: "clinicas"
  }
];

export const replaceTemplateVariables = (template: string, lead: any): string => {
  return template
    .replace(/{NOME}/g, lead.contactName || "")
    .replace(/{EMPRESA}/g, lead.companyName || "")
    .replace(/{SEGMENTO}/g, lead.description || lead.segment || "");
};

export const getTemplateBySegment = (segment: string): MessageTemplate | undefined => {
  return messageTemplates.find(template => template.segment === segment) || messageTemplates[0];
};
