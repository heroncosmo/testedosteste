import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar, numeric, date, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  creditsRemaining: integer("credits_remaining").default(10),
  totalCredits: integer("total_credits").default(10),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tabela empresas real do Supabase
export const empresas = pgTable("empresas", {
  cnpjBasico: varchar("cnpj_basico"),
  razaoSocial: varchar("razao_social"),
  nomeFantasia: varchar("nome_fantasia"),
  temDadosEmpresa: varchar("tem_dados_empresa"),
  temDadosSocio: varchar("tem_dados_socio"),
  naturezaJuridica: varchar("natureza_juridica"),
  porte: numeric("porte"),
  capitalSocial: varchar("capital_social"),
  tipoLogradouro: varchar("tipo_logradouro"),
  logradouro: varchar("logradouro"),
  numero: varchar("numero"),
  complemento: varchar("complemento"),
  bairro: varchar("bairro"),
  cep: varchar("cep"),
  codigoMunicipio: integer("codigo_municipio"),
  municipio: varchar("municipio"),
  uf: varchar("uf"),
  telefone1: varchar("telefone_1"),
  telefone2: varchar("telefone_2"),
  email: varchar("email"),
  cnaeFiscal: integer("cnae_fiscal"),
  cnaeDescricao: varchar("cnae_descricao"),
  cnaeFiscalSecundario: varchar("cnae_fiscal_secundario"),
  dataInicioAtividade: date("data_inicio_atividade"),
  codigoSituacaoCadastral: integer("codigo_situacao_cadastral"),
  situacaoCadastral: varchar("situacao_cadastral"),
  dataSituacaoCadastral: date("data_situacao_cadastral"),
  motivoSituacaoCadastral: varchar("motivo_situacao_cadastral"),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  employeeCount: text("employee_count").notNull(),
  segment: text("segment").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  contactRole: text("contact_role").notNull(),
  matchPercentage: integer("match_percentage").default(85),
  isUnlocked: boolean("is_unlocked").default(false),
  isPremium: boolean("is_premium").default(false),
  isHot: boolean("is_hot").default(false),
  aiInsights: text("ai_insights"),
  tags: text("tags").array(),
  avatar: text("avatar").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userLeadInteractions = pgTable("user_lead_interactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  cnpjBasico: varchar("cnpj_basico").notNull(),
  isUnlocked: boolean("is_unlocked").default(false),
  isFavorited: boolean("is_favorited").default(false),
  isSelected: boolean("is_selected").default(false),
  lastInteraction: timestamp("last_interaction").defaultNow(),
});

export const simulatedMessages = pgTable("simulated_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  cnpjBasico: varchar("cnpj_basico").notNull(),
  message: text("message").notNull(),
  messageType: text("message_type").default("whatsapp"), // whatsapp, email
  status: text("status").default("sent"), // sent, delivered, read, replied
  sentAt: timestamp("sent_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertUserLeadInteractionSchema = createInsertSchema(userLeadInteractions).omit({
  id: true,
  lastInteraction: true,
});

export const insertSimulatedMessageSchema = createInsertSchema(simulatedMessages).omit({
  id: true,
  sentAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertUserLeadInteraction = z.infer<typeof insertUserLeadInteractionSchema>;
export type UserLeadInteraction = typeof userLeadInteractions.$inferSelect;
export type InsertSimulatedMessage = z.infer<typeof insertSimulatedMessageSchema>;
export type SimulatedMessage = typeof simulatedMessages.$inferSelect;
