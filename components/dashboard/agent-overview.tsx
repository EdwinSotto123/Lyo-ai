import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Zap, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"

export function AgentOverview() {
  return (
    <Card className="bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">AI Agent</CardTitle>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400">Active</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
            <Bot className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">LYO Assistant</p>
            <p className="text-xs text-muted-foreground">Professional tone • Auto-respond enabled</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border p-3 text-center">
            <Zap className="mx-auto h-5 w-5 text-yellow-400" />
            <p className="mt-2 text-lg font-semibold">127</p>
            <p className="text-xs text-muted-foreground">Auto-replies today</p>
          </div>
          <div className="rounded-lg border border-border p-3 text-center">
            <MessageSquare className="mx-auto h-5 w-5 text-accent" />
            <p className="mt-2 text-lg font-semibold">89%</p>
            <p className="text-xs text-muted-foreground">Accuracy rate</p>
          </div>
        </div>

        <Link href="/dashboard/agent">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Configure Agent
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
