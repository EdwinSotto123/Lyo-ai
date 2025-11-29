import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Building, MapPin, Globe, Calendar } from "lucide-react"

interface ContactDetailsProps {
  contactId: string
}

export function ContactDetails({ contactId }: ContactDetailsProps) {
  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle className="text-base font-medium">Contact Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm">sarah.chen@techcorp.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Building className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Company</p>
            <p className="text-sm">TechCorp Inc.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm">San Francisco, CA</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Timezone</p>
            <p className="text-sm">PST (UTC-8)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Added</p>
            <p className="text-sm">March 15, 2024</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
