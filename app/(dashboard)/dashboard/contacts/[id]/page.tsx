import { ContactProfileHeader } from "@/components/contacts/profile-header"
import { ContactDetails } from "@/components/contacts/contact-details"
import { ContactMemory } from "@/components/contacts/contact-memory"
import { ContactTimeline } from "@/components/contacts/contact-timeline"
import { ContactActions } from "@/components/contacts/contact-actions"

export default async function ContactProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="flex flex-col h-full">
      <ContactProfileHeader contactId={id} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ContactMemory contactId={id} />
            <ContactTimeline contactId={id} />
          </div>
          <div className="space-y-6">
            <ContactDetails contactId={id} />
            <ContactActions contactId={id} />
          </div>
        </div>
      </div>
    </div>
  )
}
