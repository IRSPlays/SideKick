"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, BookOpen, MessageSquare, PenTool, LayoutDashboard, Library } from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Notes", href: "/dashboard/notes", icon: BookOpen },
  { name: "Write New", href: "/dashboard/notes/new", icon: PenTool },
  { name: "Community Library", href: "/dashboard/library", icon: Library },
  { name: "AI Tutor", href: "/chat", icon: MessageSquare },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-pattern-sg flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col shadow-2xl z-20">
        <div className="flex items-center h-16 px-6 border-b border-white/10">
          <span className="text-xl font-display font-bold text-teal-400 tracking-tight">SG Notes</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-lg shadow-teal-500/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-teal-300" : "text-slate-500"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-400 rounded-xl hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
