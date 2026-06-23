// "use client";

// import Link from "next/link";
// import {
//   Sparkles,
//   MessageCircle,
// } from "lucide-react";
// import { BsTwitter } from "react-icons/bs";
// import { GiThunderBlade } from "react-icons/gi";
// import { IoLogoGithub } from "react-icons/io";
// import { FaLinkedin } from "react-icons/fa";

// export  function Footer() {
//   return (
//     <footer className="bg-[#07122B] text-white mt-18">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">

//         {/* Top Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-16">

//           {/* Brand */}
//           <div>
//             <Link href="/" className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
//                 <Sparkles size={16} />
//               </div>

//               <span className="text-xl font-bold">
//                 PromptHub
//               </span>
//             </Link>

//             <p className="mt-4 text-slate-400 text-sm">
//               Share & discover AI prompts.
//             </p>

//             <div className="flex items-center gap-4 mt-5">
          
//               <Link href="#">
//                 <BsTwitter
//                   size={18}
//                   className="text-slate-400 hover:text-white transition"
//                 />
//               </Link>

             
//               <Link href="#">
//                 <IoLogoGithub
//                   size={18}
//                   className="text-slate-400 hover:text-white transition"
//                 />
//               </Link> 

//               <Link href="#">
//                 <MessageCircle
//                   size={18}
//                   className="text-slate-400 hover:text-white transition"
//                 />
//               </Link>
//                 <Link href="#">
//                 <FaLinkedin
//                   size={18}
//                   className="text-slate-400 hover:text-white transition"
//                 />
//               </Link> 
//             </div>
//           </div>

//           {/* Product */}
//           <div>
//             <h3 className="font-semibold mb-4">Product</h3>

//             <ul className="space-y-3 text-sm text-slate-400">
//               <li>
//                 <Link href="/prompts" className="hover:text-white">
//                   AI Prompts
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/premium" className="hover:text-white">
//                   Premium
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/creators" className="hover:text-white">
//                   Creators
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/pricing" className="hover:text-white">
//                   Pricing
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="font-semibold mb-4">Company</h3>

//             <ul className="space-y-3 text-sm text-slate-400">
//               <li>
//                 <Link href="/about" className="hover:text-white">
//                   About
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/blog" className="hover:text-white">
//                   Blog
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/careers" className="hover:text-white">
//                   Careers
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/contact" className="hover:text-white">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Legal */}
//           <div>
//             <h3 className="font-semibold mb-4">Legal</h3>

//             <ul className="space-y-3 text-sm text-slate-400">
//               <li>
//                 <Link href="/terms" className="hover:text-white">
//                   Terms
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/privacy" className="hover:text-white">
//                   Privacy
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/cookies" className="hover:text-white">
//                   Cookies
//                 </Link>
//               </li>

//               <li>
//                 <Link href="/gdpr" className="hover:text-white">
//                   GDPR
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-slate-800"></div>

//         {/* Bottom Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center py-6 text-sm text-slate-400">
//           <p>
//             © 2026 PromptHub. All rights reserved.
//           </p>

//           <div className="flex gap-6 mt-4 md:mt-0">
//             <Link href="/privacy" className="hover:text-white">
//               Privacy Policy
//             </Link>

//             <Link href="/terms" className="hover:text-white">
//               Terms of Service
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }



"use client";

import Link from "next/link";
import {
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { BsTwitter } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#07122B] text-white mt-18">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-16">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <Sparkles size={16} />
              </div>

              <span className="text-xl font-bold">
                PromptHub
              </span>
            </Link>

            <p className="mt-4 text-slate-400 text-sm">
              Share & discover AI prompts.
            </p>

            <div className="flex items-center gap-4 mt-5">
          
              <Link href="#">
                <BsTwitter
                  size={18}
                  className="text-slate-400 hover:text-white transition"
                />
              </Link>

             
              <Link href="#">
                <IoLogoGithub
                  size={18}
                  className="text-slate-400 hover:text-white transition"
                />
              </Link> 

              <Link href="#">
                <MessageCircle
                  size={18}
                  className="text-slate-400 hover:text-white transition"
                />
              </Link>
                <Link href="#">
                <FaLinkedin
                  size={18}
                  className="text-slate-400 hover:text-white transition"
                />
              </Link> 
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/prompts" className="hover:text-white">
                  AI Prompts
                </Link>
              </li>

              <li>
                <Link href="/premium" className="hover:text-white">
                  Premium
                </Link>
              </li>

              <li>
                <Link href="/creators" className="hover:text-white">
                  Creators
                </Link>
              </li>

              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>

              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>

              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookies
                </Link>
              </li>

              <li>
                <Link href="/gdpr" className="hover:text-white">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 text-sm text-slate-400">
          <p>
            © 2026 PromptHub. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer