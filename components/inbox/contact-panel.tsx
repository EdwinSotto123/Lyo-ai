"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Mail, Linkedin, Phone, MapPin, Building, Calendar, Brain, ExternalLink, ArrowLeft, X } from "lucide-react"
import Link from "next/link"

interface ContactPanelProps {
  conversationId: string | null
  onClose?: () => void
  onBack?: () => void
  className?: string
}

export function ContactPanel({ conversationId, onClose, onBack, className }: ContactPanelProps) {
  if (!conversationId) return null

  return (
    <div className={cn("w-full lg:w-80 border-l border-border bg-card/30 overflow-y-auto flex-col", className)}>
      {/* Mobile Header */}
      <div className="flex lg:hidden items-center justify-between border-b border-border px-3 py-3">
        {onBack && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h2 className="font-semibold text-sm flex-1 text-center">Contact Info</h2>
        {onClose && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Contact Info */}
      <div className="p-4 sm:p-6 border-b border-border text-center">
        <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto">
          <AvatarImage src="/sarah-chen-professional.jpg" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <h3 className="mt-3 sm:mt-4 font-semibold text-base sm:text-lg">Sarah Chen</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">Product Manager at TechCorp</p>

        <div className="flex justify-center gap-2 mt-3 sm:mt-4">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <MessageCircle className="h-4 w-4 text-green-400" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Mail className="h-4 w-4 text-red-400" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Linkedin className="h-4 w-4 text-blue-400" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground truncate">sarah.chen@techcorp.com</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <Building className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground truncate">TechCorp Inc.</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">San Francisco, CA</span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Tags</h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Badge variant="secondary" className="text-[10px] sm:text-xs">Partner</Badge>
            <Badge variant="secondary" className="text-[10px] sm:text-xs">High Priority</Badge>
            <Badge variant="secondary" className="text-[10px] sm:text-xs">Tech</Badge>
          </div>
        </div>

        {/* AI Memory */}
        <Card className="bg-accent/5 border-accent/20">
          <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-2">
              <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
              AI Memory
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[10px] sm:text-xs text-muted-foreground space-y-1.5 sm:space-y-2 px-3 sm:px-4 pb-3 sm:pb-4">
            <p>• Prefers morning meetings (9-11 AM PST)</p>
            <p>• Working on Q4 product launch</p>
            <p>• Interested in AI automation features</p>
            <p>• Last discussed: Project timeline alignment</p>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div>
          <h4 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 sm:mb-3">Recent Activity</h4>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-green-400/10 flex items-center justify-center shrink-0">
                <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm truncate">WhatsApp message</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Today at 10:45 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm truncate">Meeting scheduled</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Thursday at 3:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-red-400/10 flex items-center justify-center shrink-0">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm truncate">Email sent</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Full Profile */}
        <Link href="/dashboard/contacts/sarah-chen" className="block">
          <Button variant="outline" className="w-full gap-2 bg-transparent text-xs sm:text-sm">
            View Full Profile
            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
