# LPWinners - Makefile

.PHONY: front back install back-clean

front:
	@echo "LPWinners sur http://localhost:3000"
	@cd Front && npx -y serve -p 3000

install:
	@cd Back && python3 -m venv .venv && ./.venv/bin/pip install -r requirements.txt

back: install
	@echo "API sur http://localhost:8000"
	@cd Back && ./.venv/bin/uvicorn main:app --reload --port 8000

back-clean:
	@rm -rf Back/.venv
