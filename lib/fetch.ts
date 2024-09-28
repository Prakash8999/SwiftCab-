import axios, { AxiosRequestConfig } from 'axios';

export const fetchAPI = async (url: string, options?: AxiosRequestConfig) => {
    try {
        const response = await axios({
            url,
            ...options
        });
console.log(response);

        return response.data; // axios stores the response data in 'data'
    } catch (error:any) {
        console.error("Fetch error:", error);
        if (axios.isAxiosError(error)) {
				const message = error.response?.data || "An unexpected error occurred"; // Log full error response
				console.log("Error:", message); // This will log the entire error response
                throw message;
			} else {
                throw error.message
				console.log("Error:", error.message);
			}

    }
};
