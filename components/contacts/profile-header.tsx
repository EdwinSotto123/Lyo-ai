"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle, Mail, Linkedin, Calendar, MoreHorizontal, Star } from "lucide-react"
import Link from "next/link"

interface ContactProfileHeaderProps {
  contactId: string
}

export function ContactProfileHeader({ contactId }: ContactProfileHeaderProps) {
  return (
    <header className="border-b border-border bg-card/30">
      <div className="px-6 py-4">
        <Link
          href="/dashboard/contacts"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Contacts
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/sarah-chen-professional.jpg" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold">Sarah Chen</h1>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-muted-foreground">Product Manager at TechCorp</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">Partner</Badge>
                <Badge variant="secondary">High Priority</Badge>
                <Badge variant="secondary">Tech</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <MessageCircle className="h-4 w-4 text-green-400" />
              WhatsApp
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Mail className="h-4 w-4 text-red-400" />
              Email
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Linkedin className="h-4 w-4 text-blue-400" />
              LinkedIn
            </Button>
            <Button className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
