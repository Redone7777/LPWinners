/**
 * LPWinners - Filters Component
 * Handles filtering logic for champions, items, etc.
 */

class ChampionFilters {
    constructor() {
        this.filters = {
            search: '',
            position: 'all',
            role: 'all',
            costMin: 450,
            costMax: 6300,
            difficulty: 'all'
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.initRangeSlider();
        this.initCollapsibleSections();
    }

    bindEvents() {
        // Search input
        const searchInput = document.getElementById('champion-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // Position radio buttons
        document.querySelectorAll('input[name="position"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.filters.position = e.target.value;
                this.applyFilters();
            });
        });

        // Role pills
        document.querySelectorAll('.role-pills .pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                document.querySelectorAll('.role-pills .pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                this.filters.role = pill.dataset.role;
                this.applyFilters();
            });
        });

        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filters.difficulty = btn.dataset.difficulty;
                this.applyFilters();
            });
        });
    }

    initRangeSlider() {
        const minInput = document.getElementById('cost-min');
        const maxInput = document.getElementById('cost-max');
        const minValue = document.getElementById('cost-min-value');
        const maxValue = document.getElementById('cost-max-value');
        const fill = document.querySelector('.range-slider-fill');

        if (!minInput || !maxInput) return;

        const updateSlider = () => {
            const min = parseInt(minInput.value);
            const max = parseInt(maxInput.value);

            // Prevent overlap
            if (min > max) {
                minInput.value = max;
            }

            this.filters.costMin = parseInt(minInput.value);
            this.filters.costMax = parseInt(maxInput.value);

            // Update display values
            if (minValue) minValue.textContent = `${this.filters.costMin} BE`;
            if (maxValue) maxValue.textContent = `${this.filters.costMax} BE`;

            // Update fill bar
            if (fill) {
                const minPercent = ((this.filters.costMin - 450) / (6300 - 450)) * 100;
                const maxPercent = ((this.filters.costMax - 450) / (6300 - 450)) * 100;
                fill.style.left = `${minPercent}%`;
                fill.style.right = `${100 - maxPercent}%`;
            }

            this.applyFilters();
        };

        minInput.addEventListener('input', updateSlider);
        maxInput.addEventListener('input', updateSlider);

        // Initial update
        updateSlider();
    }

    initCollapsibleSections() {
        document.querySelectorAll('.filter-header').forEach(header => {
            header.addEventListener('click', () => {
                const targetId = header.dataset.collapse;
                const content = document.getElementById(`${targetId}-filter`);

                if (content) {
                    header.classList.toggle('collapsed');
                    content.classList.toggle('collapsed');
                }
            });
        });
    }

    applyFilters() {
        const cards = document.querySelectorAll('.champion-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const name = card.querySelector('.champion-card-name')?.textContent.toLowerCase() || '';
            const title = card.querySelector('.champion-card-title')?.textContent.toLowerCase() || '';

            // Search filter
            const matchesSearch = !this.filters.search ||
                name.includes(this.filters.search) ||
                title.includes(this.filters.search);

            // For now, show all cards that match search
            // In a real app, you'd have data attributes for position, role, cost, difficulty
            const isVisible = matchesSearch;

            card.style.display = isVisible ? '' : 'none';
            card.style.opacity = isVisible ? '1' : '0';

            if (isVisible) visibleCount++;
        });

        // Show empty state if no results
        this.toggleEmptyState(visibleCount === 0);
    }

    toggleEmptyState(show) {
        let emptyState = document.querySelector('.champions-empty-state');

        if (show && !emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'champions-empty-state empty-state';
            emptyState.innerHTML = `
        <div class="empty-state-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </div>
        <h3 class="empty-state-title">Aucun champion trouvé</h3>
        <p class="empty-state-description">Essayez d'ajuster vos filtres ou votre recherche</p>
      `;
            document.getElementById('champions-grid')?.appendChild(emptyState);
        } else if (!show && emptyState) {
            emptyState.remove();
        }
    }
}

// Item Filters
class ItemFilters {
    constructor() {
        this.filters = {
            search: '',
            category: 'all'
        };

        this.init();
    }

    init() {
        // Search input
        const searchInput = document.getElementById('item-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // Category tabs
        document.querySelectorAll('.items-tabs .tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.items-tabs .tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.filters.category = tab.dataset.category;
                this.applyFilters();
            });
        });
    }

    applyFilters() {
        const items = document.querySelectorAll('.item-card');

        items.forEach(item => {
            const name = item.dataset.name?.toLowerCase() || '';
            const matchesSearch = !this.filters.search || name.includes(this.filters.search);

            item.style.display = matchesSearch ? '' : 'none';
        });
    }
}

// Initialize appropriate filters based on current page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('champions')) {
        new ChampionFilters();
    } else if (path.includes('items')) {
        new ItemFilters();
    }
});

export { ChampionFilters, ItemFilters };
