.PHONY: all dev setup front back clean stop

all: setup dev

dev:
	@echo "Démarrage des services..."
	@cd Back && bash -c 'source venv/bin/activate && uvicorn main:app --reload > ../back.log 2>&1 & echo $$! > ../back.pid'
	@cd Front && bash -c 'bun run dev > ../front.log 2>&1 & echo $$! > ../front.pid'
	@sleep 2
	@if [ -f back.pid ]; then echo "✓ Backend: http://localhost:8000 (PID: $$(cat back.pid))"; else echo "✗ Backend non démarré"; fi
	@if [ -f front.pid ]; then echo "✓ Frontend: http://localhost:5173 (PID: $$(cat front.pid))"; else echo "✗ Frontend non démarré"; fi
	@echo "Arrêt: make stop"

setup:
	@cd Back && python3 -m venv venv && . venv/bin/activate && pip install -r requirements.txt
	@cd Front && bun install
	@echo "✓ Installation terminée"

front:
	@cd Front && bun run dev

back:
	@cd Back && . venv/bin/activate && uvicorn main:app --reload

stop:
	@echo "Arrêt des services..."
	@-if [ -f back.pid ]; then PID=$$(cat back.pid); pkill -P $$PID 2>/dev/null || true; kill $$PID 2>/dev/null || true; rm -f back.pid; echo "✓ Backend arrêté"; else echo "✓ Backend déjà arrêté"; fi
	@-if [ -f front.pid ]; then PID=$$(cat front.pid); pkill -P $$PID 2>/dev/null || true; kill $$PID 2>/dev/null || true; rm -f front.pid; echo "✓ Frontend arrêté"; else echo "✓ Frontend déjà arrêté"; fi

clean:
	@-find Back -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@-rm -rf Back/venv Front/node_modules Front/bun.lock
	@-rm -f back.pid front.pid back.log front.log
	@echo "✓ Nettoyage terminé"