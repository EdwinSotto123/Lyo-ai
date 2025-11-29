"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Zap, Brain, Settings, Code, History, Play, Pause, RefreshCw } from "lucide-react"

export default function AgentPage() {
  const [agentActive, setAgentActive] = useState(true)
  const [autoRespond, setAutoRespond] = useState(true)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold">AI Agent Console</h1>
          <p className="text-sm text-muted-foreground">Configure and monitor your LYO assistant</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${agentActive ? "bg-green-400 animate-pulse" : "bg-muted"}`} />
            <span className="text-sm">{agentActive ? "Active" : "Paused"}</span>
          </div>
          <Button
            variant={agentActive ? "outline" : "default"}
            className="gap-2"
            onClick={() => setAgentActive(!agentActive)}
          >
            {agentActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {agentActive ? "Pause Agent" : "Start Agent"}
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="config" className="space-y-6">
          <TabsList>
            <TabsTrigger value="config" className="gap-2">
              <Settings className="h-4 w-4" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="prompts" className="gap-2">
              <Code className="h-4 w-4" />
              Prompts
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <History className="h-4 w-4" />
              Activity Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Stats */}
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">1,284</p>
                      <p className="text-sm text-muted-foreground">Auto-replies today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-400/20 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">89%</p>
                      <p className="text-sm text-muted-foreground">Response accuracy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">2.3s</p>
                      <p className="text-sm text-muted-foreground">Avg response time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Agent Settings */}
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base">Agent Behavior</CardTitle>
                  <CardDescription>Configure how LYO responds to messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-respond to messages</Label>
                      <p className="text-xs text-muted-foreground">Let LYO automatically reply to incoming messages</p>
                    </div>
                    <Switch checked={autoRespond} onCheckedChange={setAutoRespond} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Schedule meetings automatically</Label>
                      <p className="text-xs text-muted-foreground">Create calendar events from message context</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Use contact memory</Label>
                      <p className="text-xs text-muted-foreground">Include context from previous interactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require approval for sensitive topics</Label>
                      <p className="text-xs text-muted-foreground">Ask before sending pricing or contract details</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Tone Settings */}
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-base">Tone & Personality</CardTitle>
                  <CardDescription>Customize how LYO communicates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Communication Style</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Response Length</Label>
                    <Select defaultValue="balanced">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concise">Concise</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Agent Name</Label>
                    <Input defaultValue="LYO Assistant" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="prompts" className="space-y-6">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-base">System Prompt</CardTitle>
                <CardDescription>The core instructions that define your agent&apos;s behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="min-h-[200px] font-mono text-sm bg-secondary/50"
                  defaultValue={`You are LYO, a professional AI assistant helping manage communications. 

Key behaviors:
- Always be polite and professional
- Use context from previous interactions when available
- Schedule meetings proactively when discussed
- Never share sensitive information without approval
- Match the tone of the conversation partner

When responding:
1. Acknowledge the message
2. Provide helpful information
3. Suggest next steps if appropriate`}
                />
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                    Reset to Default
                  </Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-base">Custom Rules</CardTitle>
                <CardDescription>Additional rules for specific scenarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { rule: "When asked about pricing, always offer to schedule a call first", active: true },
                  { rule: "Include signature with contact details on first email", active: true },
                  { rule: "Escalate urgent requests to manual review", active: true },
                  { rule: "Use Spanish when contact prefers it", active: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <span className="text-sm">{item.rule}</span>
                    <Switch defaultChecked={item.active} />
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  Add New Rule
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                  <CardDescription>Monitor your agent&apos;s actions in real-time</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Auto-replied to Sarah Chen", channel: "WhatsApp", time: "2 min ago", status: "success" },
                    {
                      action: "Scheduled meeting with Michael Roberts",
                      channel: "Calendar",
                      time: "5 min ago",
                      status: "success",
                    },
                    {
                      action: "Waiting for approval - pricing inquiry",
                      channel: "Gmail",
                      time: "10 min ago",
                      status: "pending",
                    },
                    {
                      action: "Added memory for Emma Wilson",
                      channel: "System",
                      time: "15 min ago",
                      status: "success",
                    },
                    {
                      action: "Auto-replied to David Park",
                      channel: "Instagram",
                      time: "20 min ago",
                      status: "success",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-2 w-2 rounded-full ${activity.status === "success" ? "bg-green-400" : "bg-yellow-400"}`}
                        />
                        <div>
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.channel}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={activity.status === "success" ? "secondary" : "outline"}>
                          {activity.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
