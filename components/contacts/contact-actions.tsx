import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calendar, Mail, FileText, Trash2, Archive, UserMinus } from "lucide-react"

interface ContactActionsProps {
  contactId: string
}

export function ContactActions({ contactId }: ContactActionsProps) {
  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
          <MessageSquare className="h-4 w-4" />
          Send Message
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
          <Calendar className="h-4 w-4" />
          Schedule Meeting
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
          <FileText className="h-4 w-4" />
          Add Note
        </Button>
        <div className="pt-4 border-t border-border space-y-2">
          <Button variant="outline" className="w-full justify-start gap-3 text-muted-foreground bg-transparent">
            <Archive className="h-4 w-4" />
            Archive Contact
          </Button>
          <Button variant="outline" className="w-full justify-start gap-3 text-muted-foreground bg-transparent">
            <UserMinus className="h-4 w-4" />
            Unsubscribe
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive bg-transparent"
          >
            <Trash2 className="h-4 w-4" />
            Delete Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
