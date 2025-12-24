# LPWinners - Makefile

.PHONY: front back install clean

front:
	@echo "LPWinners sur http://localhost:3000"
	@cd Front && npx -y serve -p 3000

install:
	@cd Back && python3 -m venv .venv && ./.venv/bin/pip install -r requirements.txt

back: install
	@echo "API sur http://localhost:8000"
	@cd Back && ./.venv/bin/uvicorn main:app --reload --port 8000

clean:
	@echo "Nettoyage des fichiers temporaires..."
	@find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@find . -type f -name "*.pyc" -delete 2>/dev/null || true
	@rm -rf Back/.venv
	@echo "Nettoyage terminé!"
