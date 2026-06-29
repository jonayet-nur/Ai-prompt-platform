// const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

// export const getMyPrompt = async (creatorId, status = 'pending') => {
//     const res = await fetch(`${baseUrl}/all-prompts?creatorId=${creatorId}&status=${status}`);
//     return res.json();
// }


// lib/api/prompts.js
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getMyPrompt = async (creatorId, status = 'pending') => {
    const res = await fetch(`${baseUrl}/all-prompts?creatorId=${creatorId}&status=${status}`);
    return res.json();
}