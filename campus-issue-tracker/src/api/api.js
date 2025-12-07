import axios from 'axios'; // We will switch to Axios for cleaner token handling

const API_URL = "http://localhost:3000/api";

// --- Utility function to get the authentication headers ---
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            // The format MUST be 'Bearer ' followed by the token
            Authorization: `Bearer ${token}`,
            // We only set Content-Type here for JSON requests
        }
    };
};

// --- Auth Endpoints ---

// Note: Login and Signup do NOT require an existing token
export const authApi = {
    signup: async (userData) => {
        // Axios automatically sets Content-Type: application/json
        const response = await axios.post(`${API_URL}/auth/signup`, userData);
        return response.data;
    },

    login: async (userData) => {
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        // The successful response contains the token and user data
        return response.data;
    },

    // Simple helper to remove token
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};


// --- Issue Endpoints (Requires Authorization Header) ---

export const api = {
    // 1. FETCH ALL ISSUES (GET)
    fetchIssues: async () => {
        // GET requests pass the config as the second argument
        const response = await axios.get(`${API_URL}/issues`, getAuthHeaders());
        
        if (response.status !== 200) throw new Error("Server error");
        return response.data;
    },

    // 2. CREATE ISSUE (POST)
    createIssue: async (issueData) => {
        const formData = new FormData();
        formData.append("title", issueData.title);
        formData.append("description", issueData.description);
        formData.append("category", issueData.category);
        formData.append("location", issueData.location);
        formData.append("created_by", issueData.created_by || 'Anonymous');
        
        // Append files
        if (issueData.attachments && issueData.attachments.length > 0) {
            Array.from(issueData.attachments).forEach(file => {
                // Key must be "attachments" (plural) to match Multer config
                formData.append("attachments", file);
            });
        }
        
        // When sending FormData, you DO NOT manually set Content-Type.
        // Axios handles it automatically as 'multipart/form-data'.
        
        const config = getAuthHeaders();
        // Remove Content-Type if it was set in getAuthHeaders() for JSON
        delete config.headers['Content-Type']; 

        const response = await axios.post(
            `${API_URL}/issues`, 
            formData, 
            config
        );

        if (response.status !== 201) throw new Error("Failed to create");
        return response.data;
    },

    // 3. UPDATE ISSUE STATUS (PATCH)
    updateIssueStatus: async (id, status) => {
        // PATCH requests send data first, then headers/config
        const response = await axios.patch(
            `${API_URL}/issues/${id}/status`, 
            { status }, // The data to send
            {
                headers: { 
                    ...getAuthHeaders().headers,
                    'Content-Type': 'application/json' 
                }
            }
        );
        
        if (response.status !== 200) throw new Error("Failed to update status");
        return response.data;
    },
};