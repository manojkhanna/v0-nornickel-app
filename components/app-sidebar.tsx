"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Pickaxe,
  Gem,
  DollarSign,
  Clock,
  FolderKanban,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
  },
  {
    title: "Copper-Zinc Processing",
    icon: Pickaxe,
    items: [
      { title: "Mining Operations", url: "/processing/copper-zinc/mining" },
      { title: "Crushing & Grinding", url: "/processing/copper-zinc/crushing" },
      { title: "Flotation", url: "/processing/copper-zinc/flotation" },
      { title: "Filtration", url: "/processing/copper-zinc/filtration" },
    ],
  },
  {
    title: "Gold-Silver Processing",
    icon: Gem,
    items: [
      { title: "Mining Operations", url: "/processing/gold-silver/mining" },
      { title: "Leaching", url: "/processing/gold-silver/leaching" },
      { title: "Carbon Absorption", url: "/processing/gold-silver/absorption" },
      { title: "Smelting", url: "/processing/gold-silver/smelting" },
    ],
  },
  {
    title: "Financial Metrics",
    icon: DollarSign,
    items: [
      { title: "Overview", url: "/financials/overview" },
      { title: "Income Statement", url: "/financials/income-statement" },
    ],
  },
  {
    title: "Shift Management",
    icon: Clock,
    url: "/operations/shifts",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    url: "/projects",
  },
  {
    title: "Sales Operations",
    icon: ShoppingCart,
    url: "/sales/orders",
  },
  {
    title: "Reports",
    icon: BarChart3,
    url: "/reports",
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    email: string
    full_name: string
    role: string
  }
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Sidebar {...props} className="border-r border-slate-200">
      <SidebarHeader className="border-b border-slate-200 p-4">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amaklogo-hiMjLWPWzO0aqaGrdfoW2iHvGppUdw.png"
            alt="AMAK Mining"
            width={140}
            height={56}
            className="object-contain"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <SidebarMenuButton
                        onClick={() => toggleItem(item.title)}
                        className="w-full justify-between font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openItems.includes(item.title) ? "rotate-180" : ""
                          }`}
                        />
                      </SidebarMenuButton>
                      {openItems.includes(item.title) && (
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.url}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                                className="text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                              >
                                <Link href={subItem.url}>{subItem.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Link href={item.url!}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-200 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-slate-100 transition-colors">
              <Avatar className="h-8 w-8 border border-slate-300">
                <AvatarFallback className="bg-slate-900 text-white text-xs font-semibold">
                  {user ? getInitials(user.full_name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col items-start text-left">
                <span className="text-sm font-semibold text-slate-900">{user?.full_name || "User"}</span>
                <span className="text-xs text-slate-500 capitalize">{user?.role?.replace("_", " ") || "User"}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
