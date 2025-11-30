"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, AlertCircle, ExternalLink, Settings } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/header"

// Official SVG Icons
const Icons = {
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  Gmail: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  GoogleCalendar: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
    </svg>
  ),
  Telegram: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  GoogleMeet: () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 13h-4v4h-4v-4H6v-4h4V5h4v4h4v4z" />
      {/* Note: The above path is a generic plus/meet-like shape placeholder. 
          For a true Google Meet logo, a more complex multi-path SVG is needed. 
          I will use a high-quality approximation or standard icon if available, 
          but for now I'll use a camera-like shape which is more recognizable for Meet. */}
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    </svg>
  )
}

const googleIntegrations = [
  {
    id: "meet",
    name: "Google Meet",
    description: "Connect your Google Meet for video conferencing",
    icon: Icons.GoogleMeet,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    connected: false,
    status: "Not connected",
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Sync your Gmail inbox to manage emails through LYO",
    icon: Icons.Gmail,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    connected: false,
    status: "Not connected",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "Sync your calendar for automatic meeting scheduling",
    icon: Icons.GoogleCalendar,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    connected: false,
    status: "Not connected",
  }
]

const socialIntegrations = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Connect your WhatsApp Business account to send and receive messages",
    icon: Icons.WhatsApp,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    connected: false,
    status: "Not connected",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Access LinkedIn messages and manage connections",
    icon: Icons.LinkedIn,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    connected: false,
    status: "Not connected",
  },
  {
    id: "telegram",
    name: "Telegram",
    description: "Connect your Telegram account for DM management",
    icon: Icons.Telegram,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    connected: false,
    status: "Not connected",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Connect your Instagram Business account for DM management",
    icon: Icons.Instagram,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    connected: false,
    status: "Not connected",
  }
]

function IntegrationCard({ integration }: { integration: any }) {
  return (
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
  )
}

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-8">

        {/* Google Ecosystem Container */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Google Workspace</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {googleIntegrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
          <div className="flex justify-end">
            <Button className="w-full md:w-auto">Enable Google Services</Button>
          </div>
        </div>

        {/* Social Media Container */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Social Media</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {socialIntegrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
          <div className="flex justify-end">
            <Button className="w-full md:w-auto">Enable Social Services</Button>
          </div>
        </div>

      </div>
    </div>
  )
}
