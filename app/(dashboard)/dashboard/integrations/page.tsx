"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  MessageCircle,
  Mail,
  Linkedin,
  Instagram,
  CalendarDays,
  Database,
  Brain,
  Check,
  AlertCircle,
  ExternalLink,
  Settings,
} from "lucide-react"

const integrations = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Connect your WhatsApp Business account to send and receive messages",
    icon: MessageCircle,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    connected: true,
    status: "Connected as +1 (555) 000-1234",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Sync your Gmail inbox to manage emails through LYO",
    icon: Mail,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    connected: true,
    status: "Connected as john@company.com",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Access LinkedIn messages and manage connections",
    icon: Linkedin,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    connected: true,
    status: "Connected as John Doe",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Connect your Instagram Business account for DM management",
    icon: Instagram,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    connected: false,
    status: "Not connected",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "Sync your calendar for automatic meeting scheduling",
    icon: CalendarDays,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    connected: true,
    status: "Connected to primary calendar",
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Vector database for AI memory and embeddings storage",
    icon: Database,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    connected: true,
    status: "Connected to production instance",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    description: "AI model provider for embeddings and language processing",
    icon: Brain,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    connected: true,
    status: "Using DeepSeek model",
  },
]

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold">Integrations</h1>
          <p className="text-sm text-muted-foreground">Connect your channels and services</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Integration Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => (
            <Card key={integration.id} className="bg-card/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${integration.bgColor}`}>
                    <integration.icon className={`h-6 w-6 ${integration.color}`} />
                  </div>
                  {integration.connected ? (
                    <Badge className="bg-green-400/10 text-green-400 hover:bg-green-400/20">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Not connected
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base mt-4">{integration.name}</CardTitle>
                <CardDescription className="text-sm">{integration.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">{integration.status}</p>
                <div className="flex gap-2">
                  {integration.connected ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                        <Settings className="h-4 w-4" />
                        Configure
                      </Button>
                      <Button variant="ghost" size="sm">
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Keys Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">API Configuration</h2>
          <Card className="bg-card/50">
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Supabase URL</Label>
                  <Input type="text" placeholder="https://your-project.supabase.co" className="font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <Label>Supabase Anon Key</Label>
                  <Input type="password" placeholder="••••••••••••••••" className="font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <Label>Hugging Face API Key</Label>
                  <Input type="password" placeholder="••••••••••••••••" className="font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp Cloud API Token</Label>
                  <Input type="password" placeholder="••••••••••••••••" className="font-mono text-sm" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save API Keys</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
