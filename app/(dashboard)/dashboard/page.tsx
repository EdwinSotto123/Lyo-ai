import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardStats } from "@/components/dashboard/stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { IntegrationStatus } from "@/components/dashboard/integration-status"
import { AgentOverview } from "@/components/dashboard/agent-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        <DashboardStats />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <RecentActivity />
          </div>
          <div className="space-y-6">
            <AgentOverview />
            <IntegrationStatus />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}
