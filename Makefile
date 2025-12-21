.PHONY: all dev setup front back clean stop

all: setup dev

dev:
	@mkdir -p .logs
	@echo "Démarrage des services..."
	@cd Back && bash -c 'source venv/bin/activate && uvicorn main:app --reload > ../.logs/back.log 2>&1 & echo $$! > ../.logs/back.pid'
	@cd Front && bash -c 'bun run dev > ../.logs/front.log 2>&1 & echo $$! > ../.logs/front.pid'
	@sleep 2
	@if [ -f .logs/back.pid ]; then echo "✓ Backend: http://localhost:8000 (PID: $$(cat .logs/back.pid))"; else echo "✗ Backend non démarré"; fi
	@if [ -f .logs/front.pid ]; then echo "✓ Frontend: http://localhost:5173 (PID: $$(cat .logs/front.pid))"; else echo "✗ Frontend non démarré"; fi
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
	@-if [ -f .logs/back.pid ]; then PID=$$(cat .logs/back.pid); pkill -P $$PID 2>/dev/null || true; kill $$PID 2>/dev/null || true; rm -f .logs/back.pid; echo "✓ Backend arrêté"; else echo "✓ Backend déjà arrêté"; fi
	@-if [ -f .logs/front.pid ]; then PID=$$(cat .logs/front.pid); pkill -P $$PID 2>/dev/null || true; kill $$PID 2>/dev/null || true; rm -f .logs/front.pid; echo "✓ Frontend arrêté"; else echo "✓ Frontend déjà arrêté"; fi

clean:
	@-find Back -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@-rm -rf Back/venv Front/node_modules Front/bun.lock .logs
	@echo "✓ Nettoyage terminé"