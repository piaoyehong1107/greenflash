import axios from 'axios';

export async function fetchLLMResponse(apiKey: string, query: string): Promise<void> {
    try {
        const response = await axios.post('https://api.example.com/llm', {
            apiKey,
            query
        });
        // return response.data.result;
    } catch (error) {
        console.error('Error fetching LLM response:', error);
        throw error;
    }
}