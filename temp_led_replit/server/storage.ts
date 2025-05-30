import { 
  users, 
  leads, 
  userLeadInteractions, 
  simulatedMessages,
  type User, 
  type InsertUser,
  type Lead,
  type InsertLead,
  type UserLeadInteraction,
  type InsertUserLeadInteraction,
  type SimulatedMessage,
  type InsertSimulatedMessage
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  
  getUserLeadInteraction(userId: number, leadId: number): Promise<UserLeadInteraction | undefined>;
  createUserLeadInteraction(interaction: InsertUserLeadInteraction): Promise<UserLeadInteraction>;
  updateUserLeadInteraction(userId: number, leadId: number, updates: Partial<UserLeadInteraction>): Promise<UserLeadInteraction | undefined>;
  
  createSimulatedMessage(message: InsertSimulatedMessage): Promise<SimulatedMessage>;
  getSimulatedMessages(userId: number): Promise<SimulatedMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private leads: Map<number, Lead>;
  private userLeadInteractions: Map<string, UserLeadInteraction>;
  private simulatedMessages: Map<number, SimulatedMessage>;
  private currentUserId: number;
  private currentLeadId: number;
  private currentInteractionId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.userLeadInteractions = new Map();
    this.simulatedMessages = new Map();
    this.currentUserId = 1;
    this.currentLeadId = 1;
    this.currentInteractionId = 1;
    this.currentMessageId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample leads
    const sampleLeads: Omit<Lead, 'id' | 'createdAt'>[] = [
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

    sampleLeads.forEach(lead => {
      const id = this.currentLeadId++;
      this.leads.set(id, {
        ...lead,
        id,
        createdAt: new Date()
      });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      creditsRemaining: 10,
      totalCredits: 10,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    const lead: Lead = { 
      ...insertLead, 
      id, 
      createdAt: new Date() 
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getUserLeadInteraction(userId: number, leadId: number): Promise<UserLeadInteraction | undefined> {
    return this.userLeadInteractions.get(`${userId}-${leadId}`);
  }

  async createUserLeadInteraction(insertInteraction: InsertUserLeadInteraction): Promise<UserLeadInteraction> {
    const id = this.currentInteractionId++;
    const interaction: UserLeadInteraction = {
      ...insertInteraction,
      id,
      lastInteraction: new Date()
    };
    this.userLeadInteractions.set(`${insertInteraction.userId}-${insertInteraction.leadId}`, interaction);
    return interaction;
  }

  async updateUserLeadInteraction(userId: number, leadId: number, updates: Partial<UserLeadInteraction>): Promise<UserLeadInteraction | undefined> {
    const key = `${userId}-${leadId}`;
    const existing = this.userLeadInteractions.get(key);
    if (existing) {
      const updated = { ...existing, ...updates, lastInteraction: new Date() };
      this.userLeadInteractions.set(key, updated);
      return updated;
    }
    return undefined;
  }

  async createSimulatedMessage(insertMessage: InsertSimulatedMessage): Promise<SimulatedMessage> {
    const id = this.currentMessageId++;
    const message: SimulatedMessage = {
      ...insertMessage,
      id,
      sentAt: new Date()
    };
    this.simulatedMessages.set(id, message);
    return message;
  }

  async getSimulatedMessages(userId: number): Promise<SimulatedMessage[]> {
    return Array.from(this.simulatedMessages.values()).filter(msg => msg.userId === userId);
  }
}

export const storage = new MemStorage();
