/**
 * LPWinners - Database Controller
 * Handles tab switching, filtering, and dynamic data loading via API
 */

import {
    fetchChampions,
    fetchItems,
    fetchRunes,
    fetchSpells,
    fetchSummoners
} from '../services/apiService.js';

class DatabaseController {
    constructor() {
        this.currentTab = 'champions';
        this.searchQuery = '';
        this.filters = {
            role: 'all',
            difficulty: 'all',
            category: 'all',
            tree: 'all'
        };

        // Cache for fetched data (enables client-side filtering)
        this.dataCache = {
            champions: null,
            items: null,
            runes: null,
            spells: null,
            summoners: null
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadData(this.currentTab);
        this.updateFilterVisibility();
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.db-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Search input
        const searchInput = document.getElementById('db-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterContent();
            });
        }

        // Role filter
        document.querySelectorAll('.filter-role[data-role]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-role[data-role]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filters.role = btn.dataset.role;
                this.filterContent();
            });
        });

        // Category filter
        document.querySelectorAll('.filter-role[data-category]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-role[data-category]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filters.category = btn.dataset.category;
                this.filterContent();
            });
        });

        // Tree filter
        document.querySelectorAll('.filter-role[data-tree]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-role[data-tree]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filters.tree = btn.dataset.tree;
                this.filterContent();
            });
        });

        // Difficulty filter
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filters.difficulty = btn.dataset.difficulty;
                this.filterContent();
            });
        });

        // Filter collapse
        document.querySelectorAll('.filter-header').forEach(header => {
            header.addEventListener('click', () => {
                header.classList.toggle('collapsed');
                const content = header.nextElementSibling;
                if (content) {
                    content.classList.toggle('collapsed');
                }
            });
        });
    }

    switchTab(tabName) {
        // Update tab UI
        document.querySelectorAll('.db-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update panel visibility
        document.querySelectorAll('.db-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        const activePanel = document.getElementById(`panel-${tabName}`);
        if (activePanel) {
            activePanel.classList.add('active');
        }

        this.currentTab = tabName;
        this.updateFilterVisibility();
        this.loadData(tabName);
    }

    updateFilterVisibility() {
        // Position filter only for champions
        const positionSection = document.getElementById('position-section');
        const difficultySection = document.getElementById('difficulty-section');
        const itemCategorySection = document.getElementById('item-category-section');
        const runeTreeSection = document.getElementById('rune-tree-section');

        if (positionSection) {
            positionSection.classList.toggle('hidden', this.currentTab !== 'champions');
        }
        if (difficultySection) {
            difficultySection.classList.toggle('hidden', this.currentTab !== 'champions');
        }
        if (itemCategorySection) {
            itemCategorySection.classList.toggle('hidden', this.currentTab !== 'items');
        }
        if (runeTreeSection) {
            runeTreeSection.classList.toggle('hidden', this.currentTab !== 'runes');
        }
    }

    /**
     * Show loading skeleton in the grid
     * @param {HTMLElement} grid - The grid element to show loading in
     * @param {number} count - Number of skeleton cards to show
     */
    showLoadingSkeleton(grid, count = 8) {
        const skeletons = Array(count).fill(null).map(() => `
            <div class="skeleton-card">
                <div class="skeleton-loader"></div>
            </div>
        `).join('');

        grid.innerHTML = `
            <div class="loading-placeholder">
                ${skeletons}
                <span class="text-muted">Chargement...</span>
            </div>
        `;
    }

    /**
     * Show error state in the grid
     * @param {HTMLElement} grid - The grid element
     * @param {string} message - Error message to display
     * @param {Function} retryCallback - Optional callback for retry button
     */
    showErrorState(grid, message = 'Impossible de charger les données.', retryCallback = null) {
        grid.innerHTML = `
            <div class="empty-state error-state">
                <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m15 9-6 6"/>
                    <path d="m9 9 6 6"/>
                </svg>
                <h3 class="empty-state-title">Erreur de chargement</h3>
                <p class="empty-state-text">${message}</p>
                ${retryCallback ? '<button class="retry-btn">Réessayer</button>' : ''}
            </div>
        `;

        if (retryCallback) {
            const retryBtn = grid.querySelector('.retry-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', retryCallback);
            }
        }
    }

    /**
     * Main data loading method - fetches from API and renders
     * @param {string} type - The data type to load
     * @param {boolean} forceRefresh - Force API call even if data is cached
     */
    async loadData(type, forceRefresh = false) {
        const grid = document.getElementById(`${type}-grid`);
        if (!grid) return;

        // Show loading state
        this.showLoadingSkeleton(grid);

        try {
            let data;

            // Check cache first (unless force refresh)
            if (!forceRefresh && this.dataCache[type]) {
                data = this.dataCache[type];
            } else {
                // Fetch from API
                data = await this.fetchData(type);
                this.dataCache[type] = data;
            }

            // Render the data
            this.renderData(type, grid, data);

        } catch (error) {
            console.error(`Error loading ${type}:`, error);
            this.showErrorState(
                grid,
                this.getErrorMessage(error),
                () => this.loadData(type, true)
            );
        }
    }

    /**
     * Fetch data from API based on type
     * @param {string} type - Data type to fetch
     * @returns {Promise<Array>} Fetched data
     */
    async fetchData(type) {
        switch (type) {
            case 'champions':
                return await fetchChampions();
            case 'items':
                return await fetchItems();
            case 'runes':
                return await fetchRunes();
            case 'spells':
                return await fetchSpells();
            case 'summoners':
                return await fetchSummoners();
            default:
                throw new Error(`Unknown data type: ${type}`);
        }
    }

    /**
     * Route rendering to appropriate method
     * @param {string} type - Data type
     * @param {HTMLElement} grid - Grid element
     * @param {Array} data - Data to render
     */
    renderData(type, grid, data) {
        switch (type) {
            case 'champions':
                this.renderChampions(grid, data);
                break;
            case 'items':
                this.renderItems(grid, data);
                break;
            case 'runes':
                this.renderRunes(grid, data);
                break;
            case 'spells':
                this.renderSpells(grid, data);
                break;
            case 'summoners':
                this.renderSummoners(grid, data);
                break;
        }
    }

    /**
     * Get user-friendly error message
     * @param {Error} error - The error object
     * @returns {string} User-friendly message
     */
    getErrorMessage(error) {
        if (error.message.includes('timeout')) {
            return 'Le serveur met trop de temps à répondre. Veuillez réessayer.';
        }
        if (error.status === 404) {
            return 'Les données demandées sont introuvables.';
        }
        if (error.status >= 500) {
            return 'Erreur serveur. Veuillez réessayer plus tard.';
        }
        if (error.message.includes('fetch')) {
            return 'Impossible de se connecter au serveur. Vérifiez votre connexion.';
        }
        return 'Impossible de charger les données.';
    }

    /**
     * Render champions grid
     * @param {HTMLElement} grid - Grid element
     * @param {Array} champions - Champions data
     */
    renderChampions(grid, champions) {
        if (!champions || champions.length === 0) {
            this.showEmptyState(grid, 'Aucun champion trouvé.');
            return;
        }

        grid.innerHTML = champions.map(champ => `
            <a href="#" class="champion-card" data-role="${champ.role}" data-difficulty="${champ.difficulty || 'medium'}">
                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg" 
                     alt="${champ.name}" loading="lazy">
                <div class="champion-card-content">
                    <span class="champion-card-name">${champ.name}</span>
                    <span class="champion-card-title">${champ.title}</span>
                </div>
            </a>
        `).join('');
    }

    /**
     * Render items grid
     * @param {HTMLElement} grid - Grid element
     * @param {Array} items - Items data
     */
    renderItems(grid, items) {
        if (!items || items.length === 0) {
            this.showEmptyState(grid, 'Aucun objet trouvé.');
            return;
        }

        grid.innerHTML = items.map(item => `
            <div class="item-card" data-category="${item.category || 'all'}">
                <img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${item.id}.png" 
                     alt="${item.name}" class="item-card-icon">
                <div class="item-card-info">
                    <span class="item-card-name">${item.name}</span>
                    <span class="item-card-price">${item.price}</span>
                    <span class="item-card-stats">${item.stats}</span>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render runes grid
     * @param {HTMLElement} grid - Grid element
     * @param {Array} runes - Runes data
     */
    renderRunes(grid, runes) {
        if (!runes || runes.length === 0) {
            this.showEmptyState(grid, 'Aucune rune trouvée.');
            return;
        }

        grid.innerHTML = runes.map(rune => `
            <div class="rune-card ${rune.keystone ? 'keystone' : ''}" data-tree="${rune.tree}">
                <img src="https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${rune.tree}/${rune.id}/${rune.id}.png" 
                     alt="${rune.name}" class="rune-card-icon" 
                     onerror="this.src='https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png'">
                <span class="rune-card-name">${rune.name}</span>
                <span class="rune-card-tree">${rune.tree}</span>
            </div>
        `).join('');
    }

    /**
     * Render spells grid
     * @param {HTMLElement} grid - Grid element
     * @param {Array} spells - Spells data
     */
    renderSpells(grid, spells) {
        if (!spells || spells.length === 0) {
            this.showEmptyState(grid, 'Aucun sort trouvé.');
            return;
        }

        grid.innerHTML = spells.map(spell => `
            <div class="spell-card">
                <img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/${spell.id}.png" 
                     alt="${spell.name}" class="spell-card-icon"
                     onerror="this.src='https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerFlash.png'">
                <div class="spell-card-info">
                    <div class="spell-card-header">
                        <span class="spell-card-name">${spell.name}</span>
                        <span class="spell-card-cost">${spell.cost} Mana</span>
                    </div>
                    <p class="spell-card-desc">${spell.desc}</p>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render summoner spells grid
     * @param {HTMLElement} grid - Grid element
     * @param {Array} summoners - Summoner spells data
     */
    renderSummoners(grid, summoners) {
        if (!summoners || summoners.length === 0) {
            this.showEmptyState(grid, 'Aucun sort d\'invocateur trouvé.');
            return;
        }

        grid.innerHTML = summoners.map(spell => `
            <div class="summoner-card">
                <img src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/${spell.id}.png" 
                     alt="${spell.name}" class="summoner-card-icon">
                <div class="summoner-card-info">
                    <span class="summoner-card-name">${spell.name}</span>
                    <span class="summoner-card-cooldown">${spell.cooldown}</span>
                </div>
            </div>
        `).join('');
    }

    /**
     * Show empty state message
     * @param {HTMLElement} grid - Grid element
     * @param {string} message - Message to display
     */
    showEmptyState(grid, message) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                </svg>
                <h3 class="empty-state-title">Aucun résultat</h3>
                <p class="empty-state-text">${message}</p>
            </div>
        `;
    }

    /**
     * Filter displayed content based on current filters
     * Uses cached data for client-side filtering
     */
    filterContent() {
        const grid = document.getElementById(`${this.currentTab}-grid`);
        if (!grid) return;

        const cards = grid.querySelectorAll('[class*="-card"]');
        cards.forEach(card => {
            let visible = true;

            // Search filter
            if (this.searchQuery) {
                const name = card.querySelector('[class*="-name"]')?.textContent.toLowerCase() || '';
                visible = name.includes(this.searchQuery);
            }

            // Role filter (for champions)
            if (visible && this.filters.role !== 'all' && this.currentTab === 'champions') {
                const cardRole = card.dataset.role;
                visible = cardRole === this.filters.role;
            }

            // Difficulty filter (for champions)
            if (visible && this.filters.difficulty !== 'all' && this.currentTab === 'champions') {
                const cardDifficulty = card.dataset.difficulty;
                visible = cardDifficulty === this.filters.difficulty;
            }

            // Category filter (for items)
            if (visible && this.filters.category !== 'all' && this.currentTab === 'items') {
                const cardCategory = card.dataset.category;
                visible = cardCategory === this.filters.category;
            }

            // Tree filter (for runes)
            if (visible && this.filters.tree !== 'all' && this.currentTab === 'runes') {
                const cardTree = card.dataset.tree;
                visible = cardTree === this.filters.tree;
            }

            card.style.display = visible ? '' : 'none';
        });

        // Check if all cards are hidden
        const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
        if (visibleCards.length === 0 && cards.length > 0) {
            // Show empty state
            const existingEmpty = grid.querySelector('.empty-state');
            if (!existingEmpty) {
                grid.insertAdjacentHTML('beforeend', `
                    <div class="empty-state">
                        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.3-4.3"/>
                        </svg>
                        <h3 class="empty-state-title">Aucun résultat</h3>
                        <p class="empty-state-text">Essayez d'autres filtres ou termes de recherche.</p>
                    </div>
                `);
            }
        } else {
            const existingEmpty = grid.querySelector('.empty-state');
            if (existingEmpty) existingEmpty.remove();
        }
    }

    /**
     * Clear cache for a specific type or all types
     * @param {string|null} type - Type to clear, or null for all
     */
    clearCache(type = null) {
        if (type) {
            this.dataCache[type] = null;
        } else {
            Object.keys(this.dataCache).forEach(key => {
                this.dataCache[key] = null;
            });
        }
    }

    /**
     * Refresh current tab data from API
     */
    refresh() {
        this.loadData(this.currentTab, true);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.db-tabs')) {
        window.databaseController = new DatabaseController();
    }
});

export { DatabaseController };
