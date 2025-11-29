"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Plus, Edit, Sparkles } from "lucide-react"

interface ContactMemoryProps {
  contactId: string
}

const memories = [
  {
    id: 1,
    content: "Prefers morning meetings between 9-11 AM PST. Mentioned she's most productive in the mornings.",
    source: "WhatsApp conversation - March 20",
    confidence: 95,
  },
  {
    id: 2,
    content: "Currently leading the Q4 product launch at TechCorp. Main focus is on AI integration features.",
    source: "LinkedIn message - March 18",
    confidence: 92,
  },
  {
    id: 3,
    content: "Interested in exploring automation solutions for customer support workflows.",
    source: "Email thread - March 15",
    confidence: 88,
  },
  {
    id: 4,
    content: "Has decision-making authority for tools under $50K annual budget.",
    source: "Discovery call notes - March 10",
    confidence: 85,
  },
  {
    id: 5,
    content: "Previously worked at Google as a PM for 4 years. Strong technical background.",
    source: "LinkedIn profile analysis",
    confidence: 98,
  },
]

export function ContactMemory({ contactId }: ContactMemoryProps) {
  return (
    <Card className="bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-accent" />
          <CardTitle className="text-base font-medium">AI Memory</CardTitle>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Sparkles className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          LYO automatically captures and remembers important context from all your interactions.
        </p>
        <div className="space-y-4">
          {memories.map((memory) => (
            <div key={memory.id} className="rounded-lg border border-border bg-secondary/30 p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm">{memory.content}</p>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground">{memory.source}</span>
                <span className="text-xs text-accent">{memory.confidence}% confidence</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
