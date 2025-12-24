/**
 * LPWinners - Wizard Component
 * Multi-step form navigation and live preview
 */

class PostWizard {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 3;
        this.data = {
            type: 'guide',
            title: '',
            champion: null,
            runes: [],
            items: [],
            content: ''
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updatePreview();
    }

    bindEvents() {
        // Navigation buttons
        document.getElementById('prev-btn')?.addEventListener('click', () => this.prevStep());
        document.getElementById('next-btn')?.addEventListener('click', () => this.nextStep());

        // Post type selection
        document.querySelectorAll('.post-type-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.post-type-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.data.type = card.querySelector('input').value;
                this.updatePreview();
            });
        });

        // Title input
        document.getElementById('post-title')?.addEventListener('input', (e) => {
            this.data.title = e.target.value;
            this.updatePreview();
        });

        // Champion selection
        document.querySelectorAll('.champion-select-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.champion-select-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                this.data.champion = item.dataset.champion;
                this.updatePreview();
            });
        });

        // Champion search
        document.getElementById('champion-search')?.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            document.querySelectorAll('.champion-select-item').forEach(item => {
                const name = item.dataset.champion.toLowerCase();
                item.style.display = name.includes(query) ? '' : 'none';
            });
        });
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            // Validate current step
            if (!this.validateStep(this.currentStep)) {
                return;
            }

            this.currentStep++;
            this.updateUI();
        } else {
            // Submit form
            this.submit();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }

    validateStep(step) {
        switch (step) {
            case 1:
                if (!this.data.title.trim()) {
                    this.showError('Veuillez entrer un titre');
                    return false;
                }
                return true;
            case 2:
                return true;
            case 3:
                return true;
            default:
                return true;
        }
    }

    showError(message) {
        // Simple alert for now - could be enhanced with toast notifications
        alert(message);
    }

    updateUI() {
        // Update step indicators
        document.querySelectorAll('.wizard-step').forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove('active', 'completed');

            if (stepNum === this.currentStep) {
                step.classList.add('active');
            } else if (stepNum < this.currentStep) {
                step.classList.add('completed');
            }
        });

        // Update panels
        document.querySelectorAll('.wizard-panel').forEach((panel, index) => {
            panel.classList.toggle('active', index + 1 === this.currentStep);
        });

        // Update navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 1;
        }

        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.innerHTML = `
          Publier
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        `;
            } else {
                nextBtn.innerHTML = `
          Suivant
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        `;
            }
        }
    }

    updatePreview() {
        // Update title preview
        const titlePreview = document.getElementById('preview-title');
        if (titlePreview) {
            titlePreview.textContent = this.data.title || 'Votre titre apparaîtra ici...';
        }

        // Update type preview
        const typePreview = document.getElementById('preview-type');
        if (typePreview) {
            const typeLabels = {
                guide: 'Guide',
                discussion: 'Discussion',
                question: 'Question'
            };
            typePreview.textContent = typeLabels[this.data.type] || 'Guide';
        }

        // Update champion preview
        const championPreview = document.getElementById('preview-champion');
        if (championPreview) {
            if (this.data.champion) {
                championPreview.textContent = '✓';
                championPreview.classList.remove('pending');
                championPreview.classList.add('completed');
            } else {
                championPreview.textContent = '●';
                championPreview.classList.add('pending');
                championPreview.classList.remove('completed');
            }
        }

        // Update build preview
        const buildPreview = document.getElementById('preview-build');
        if (buildPreview) {
            buildPreview.textContent = `${this.data.items.length}/6`;
        }
    }

    submit() {
        console.log('Submitting post:', this.data);
        // In a real app, this would make an API call
        alert('Post créé avec succès ! (simulation)');
        window.location.href = 'forum.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.wizard-layout')) {
        new PostWizard();
    }
});

export { PostWizard };
