import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { buscarEmpresas, buscarEmpresasPorSegmento, pesquisarEmpresas, buscarSugestoes } from "./empresaService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get empresas from Supabase
  app.get("/api/empresas", async (req, res) => {
    try {
      const { limit = 50, offset = 0, segment, search } = req.query;
      
      let empresas;
      if (search) {
        empresas = await pesquisarEmpresas(search as string, Number(limit));
      } else if (segment && segment !== 'all') {
        empresas = await buscarEmpresasPorSegmento(segment as string, Number(limit));
      } else {
        empresas = await buscarEmpresas(Number(limit), Number(offset));
      }
      
      res.json(empresas);
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
      res.status(500).json({ message: "Failed to get empresas" });
    }
  });

  // Get all leads (mantido para compatibilidade)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to get leads" });
    }
  });

  // Create a new lead
  app.post("/api/leads", async (req, res) => {
    try {
      const lead = await storage.createLead(req.body);
      res.json(lead);
    } catch (error) {
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  // Get user lead interactions
  app.get("/api/users/:userId/interactions", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const interactions = [];
      
      // Get all leads and check for interactions
      const leads = await storage.getLeads();
      for (const lead of leads) {
        const interaction = await storage.getUserLeadInteraction(userId, lead.id);
        if (interaction) {
          interactions.push(interaction);
        }
      }
      
      res.json(interactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get interactions" });
    }
  });

  // Update user lead interaction
  app.put("/api/users/:userId/leads/:leadId/interaction", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const leadId = parseInt(req.params.leadId);
      
      let interaction = await storage.getUserLeadInteraction(userId, leadId);
      
      if (!interaction) {
        // Create new interaction
        interaction = await storage.createUserLeadInteraction({
          userId,
          leadId,
          ...req.body
        });
      } else {
        // Update existing interaction
        interaction = await storage.updateUserLeadInteraction(userId, leadId, req.body);
      }
      
      res.json(interaction);
    } catch (error) {
      res.status(500).json({ message: "Failed to update interaction" });
    }
  });

  // Simulate WhatsApp message sending
  app.post("/api/messages/whatsapp", async (req, res) => {
    try {
      const { userId, leadIds, message } = req.body;
      
      const sentMessages = [];
      
      for (const leadId of leadIds) {
        const simulatedMessage = await storage.createSimulatedMessage({
          userId,
          leadId,
          message,
          messageType: "whatsapp",
          status: "sent"
        });
        sentMessages.push(simulatedMessage);
      }
      
      // Simulate delivery status updates
      setTimeout(async () => {
        for (const msg of sentMessages) {
          // Update status to delivered after 2 seconds
          // In a real app, this would be handled by webhook from WhatsApp API
        }
      }, 2000);
      
      res.json({ 
        success: true, 
        messagesSent: sentMessages.length,
        messages: sentMessages
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to send messages" });
    }
  });

  // Simulate email sending
  app.post("/api/messages/email", async (req, res) => {
    try {
      const { userId, leadIds, subject, message } = req.body;
      
      const sentMessages = [];
      
      for (const leadId of leadIds) {
        const simulatedMessage = await storage.createSimulatedMessage({
          userId,
          leadId,
          message: `${subject}\n\n${message}`,
          messageType: "email",
          status: "sent"
        });
        sentMessages.push(simulatedMessage);
      }
      
      res.json({ 
        success: true, 
        messagesSent: sentMessages.length,
        messages: sentMessages
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to send emails" });
    }
  });

  // Get simulated messages for a user
  app.get("/api/users/:userId/messages", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const messages = await storage.getSimulatedMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to get messages" });
    }
  });

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, password, whatsapp } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }
      
      // Create new user with 10 credits
      const newUser = await storage.createUser({
        username: email,
        email,
        password, // In production, hash this password
        creditsRemaining: 10,
        totalCredits: 10
      });
      
      res.json({
        id: newUser.id,
        email: newUser.email,
        creditsRemaining: newUser.creditsRemaining,
        totalCredits: newUser.totalCredits
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar conta" });
    }
  });

  // Search suggestions route
  app.get("/api/empresas/search-suggestions", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.json([]);
      }
      
      const suggestions = await buscarSugestoes(q);
      res.json(suggestions);
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
      res.status(500).json([]);
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await storage.getUserByUsername(email);
      if (!user || user.password !== password) { // In production, compare hashed passwords
        return res.status(401).json({ message: "Email ou senha incorretos" });
      }
      
      res.json({
        id: user.id,
        email: user.email,
        creditsRemaining: user.creditsRemaining,
        totalCredits: user.totalCredits
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao fazer login" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
