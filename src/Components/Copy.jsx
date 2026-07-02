// // -------------------------------------------------------------
// // ৩. ছোট একটি আইসোলেটেড ক্লায়েন্ট কম্পোনেন্ট (কপি ফিচারের জন্য)
// // -------------------------------------------------------------
// 'use client'; // 👈 ক্লায়েন্ট ফিচার ব্যবহারের জন্য সবার উপরে থাকবে

// import { useState } from 'react';

// // 👈 এখানে 'export default' যোগ করা হয়েছে যাতে অন্য ফাইলে ব্যবহার করা যায়
// export default function CopyButton({ content }) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     if (content) {
//       navigator.clipboard.writeText(content);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   return (
//     <button 
//       onClick={handleCopy}
//       className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
//         copied 
//           ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
//           : 'bg-purple-600 hover:bg-purple-700 text-white'
//       }`}
//     >
//       {copied ? '✓ Copied!' : 'Copy Prompt'}
//     </button>
//   );
// }






'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 👈 নেক্সট রাউটার ইমপোর্ট করা হলো

export default function CopyButton({ content, promptId }) {
  const [copied, setCopied] = useState(false);
  const router = useRouter(); // 👈 রাউটার হুক ইনিশিয়ালাইজেশন

  const handleCopy = async () => {
    if (!content) return;

    try {
      // ১. টেক্সট ক্লিপবোর্ডে কপি করা
      await navigator.clipboard.writeText(content);
      setCopied(true);

      // ২. ব্যাকএন্ডের PATCH এপিআই-তে হিট করে ডাটাবেজে কাউন্ট ১ বাড়ানো
      if (promptId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-prompts/count-update/${promptId}`, {
          method: 'PATCH',
        });
        const data = await res.json();

        if (data.success) {
          // ৩. সার্ভার কম্পোনেন্টকে নতুন ডাটা দিয়ে রি-রেন্ডার করার জন্য ফোর্স রিফ্রেশ
          router.refresh();
        }
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error updating copy count on details page:", error);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
        copied ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-purple-600 hover:bg-purple-700 text-white'
      }`}
    >
      {copied ? '✓ Copied!' : 'Copy Prompt'}
    </button>
  );
}