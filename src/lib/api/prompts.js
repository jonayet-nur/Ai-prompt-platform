const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (creatorId, status = 'pending') => {
    const res = await fetch(`${baseUrl}/all-prompts?creatorId=${creatorId}&status=${status}`);
    return res.json();
}