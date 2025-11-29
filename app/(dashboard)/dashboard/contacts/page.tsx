"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Plus,
  Filter,
  Grid,
  List,
  MessageCircle,
  Mail,
  Linkedin,
  Instagram,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const contacts = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    email: "sarah.chen@techcorp.com",
    company: "TechCorp",
    role: "Product Manager",
    avatar: "/sarah-chen-professional.jpg",
    channels: ["whatsapp", "gmail", "linkedin"],
    tags: ["Partner", "High Priority"],
    lastInteraction: "2 min ago",
  },
  {
    id: "michael-roberts",
    name: "Michael Roberts",
    email: "m.roberts@design.co",
    company: "Design Co",
    role: "Creative Director",
    avatar: "/michael-roberts-professional.jpg",
    channels: ["gmail", "linkedin"],
    tags: ["Client", "Design"],
    lastInteraction: "15 min ago",
  },
  {
    id: "emma-wilson",
    name: "Emma Wilson",
    email: "emma@startup.io",
    company: "Startup.io",
    role: "CEO",
    avatar: "/emma-wilson-professional.jpg",
    channels: ["linkedin", "gmail"],
    tags: ["Investor", "VIP"],
    lastInteraction: "1 hour ago",
  },
  {
    id: "david-park",
    name: "David Park",
    email: "david.park@media.com",
    company: "Media Inc",
    role: "Marketing Lead",
    avatar: "/david-park-professional.jpg",
    channels: ["instagram", "whatsapp"],
    tags: ["Marketing", "Social"],
    lastInteraction: "2 hours ago",
  },
  {
    id: "lisa-thompson",
    name: "Lisa Thompson",
    email: "lisa.t@enterprise.com",
    company: "Enterprise Corp",
    role: "VP Sales",
    avatar: "/lisa-thompson-professional.jpg",
    channels: ["gmail", "linkedin", "whatsapp"],
    tags: ["Enterprise", "Sales"],
    lastInteraction: "3 hours ago",
  },
  {
    id: "alex-rodriguez",
    name: "Alex Rodriguez",
    email: "alex@freelance.dev",
    company: "Freelance",
    role: "Developer",
    avatar: "/alex-rodriguez-professional-headshot.jpg",
    channels: ["whatsapp", "gmail"],
    tags: ["Developer", "Contractor"],
    lastInteraction: "5 hours ago",
  },
]

const channelIcons = {
  whatsapp: { icon: MessageCircle, color: "text-green-400" },
  gmail: { icon: Mail, color: "text-red-400" },
  linkedin: { icon: Linkedin, color: "text-blue-400" },
  instagram: { icon: Instagram, color: "text-pink-400" },
}

export default function ContactsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold">Contacts</h1>
          <p className="text-sm text-muted-foreground">{contacts.length} total contacts</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </header>

      {/* Filters */}
      <div className="flex items-center gap-4 border-b border-border px-6 py-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-9 bg-secondary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <div className="flex items-center border border-border rounded-lg">
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            className="rounded-r-none"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="rounded-l-none"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contacts List/Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === "list" ? (
          <div className="space-y-2">
            {filteredContacts.map((contact) => (
              <Link key={contact.id} href={`/dashboard/contacts/${contact.id}`}>
                <Card className="bg-card/50 hover:bg-card transition-colors cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{contact.name}</span>
                        <div className="flex gap-1">
                          {contact.channels.map((channel) => {
                            const { icon: Icon, color } = channelIcons[channel as keyof typeof channelIcons]
                            return <Icon key={channel} className={`h-3.5 w-3.5 ${color}`} />
                          })}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {contact.role} at {contact.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {contact.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{contact.lastInteraction}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.preventDefault()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
                          <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredContacts.map((contact) => (
              <Link key={contact.id} href={`/dashboard/contacts/${contact.id}`}>
                <Card className="bg-card/50 hover:bg-card transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Avatar className="h-16 w-16 mx-auto">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-medium">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                    <p className="text-xs text-muted-foreground">{contact.company}</p>
                    <div className="flex justify-center gap-2 mt-4">
                      {contact.channels.map((channel) => {
                        const { icon: Icon, color } = channelIcons[channel as keyof typeof channelIcons]
                        return <Icon key={channel} className={`h-4 w-4 ${color}`} />
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
