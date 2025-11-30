"use client"

import { useEffect, useState } from "react"
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
  Loader2,
} from "lucide-react"
import { getAuthStatus, authorizeServices, disconnectServices, getUnipileStatus, getUnipileAuthLink, disconnectUnipileAccount } from "@/lib/actions/auth-actions"

const initialIntegrations = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Connect your WhatsApp Business account to send and receive messages",
    icon: MessageCircle,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    connected: false,
    status: "Not connected",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Access LinkedIn messages and manage connections",
    icon: Linkedin,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    connected: false,
    status: "Not connected",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Sync your Gmail inbox to manage emails through LYO",
    icon: Mail,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
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
    connected: false,
    status: "Not connected",
  },
  {
    id: "meet",
    name: "Google Meet",
    description: "Create and manage Google Meet conferences",
    icon: CalendarDays, // Using Calendar icon as placeholder for Meet
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    connected: false,
    status: "Not connected",
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(initialIntegrations)
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [disconnecting, setDisconnecting] = useState<string | null>(null)

  useEffect(() => {
    checkAuthStatus()
    checkUnipileStatus()
  }, [])

  useEffect(() => {
    // Listen for Unipile auth success message
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'UNIPILE_AUTH_SUCCESS') {
        console.log('✅ Unipile auth success received')
        checkUnipileStatus()
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const checkAuthStatus = async () => {
    try {
      const status = await getAuthStatus()
      if (status.authorized) {
        updateGoogleIntegrationsStatus(true)
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
    } finally {
      setLoading(false)
    }
  }

  const checkUnipileStatus = async () => {
    try {
      const status = await getUnipileStatus()
      updateUnipileIntegrationsStatus(status)
    } catch (error) {
      console.error("Error checking unipile status:", error)
    }
  }

  const updateGoogleIntegrationsStatus = (authorized: boolean) => {
    setIntegrations((prev) =>
      prev.map((integration) => {
        if (["gmail", "calendar", "meet"].includes(integration.id)) {
          return {
            ...integration,
            connected: authorized,
            status: authorized ? "Connected" : "Not connected",
          }
        }
        return integration
      })
    )
  }

  const updateUnipileIntegrationsStatus = (statusData: any) => {
    const providers = statusData.providers || {}

    setIntegrations((prev) =>
      prev.map((integration) => {
        const providerKey = integration.id.toUpperCase()
        if (["WHATSAPP", "LINKEDIN"].includes(providerKey)) {
          const accounts = providers[providerKey] || []
          const isConnected = accounts.length > 0
          // Store the first account ID for disconnection (simplification)
          const accountId = isConnected ? accounts[0].id : null

          return {
            ...integration,
            connected: isConnected,
            status: isConnected ? "Connected" : "Not connected",
            accountId: accountId // Store account ID
          }
        }
        return integration
      })
    )
  }

  const handleConnect = async (serviceId: string) => {
    setConnecting(serviceId)
    try {
      if (["gmail", "calendar", "meet"].includes(serviceId)) {
        const { url } = await authorizeServices()
        if (url) {
          window.location.href = url
        }
      } else if (["whatsapp", "linkedin"].includes(serviceId)) {
        const { url } = await getUnipileAuthLink([serviceId.toUpperCase()])
        if (url) {
          const popup = window.open(
            url,
            'unipile_auth',
            'width=600,height=700,scrollbars=yes,resizable=yes'
          )

          // Check if popup closed
          const checkInterval = setInterval(async () => {
            if (popup?.closed) {
              clearInterval(checkInterval)
              await checkUnipileStatus()
              setConnecting(null)
            }
          }, 1000)
        } else {
          setConnecting(null)
        }
      }
    } catch (error) {
      console.error("Error connecting service:", error)
      setConnecting(null)
    }
  }

  const handleDisconnect = async (serviceId: string) => {
    setDisconnecting(serviceId)
    try {
      if (["gmail", "calendar", "meet"].includes(serviceId)) {
        const result = await disconnectServices()
        if (result.success) {
          updateGoogleIntegrationsStatus(false)
        }
      } else if (["whatsapp", "linkedin"].includes(serviceId)) {
        // Find the integration to get the account ID
        const integration = integrations.find(i => i.id === serviceId)
        // @ts-ignore - accountId is added dynamically
        const accountId = integration?.accountId

        if (accountId) {
          const result = await disconnectUnipileAccount(accountId)
          if (result.success || result.message === 'Account disconnected') {
            await checkUnipileStatus()
          }
        }
      }
    } catch (error) {
      console.error("Error disconnecting service:", error)
    } finally {
      setDisconnecting(null)
    }
  }

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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisconnect(integration.id)}
                        disabled={!!disconnecting}
                      >
                        {disconnecting === integration.id ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => handleConnect(integration.id)}
                      disabled={!!connecting}
                    >
                      {connecting === integration.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ExternalLink className="h-4 w-4" />
                      )}
                      {connecting === integration.id ? "Connecting..." : "Connect"}
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
