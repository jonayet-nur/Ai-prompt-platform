'use server'
const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;
export const CreatePrompt= async(newPrompt)=>{

    try {
        const res = await fetch(`${baseUrl}/all-prompts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPrompt)
        });

        // fetch only rejects on network failure. We must check res.ok for HTTP errors (400, 500, etc.)
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error('Failed to create prompt:', error);
        // Handle the error appropriately for your app (e.g., rethrow, show a UI alert, etc.)
        return null; 
    }

}
