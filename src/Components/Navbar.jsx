
// 'use client';
// import { useState } from "react";
// import Link from "next/link";
// import { Sparkles, Plus, Menu, X } from "lucide-react";

// const Navbar = () => {
//      const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "All Prompts", href: "/prompts" },
//     { name: "Register", href: "/sign-up" },
//     { name: "Login", href: "/login" },
//   ];
//   return (
//      <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
//       <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg">
//         <div className="flex items-center justify-between px-4 md:px-6 h-16">

//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
//               <Sparkles size={18} className="text-white" />
//             </div>

//             <h1 className="text-lg md:text-xl font-bold text-slate-900">
//               Prompt<span className="text-purple-600">Hub</span>
//             </h1>
//           </Link>

//           {/* Desktop Menu */}
//           <nav className="hidden lg:flex items-center gap-8">
//             {navLinks.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-slate-700 hover:text-purple-600 font-medium transition"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Button */}
//           <button className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 transition">
//             <Plus size={16} />
//             New Prompt
//           </button>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden text-slate-700"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile / Tablet Menu */}
//         <div
//           className={`overflow-hidden transition-all duration-300 lg:hidden ${
//             isOpen ? "max-h-96" : "max-h-0"
//           }`}
//         >
//           <div className="px-4 pb-4 border-t border-slate-200">
//             <nav className="flex flex-col gap-2 pt-4">
//               {navLinks.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="px-4 py-3 rounded-xl text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </nav>

//             <button className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white">
//               <Plus size={16} />
//               New Prompt
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Navbar



// 'use client';

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Sparkles, Plus, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
// import { authClient, useSession } from "@/lib/auth-client";

// const Navbar = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     await authClient.signOut();
//       window.location.reload();
//     // router.push("/");
//     // router.refresh();
//   };

//   // Navigation links based on authentication
//   const navLinks = session?.user
//     ? [
//         { name: "Home", href: "/" },
//         { name: "All Prompts", href: "/prompts" },
//         { name: "Dashboard", href: `/dashboard/${session.user.role}` },
//       ]
//     : [
//         { name: "Home", href: "/" },
//         { name: "All Prompts", href: "/prompts" },
//         // { name: "Login", href: "/login" },
//         // { name: "Sign Up", href: "/sign-up" },
//       ];

//   return (
//     <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
//       <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-2xl shadow-lg">
//         <div className="flex items-center justify-between px-4 md:px-6 h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
//               <Sparkles size={18} className="text-white" />
//             </div>
//             <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
//               Prompt<span className="text-purple-600">Hub</span>
//             </h1>
//           </Link>

//           {/* Desktop Menu */}
//           <nav className="hidden lg:flex items-center gap-8">
//             {navLinks.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`text-sm font-medium transition ${
//                   pathname === item.href || pathname.startsWith(item.href + '/')
//                     ? "text-purple-600 dark:text-purple-400"
//                     : "text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400"
//                 }`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden lg:flex items-center gap-3">
//             {session?.user ? (
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="flex items-center transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer"
//                 >
//                   <Image
//                     width={36}
//                     height={36}
//                     className="w-9 h-9 rounded-full object-cover border-2 border-purple-500 shadow-md shadow-purple-500/10"
//                     src={session.user?.image_url || "/default-avatar.png"}
//                     alt="avatar"
                      
//     sizes="(max-width: 768px) 100vw, 33vw" // Example sizes prop
//                   />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//                     {/* User info */}
//                     <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 mb-1.5 cursor-default">
//                       <p className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">
//                         {session.user?.role} Account
//                       </p>
//                       <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
//                         {session.user?.name}
//                       </p>
//                       <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
//                         {session.user?.email}
//                       </p>
//                     </div>

//                     {/* Actions */}
//                     <Link
//                       href={`/dashboard/${session.user?.role}`}
//                       onClick={() => setDropdownOpen(false)}
//                       className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition cursor-pointer"
//                     >
//                       <LayoutDashboard size={16} className="text-slate-400 shrink-0" />
//                       <span>Dashboard</span>
//                     </Link>

//                     <Link
//                       href={`/dashboard/${session.user?.role}/profile`}
//                       onClick={() => setDropdownOpen(false)}
//                       className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition cursor-pointer"
//                     >
//                       <User size={16} className="text-slate-400 shrink-0" />
//                       <span>Profile Settings</span>
//                     </Link>

//                     <div className="border-t border-slate-200 dark:border-slate-700 my-1.5" />

//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition cursor-pointer"
//                     >
//                       <LogOut size={16} className="shrink-0 text-red-600 dark:text-red-400" />
//                       <span>Log Out</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link href="/login">
//                   <button className="px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition">
//                     Login
//                   </button>
//                 </Link>
//                 <Link href="/sign-up">
//                   <button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium hover:scale-105 transition">
//                     Sign Up
//                   </button>
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden text-slate-700 dark:text-slate-300"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile / Tablet Menu */}
//         <div
//           className={`overflow-hidden transition-all duration-300 lg:hidden ${
//             isOpen ? "max-h-[500px]" : "max-h-0"
//           }`}
//         >
//           <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700">
//             <nav className="flex flex-col gap-2 pt-4">
//               {navLinks.map((item) => {
//                 // Check if this is the current route
//                 const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`px-4 py-3 rounded-xl transition ${
//                       isActive
//                         ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-semibold"
//                         : "text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400"
//                     }`}
//                     onClick={() => setIsOpen(false)} // Close menu on click
//                   >
//                     {item.name}
//                   </Link>
//                 );
//               })}
//             </nav>

//             {/* Mobile Actions */}
//             {session?.user ? (
//               <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
//                 <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
//                   <Image
//                     width={40}
//                     height={40}
//                     className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
//                     src={session.user?.image_url || "/default-avatar.png"}
//                     alt="avatar"
//                   />
//                   <div>
//                     <p className="text-sm font-semibold text-slate-900 dark:text-white">
//                       {session.user?.name}
//                     </p>
//                     <p className="text-xs text-slate-500 dark:text-slate-400">
//                       {session.user?.email}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition"
//                 >
//                   <LogOut size={16} />
//                   Log Out
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-4 flex flex-col gap-2">
//                 <Link href="/login" onClick={() => setIsOpen(false)}>
//                   <button className="w-full px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition">
//                     Login
//                   </button>
//                 </Link>
//                 <Link href="/sign-up" onClick={() => setIsOpen(false)}>
//                   <button className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:scale-[1.02] transition">
//                     Sign Up
//                   </button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;














// 'use client';

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { 
//   Sparkles, Plus, Menu, X, User, LogOut, LayoutDashboard,
//   Home, Layers, MessageSquare, Star, TrendingUp, Settings,
//   HelpCircle, Bell, Search, ChevronDown
// } from "lucide-react";
// import { authClient, useSession } from "@/lib/auth-client";
// import { Avatar } from "@heroui/react";

// const Navbar = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const user = session?.user
// // Debug: Log session data
// //   console.log("Session user:", session?.user);
// //   console.log("Image URL:", session?.user?.image);

//    // Get image URL with fallback
// //   const imageUrl = session?.user?.image || "/default-avatar.png";

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     await authClient.signOut();
//     window.location.reload();
//   };

//   // Navigation links with icons
//   const navLinks = session?.user
//     ? [
//         { name: "Home", href: "/", icon: Home },
//         { name: "All Prompts", href: "/prompts", icon: Layers },
//         { name: "Dashboard", href: `/dashboard/${session.user.role}`, icon: LayoutDashboard },
//         { name: "My Prompts", href: `/dashboard/${session.user.role}/prompts`, icon: MessageSquare },
//         { name: "Favorites", href: `/dashboard/${session.user.role}/favorites`, icon: Star },
//       ]
//     : [
//         { name: "Home", href: "/", icon: Home },
//         { name: "Explore Prompts", href: "/prompts", icon: Layers },
//         { name: "Trending", href: "/trending", icon: TrendingUp },
//       ];

//   // Check if link is active
//   const isActive = (href) => {
//     return pathname === href || pathname.startsWith(href + '/');
//   };

//   return (
//     <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
//       <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-800/50">
//         <div className="flex items-center justify-between px-4 md:px-6 h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3 group">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow duration-300">
//               <Sparkles size={18} className="text-white" />
//             </div>
//             <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
//               Prompt<span className="text-purple-600">Hub</span>
//             </h1>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center gap-1">
//             {navLinks.map((item) => {
//               const Icon = item.icon;
//               const active = isActive(item.href);
//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
//                     active
//                       ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 shadow-sm"
//                       : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-purple-600 dark:hover:text-purple-400"
//                   }`}
//                 >
//                   <Icon size={16} className={active ? "text-purple-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500"} />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden lg:flex items-center gap-2">
//             {/* Search Button */}
//             <button 
//               className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-purple-600 dark:hover:text-purple-400 transition"
//               onClick={() => setSearchOpen(!searchOpen)}
//             >
//               <Search size={18} />
//             </button>

//             {/* Notifications */}
//             {session?.user && (
//               <button className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-purple-600 dark:hover:text-purple-400 transition relative">
//                 <Bell size={18} />
//                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
//               </button>
//             )}

//             {session?.user ? (
//               <div className="relative ml-1" ref={dropdownRef}>
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="flex items-center gap-2 transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer group"
//                 >
//                   <div className="relative">
//                       <Avatar>
//         <Avatar.Image alt="John Doe" src={session?.user?.image} />
//         <Avatar.Fallback>JD</Avatar.Fallback>
//       </Avatar>
//                     {/* <Image
//                       width={36}
//                       height={36}
//                       className="w-9 h-9 rounded-full object-cover border-2 border-purple-500 shadow-md shadow-purple-500/10 group-hover:shadow-purple-500/20 transition-shadow"
//                       src={session.user?.image}
//                       alt="avatar"
//                       sizes="36px"
//                     /> */}
//                     <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
//                   </div>
//                   <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-800/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//                     {/* User info */}
//                     <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 cursor-default">
//                       <div className="flex items-center gap-3 mb-2">
//                         <Avatar>
//         <Avatar.Image alt="John Doe" src={session?.user?.image} />
//         <Avatar.Fallback>{session?.user?.name?.split(' ').map(n => n[0]).join('')}</Avatar.Fallback>
//       </Avatar>

//                             {/* <Image
//       width={40}
//       height={40}
//       className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
//       src={session?.user?.image}
//       alt="avatar"
//       sizes="40px"
      
//     /> */}
//                         {/* <Image
//                           width={40}
//                           height={40}
//                           className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
//                           src={session.user?.image_url || "/default-avatar.png"}
//                           alt="avatar"
//                           sizes="40px"
//                         /> */}
//                         <div>
//                           <p className="font-semibold text-slate-900 dark:text-white text-sm">
//                             {session.user?.name}
//                           </p>
//                           <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
//                             {session.user?.email}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
//                           {session.user?.role || 'User'}
//                         </span>
//                         <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium px-2 py-0.5 rounded-full">
//                           Premium
//                         </span>
//                       </div>
//                     </div>

//                     {/* Navigation Links in Dropdown */}
//                     <div className="py-1">
//                       <Link
//                         href={`/dashboard/${session.user?.role}`}
//                         onClick={() => setDropdownOpen(false)}
//                         className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition"
//                       >
//                         <LayoutDashboard size={16} className="text-slate-400 shrink-0" />
//                         <span>Dashboard</span>
//                       </Link>
//                       <Link
//                         href={`/dashboard/${session.user?.role}/profile`}
//                         onClick={() => setDropdownOpen(false)}
//                         className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition"
//                       >
//                         <User size={16} className="text-slate-400 shrink-0" />
//                         <span>Profile Settings</span>
//                       </Link>
//                       <Link
//                         href="/settings"
//                         onClick={() => setDropdownOpen(false)}
//                         className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition"
//                       >
//                         <Settings size={16} className="text-slate-400 shrink-0" />
//                         <span>Settings</span>
//                       </Link>
//                       <Link
//                         href="/help"
//                         onClick={() => setDropdownOpen(false)}
//                         className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition"
//                       >
//                         <HelpCircle size={16} className="text-slate-400 shrink-0" />
//                         <span>Help & Support</span>
//                       </Link>
//                     </div>

//                     <div className="border-t border-slate-200 dark:border-slate-700 my-1" />

//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
//                     >
//                       <LogOut size={16} className="shrink-0" />
//                       <span>Log Out</span>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link href="/login">
//                   <button className="px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition">
//                     Login
//                   </button>
//                 </Link>
//                 <Link href="/sign-up">
//                   <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
//                     Sign Up Free
//                   </button>
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden text-slate-700 dark:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl transition"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile / Tablet Menu */}
//         <div
//           className={`overflow-hidden transition-all duration-300 lg:hidden ${
//             isOpen ? "max-h-[600px]" : "max-h-0"
//           }`}
//         >
//           <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700">
//             {/* Search in mobile */}
//             <div className="relative mt-4">
//               <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
//               <input
//                 type="text"
//                 placeholder="Search prompts..."
//                 className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
//               />
//             </div>

//             <nav className="flex flex-col gap-1 pt-4">
//               {navLinks.map((item) => {
//                 const Icon = item.icon;
//                 const active = isActive(item.href);
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//                       active
//                         ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-semibold"
//                         : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-purple-600 dark:hover:text-purple-400"
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <Icon size={18} className={active ? "text-purple-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500"} />
//                     <span>{item.name}</span>
//                     {active && (
//                       <span className="ml-auto w-1.5 h-8 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
//                     )}
//                   </Link>
//                 );
//               })}
//             </nav>

//             {/* Mobile Actions */}
//             {session?.user ? (
//               <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
//                 <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
//                   <Image
//                     width={40}
//                     height={40}
//                     className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
//                     src={session.user?.image_url || "/default-avatar.png"}
//                     alt="avatar"
//                     sizes="40px"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
//                       {session.user?.name}
//                     </p>
//                     <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
//                       {session.user?.email}
//                     </p>
//                   </div>
//                   <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-bold px-2 py-0.5 rounded-full">
//                     {session.user?.role}
//                   </span>
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <Link
//                     href={`/dashboard/${session.user?.role}/profile`}
//                     onClick={() => setIsOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
//                   >
//                     <User size={16} className="text-slate-400" />
//                     <span>Profile Settings</span>
//                   </Link>
//                   <Link
//                     href="/settings"
//                     onClick={() => setIsOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
//                   >
//                     <Settings size={16} className="text-slate-400" />
//                     <span>Settings</span>
//                   </Link>
//                 </div>

//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center justify-center gap-2 px-5 py-3 mt-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition"
//                 >
//                   <LogOut size={16} />
//                   Log Out
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-4 flex flex-col gap-2">
//                 <Link href="/login" onClick={() => setIsOpen(false)}>
//                   <button className="w-full px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition">
//                     Login
//                   </button>
//                 </Link>
//                 <Link href="/sign-up" onClick={() => setIsOpen(false)}>
//                   <button className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:scale-[1.02] transition shadow-lg shadow-purple-500/25">
//                     Sign Up Free
//                   </button>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;




'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Sparkles, Plus, Menu, X, User, LogOut, LayoutDashboard,
  Home, Layers, MessageSquare, Star, TrendingUp, Settings,
  HelpCircle, Bell, Search, ChevronDown
} from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import { Avatar, AvatarImage, AvatarFallback } from "@heroui/react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // ✅ Correct way to get user
  const user = session?.user;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.reload();
  };

  // Navigation links with icons
  const navLinks = user
    ? [
        { name: "Home", href: "/", icon: Home },
        { name: "All Prompts", href: "/prompts", icon: Layers },
        { name: "Dashboard", href: `/dashboard/${user.role}`, icon: LayoutDashboard },
        { name: "My Prompts", href: `/dashboard/${user.role}/prompts`, icon: MessageSquare },
        { name: "Favorites", href: `/dashboard/${user.role}/favorites`, icon: Star },
      ]
    : [
        { name: "Home", href: "/", icon: Home },
        { name: "All Prompts", href: "/prompts", icon: Layers },
        { name: "Trending", href: "/trending", icon: TrendingUp },
      ];

  // Check if link is active
  const isActive = (href) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // ✅ Helper function to get user initials for fallback
  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-800/50">
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow duration-300">
              <Sparkles size={18} className="text-white" />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
              Prompt<span className="text-purple-600">Hub</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 shadow-sm"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                >
                  <Icon size={16} className={active ? "text-purple-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500"} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search Button */}
            <button 
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-purple-600 dark:hover:text-purple-400 transition"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={18} />
            </button>

            {/* Notifications */}
            {user && (
              <button className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-purple-600 dark:hover:text-purple-400 transition relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            )}

            {user ? (
              <div className="relative ml-1" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 transition-transform hover:scale-105 outline-none focus:outline-none cursor-pointer group"
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage 
                        src={user.image || user.image_url || "/default-avatar.png"} 
                        alt={user.name || "User"} 
                      />
                      <AvatarFallback>
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-800/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 cursor-default">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar>
                          <AvatarImage 
                            src={user.image || user.image_url || "/default-avatar.png"} 
                            alt={user.name || "User"} 
                          />
                          <AvatarFallback>
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          {user.role || 'User'}
                        </span>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium px-2 py-0.5 rounded-full">
                          Premium
                        </span>
                      </div>
                    </div>

                    {/* Navigation Links in Dropdown */}
                    <div className="py-1">
                      <Link
                        href={`/dashboard/${user.role}`}
                        onClick={() => setDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition"
                      >
                        <LayoutDashboard size={16} className="text-slate-400 shrink-0" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href={`/dashboard/${user.role}/profile`}
                        onClick={() => setDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition"
                      >
                        <User size={16} className="text-slate-400 shrink-0" />
                        <span>Profile Settings</span>
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition"
                      >
                        <Settings size={16} className="text-slate-400 shrink-0" />
                        <span>Settings</span>
                      </Link>
                      <Link
                        href="/help"
                        onClick={() => setDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition"
                      >
                        <HelpCircle size={16} className="text-slate-400 shrink-0" />
                        <span>Help & Support</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-700 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      <LogOut size={16} className="shrink-0" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition">
                    Login
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="px-5 py-2 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
                    Sign Up Free
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-700 dark:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile / Tablet Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isOpen ? "max-h-[600px]" : "max-h-0"
          }`}
        >
          <div className="px-4 pb-4 border-t border-slate-200 dark:border-slate-700">
            {/* Search in mobile */}
            <div className="relative mt-4">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search prompts..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>

            <nav className="flex flex-col gap-1 pt-4">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      active
                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-purple-600 dark:hover:text-purple-400"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} className={active ? "text-purple-600 dark:text-purple-400" : "text-slate-400 dark:text-slate-500"} />
                    <span>{item.name}</span>
                    {active && (
                      <span className="ml-auto w-1.5 h-8 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Actions */}
            {user ? (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <Avatar>
                    <AvatarImage 
                      src={user.image || user.image_url || "/default-avatar.png"} 
                      alt={user.name || "User"} 
                    />
                    <AvatarFallback>
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-bold px-2 py-0.5 rounded-full">
                    {user.role}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href={`/dashboard/${user.role}/profile`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
                  >
                    <User size={16} className="text-slate-400" />
                    <span>Profile Settings</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition"
                  >
                    <Settings size={16} className="text-slate-400" />
                    <span>Settings</span>
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 mt-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition"
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                    Login
                  </button>
                </Link>
                <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:scale-[1.02] transition shadow-lg shadow-purple-500/25">
                    Sign Up Free
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;