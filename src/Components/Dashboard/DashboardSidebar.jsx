
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  FaHome, 
  FaPlus, 
  FaList, 
  FaBookmark, 
  FaStar, 
  FaUser,
  FaUsers,
  FaWallet,
  FaFlag,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function DashboardSidebar({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState("user");

  // Get user role from props or session
  useEffect(() => {
    const getRole = async () => {
      try {
        // First check if user prop has role
        if (user?.role) {
          setUserRole(user.role);
          return;
        }

        // If not, try to get from session
        const { data: session } = await authClient.getSession();
        if (session?.user?.role) {
          setUserRole(session.user.role);
        }
      } catch (error) {
        console.error("Error getting user role:", error);
        setUserRole("user"); // Default fallback
      }
    };

    getRole();
  }, [user]);

  // Define navigation items based on role
  const getNavItems = () => {
    console.log("Current user role for sidebar:", userRole); // Debug log
    
    switch (userRole) {
      case "admin":
        return [
          { name: "Dashboard", href: "/dashboard/admin", icon: FaHome },
          { name: "All Users", href: "/dashboard/admin/all-users", icon: FaUsers },
          { name: "All Prompts", href: "/dashboard/admin/all-prompts", icon: FaList },
          { name: "All Payments", href: "/dashboard/admin/all-payments", icon: FaWallet },
          { name: "Reported Prompts", href: "/dashboard/admin/reported-prompts", icon: FaFlag },
          { name: "Analytics", href: "/dashboard/admin/analytics", icon: FaChartBar },
        ];
      
      case "creator":
        return [
          { name: "Dashboard", href: "/dashboard/creator", icon: FaHome },
          { name: "Add Prompt", href: "/dashboard/creator/add-prompt", icon: FaPlus },
          { name: "My Prompts", href: "/dashboard/creator/my-prompts", icon: FaList },
        ];
      
      case "user":
      default:
        return [
          { name: "Dashboard", href: "/dashboard/user", icon: FaHome },
        //   { name: "Add Prompt", href: "/dashboard/user/add-prompt", icon: FaPlus },
          { name: "My Prompts", href: "/dashboard/user/my-prompts", icon: FaList },
          { name: "Saved Prompts", href: "/dashboard/user/saved-prompts", icon: FaBookmark },
          { name: "My Reviews", href: "/dashboard/user/my-reviews", icon: FaStar },
          { name: "Profile", href: "/dashboard/user/profile", icon: FaUser },
        ];
    }
  };

  const navItems = getNavItems();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Check if a nav item is active
  const isActive = (href) => {
    if (href === "/dashboard/admin" || href === "/dashboard/creator" || href === "/dashboard/user") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#1a1030]/80 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <FaTimes size={22} className="text-purple-400" />
        ) : (
          <FaBars size={22} className="text-purple-400" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full bg-[#030014]/95 backdrop-blur-xl border-r border-purple-500/20 shadow-2xl shadow-purple-500/10 transition-all duration-300 z-40
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className={`p-6 border-b border-purple-500/20 ${isCollapsed ? "px-4" : ""}`}>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow duration-300 flex-shrink-0">
              <Sparkles size={18} className="text-white" />
            </div>
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-white">
                Prompt<span className="text-purple-400">Hub</span>
              </h1>
            )}
          </Link>
        </div>

        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-[#1a1030] border border-purple-500/30 rounded-full items-center justify-center shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
        >
          <FaBars size={10} className="text-purple-400" />
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto" style={{ height: "calc(100vh - 160px)" }}>
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                  ${active 
                    ? "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                  }
                  ${isCollapsed ? "justify-center" : ""}
                `}
              >
                <Icon size={20} className={active ? "text-purple-400" : "text-gray-400 group-hover:text-purple-400"} />
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-3 py-1.5 bg-[#1a1030] border border-purple-500/30 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl shadow-purple-500/20">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-500/20 bg-[#030014]/80 backdrop-blur-sm">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30 flex-shrink-0 overflow-hidden">
                  {user?.image ? (
                    <Image
                      src={user.image} 
                      alt={user.name || "User"} 
                      className="w-full h-full rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <span>{user?.name?.[0] || user?.email?.[0] || "U"}</span>
                  )}
                </div>
                <div className="truncate">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.name || user?.email || "User"}
                  </p>
                  <p className="text-xs text-purple-300 capitalize">
                    {userRole === "creator" ? "🎨 Creator" : 
                     userRole === "admin" ? "👑 Admin" : 
                     "👤 User"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                title="Logout"
              >
                <FaSignOutAlt size={18} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30 overflow-hidden">
                {user?.image ? (
                  <Image 
                    src={user.image} 
                    alt={user.name || "User"} 
                    className="w-full h-full rounded-full object-cover"
                    width={40}
                    height={40}
                  />
                ) : (
                  <span>{user?.name?.[0] || user?.email?.[0] || "U"}</span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Logout"
              >
                <FaSignOutAlt size={18} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
