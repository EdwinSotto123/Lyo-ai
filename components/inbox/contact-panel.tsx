"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Mail, Linkedin, Phone, MapPin, Building, Calendar, Brain, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ContactPanelProps {
  conversationId: string | null
}

export function ContactPanel({ conversationId }: ContactPanelProps) {
  if (!conversationId) return null

  return (
    <div className="w-80 border-l border-border bg-card/30 overflow-y-auto">
      {/* Contact Info */}
      <div className="p-6 border-b border-border text-center">
        <Avatar className="h-20 w-20 mx-auto">
          <AvatarImage src="/sarah-chen-professional.jpg" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <h3 className="mt-4 font-semibold text-lg">Sarah Chen</h3>
        <p className="text-sm text-muted-foreground">Product Manager at TechCorp</p>

        <div className="flex justify-center gap-2 mt-4">
          <Button variant="outline" size="icon">
            <MessageCircle className="h-4 w-4 text-green-400" />
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4 text-red-400" />
          </Button>
          <Button variant="outline" size="icon">
            <Linkedin className="h-4 w-4 text-blue-400" />
          </Button>
          <Button variant="outline" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">sarah.chen@techcorp.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">TechCorp Inc.</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">San Francisco, CA</span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Partner</Badge>
            <Badge variant="secondary">High Priority</Badge>
            <Badge variant="secondary">Tech</Badge>
          </div>
        </div>

        {/* AI Memory */}
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Brain className="h-4 w-4 text-accent" />
              AI Memory
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-2">
            <p>• Prefers morning meetings (9-11 AM PST)</p>
            <p>• Working on Q4 product launch</p>
            <p>• Interested in AI automation features</p>
            <p>• Last discussed: Project timeline alignment</p>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-green-400/10 flex items-center justify-center shrink-0">
                <MessageCircle className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <p className="text-sm">WhatsApp message</p>
                <p className="text-xs text-muted-foreground">Today at 10:45 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm">Meeting scheduled</p>
                <p className="text-xs text-muted-foreground">Thursday at 3:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-red-400/10 flex items-center justify-center shrink-0">
                <Mail className="h-4 w-4 text-red-400" />
              </div>
              <div>
                <p className="text-sm">Email sent</p>
                <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Full Profile */}
        <Link href="/dashboard/contacts/sarah-chen">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            View Full Profile
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
