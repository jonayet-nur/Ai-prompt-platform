
import Link from 'next/link';

// ১. সার্ভার সাইড ডাটা ফেচিং ফাংশন
async function getPromptDetails(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-prompts/${id}`, {
      next: { revalidate: 60 } // ৬০ সেকেন্ড পর পর ডাটা ক্যাশ আপডেট হবে
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return null;
  }
}

// ২. মেইন সার্ভার কম্পোনেন্ট (Async Component)
const ViewPrompt = async ({ params }) => {
  const { id } = await params;
  const prompt = await getPromptDetails(id);

  if (!prompt) {
    return (
      <div className="text-center text-gray-400 py-20 bg-gray-950 min-h-screen">
        Prompt not found or has been removed.
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-200">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* থাম্বনেইল */}
        {prompt.thumbnail && (
          <div className="h-64 w-full relative">
            <img src={prompt.thumbnail} alt={prompt.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* ব্যাজ গ্রুপ */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full font-medium">{prompt.category}</span>
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full font-medium">🤖 {prompt.aiTool}</span>
            <span className="text-xs bg-gray-800 text-gray-400 border border-gray-700 px-3 py-1 rounded-full font-medium">📶 {prompt.difficulty}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{prompt.title}</h1>
          <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">{prompt.description}</p>

          {/* প্রম্পট বক্স ও ইন্টারেক্টিভ কপি বাটন */}
          <div className="mb-6">
            <div className="flex items-center justify-between bg-gray-950 px-4 py-3 border-t border-x border-gray-800 rounded-t-xl">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Prompt Instructions</span>
              
              {/* নিচে তৈরি করা ক্লায়েন্ট কপি বাটনটি এখানে কল করা হলো */}
              {/* <CopyButton content={prompt.content} /> */}
            </div>
            
            <div className="bg-gray-950 border border-gray-800 p-5 rounded-b-xl font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed select-all">
              {prompt.content}
            </div>
          </div>

          {/* ট্যাগস */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {prompt.tags?.map((tag, idx) => (
                <span key={idx} className="text-xs text-gray-400 bg-gray-800/50 border border-gray-800 px-2.5 py-1 rounded-lg">#{tag}</span>
              ))}
            </div>
          </div>

          {/* মেটা ডাটা */}
          <div className="pt-6 border-t border-gray-800 flex flex-wrap justify-between items-center text-xs text-gray-500 gap-4">
            <div>Published: {new Date(prompt.createdAt).toLocaleDateString()}</div>
            <div>🔥 Used {prompt.copyCount || 0} times</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPrompt;
