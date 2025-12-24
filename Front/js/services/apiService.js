/**
 * LPWinners - API Service Layer
 * Centralized API calls for the database component
 */

// Base configuration - Backend sur localhost:8000
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Request timeout in milliseconds
const REQUEST_TIMEOUT = 10000;

/**
 * Generic API request wrapper with error handling and timeout
 * @param {string} endpoint - API endpoint path
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Parsed JSON response
 */
async function apiRequest(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const error = new Error(`API Error: ${response.status} ${response.statusText}`);
            error.status = response.status;
            throw error;
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            throw new Error('Request timeout: The server took too long to respond');
        }

        throw error;
    }
}

/**
 * Build query string from filter object
 * @param {Object} filters - Filter key-value pairs
 * @returns {string} Query string (without leading ?)
 */
function buildQueryString(filters = {}) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
            params.append(key, value);
        }
    });

    return params.toString();
}

/**
 * Fetch champions data with optional filters
 * @param {Object} filters - { role, difficulty }
 * @returns {Promise<Array>} Champions array
 */
export async function fetchChampions(filters = {}) {
    const queryString = buildQueryString(filters);
    const endpoint = `/champions${queryString ? `?${queryString}` : ''}`;
    const response = await apiRequest(endpoint);
    return response.data || response;
}

/**
 * Fetch items data with optional filters
 * @param {Object} filters - { category }
 * @returns {Promise<Array>} Items array
 */
export async function fetchItems(filters = {}) {
    const queryString = buildQueryString(filters);
    const endpoint = `/items${queryString ? `?${queryString}` : ''}`;
    const response = await apiRequest(endpoint);
    return response.data || response;
}

/**
 * Fetch runes data with optional filters
 * @param {Object} filters - { tree }
 * @returns {Promise<Array>} Runes array
 */
export async function fetchRunes(filters = {}) {
    const queryString = buildQueryString(filters);
    const endpoint = `/runes${queryString ? `?${queryString}` : ''}`;
    const response = await apiRequest(endpoint);
    return response.data || response;
}

/**
 * Fetch champion spells/abilities data
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Spells array
 */
export async function fetchSpells(filters = {}) {
    const queryString = buildQueryString(filters);
    const endpoint = `/spells${queryString ? `?${queryString}` : ''}`;
    const response = await apiRequest(endpoint);
    return response.data || response;
}

/**
 * Fetch summoner spells data
 * @returns {Promise<Array>} Summoner spells array
 */
export async function fetchSummoners() {
    const response = await apiRequest('/summoners');
    return response.data || response;
}

// Export configuration for testing/mocking
export { API_BASE_URL, REQUEST_TIMEOUT };
