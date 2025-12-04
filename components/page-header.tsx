"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  showBack?: boolean
  actions?: React.ReactNode
}

export function PageHeader({ title, description, showBack = true, actions }: PageHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {showBack && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => router.back()} className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" asChild className="h-9 w-9 bg-transparent">
              <Link href="/dashboard">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
            <div className="h-6 w-px bg-border mx-2" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
