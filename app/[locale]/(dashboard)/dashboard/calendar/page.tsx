"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Plus, Video, MapPin, Clock } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/header"

const events = [
  {
    id: 1,
    title: "Product Demo with Sarah",
    time: "3:00 PM - 4:00 PM",
    attendees: [{ name: "Sarah Chen", avatar: "/sarah-chen-professional.jpg" }],
    type: "video",
    color: "bg-accent",
  },
  {
    id: 2,
    title: "Team Standup",
    time: "9:00 AM - 9:30 AM",
    attendees: [
      { name: "Michael Roberts", avatar: "/michael-roberts-professional.jpg" },
      { name: "Emma Wilson", avatar: "/emma-wilson-professional.jpg" },
    ],
    type: "video",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Client Review",
    time: "11:00 AM - 12:00 PM",
    attendees: [{ name: "Lisa Thompson", avatar: "/lisa-thompson-professional.jpg" }],
    type: "in-person",
    color: "bg-green-500",
  },
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = Array.from({ length: 12 }, (_, i) => i + 8)

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader />

      <div className="flex-1 flex overflow-hidden">
        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto border-r border-border">
          <div className="min-w-[800px]">
            {/* Week Header */}
            <div className="grid grid-cols-8 border-b border-border sticky top-0 bg-background z-10">
              <div className="p-4 text-xs text-muted-foreground" />
              {weekDays.map((day, index) => (
                <div key={day} className="p-4 text-center border-l border-border">
                  <p className="text-xs text-muted-foreground">{day}</p>
                  <p className={`text-sm font-semibold mt-1 ${index === 3 ? "text-accent" : ""}`}>{25 + index}</p>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="relative">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 border-b border-border/50">
                  <div className="p-2 text-xs text-muted-foreground text-right pr-4">{hour}:00</div>
                  {weekDays.map((day, index) => (
                    <div
                      key={`${hour}-${day}`}
                      className="h-16 border-l border-border/50 hover:bg-muted/30 cursor-pointer"
                    />
                  ))}
                </div>
              ))}

              {/* Sample Event Overlays */}
              <div className="absolute top-[48px] left-[calc(14.28%*4+14.28%/2-60px)] w-[120px] bg-accent/20 border border-accent/50 rounded-lg p-2 cursor-pointer hover:bg-accent/30">
                <p className="text-xs font-medium text-accent">Product Demo</p>
                <p className="text-[10px] text-muted-foreground">3:00 PM</p>
              </div>
              <div className="absolute top-[16px] left-[calc(14.28%*2+14.28%/2-60px)] w-[120px] bg-blue-500/20 border border-blue-500/50 rounded-lg p-2 cursor-pointer hover:bg-blue-500/30">
                <p className="text-xs font-medium text-blue-400">Team Standup</p>
                <p className="text-[10px] text-muted-foreground">9:00 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 p-4 space-y-4 overflow-y-auto bg-card/30">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Today&apos;s Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer"
                >
                  <div className={`w-1 rounded-full ${event.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {event.type === "video" ? (
                        <Video className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                      )}
                      <div className="flex -space-x-2">
                        {event.attendees.map((attendee, i) => (
                          <Avatar key={i} className="h-5 w-5 border-2 border-background">
                            <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-base">Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Set your working hours for automatic scheduling</p>
              <div className="space-y-2">
                {["Monday - Friday", "9:00 AM - 6:00 PM"].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    {text}
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Edit Availability
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
