PYTHON = python3
NPM = npm
VENV_ACTIVATE = . venv/bin/activate

BACK_DIR = Back
FRONT_DIR = Front
LOGS_DIR = .logs

.PHONY: all setup dev start front back stop restart clean clean-all logs status build

all: setup dev

setup: install

install:
	@cd $(BACK_DIR) && $(PYTHON) -m venv venv && $(VENV_ACTIVATE) && pip install -r requirements.txt
	@cd $(FRONT_DIR) && $(NPM) install

dev: start

start:
	@mkdir -p $(LOGS_DIR)
	@cd $(BACK_DIR) && bash -c '$(VENV_ACTIVATE) && uvicorn main:app --reload > ../$(LOGS_DIR)/back.log 2>&1 & echo $$! > ../$(LOGS_DIR)/back.pid'
	@cd $(FRONT_DIR) && bash -c '$(NPM) run dev > ../$(LOGS_DIR)/front.log 2>&1 & echo $$! > ../$(LOGS_DIR)/front.pid'
	@sleep 2
	@if [ -f $(LOGS_DIR)/back.pid ]; then echo "✓ Backend:  http://localhost:8000"; fi
	@if [ -f $(LOGS_DIR)/front.pid ]; then echo "✓ Frontend: http://localhost:5173"; fi

front:
	@cd $(FRONT_DIR) && $(NPM) run dev

back:
	@cd $(BACK_DIR) && $(VENV_ACTIVATE) && uvicorn main:app --reload

stop:
	@if [ -f $(LOGS_DIR)/back.pid ]; then kill $$(cat $(LOGS_DIR)/back.pid) 2>/dev/null || true; rm -f $(LOGS_DIR)/back.pid; fi
	@if [ -f $(LOGS_DIR)/front.pid ]; then kill $$(cat $(LOGS_DIR)/front.pid) 2>/dev/null || true; rm -f $(LOGS_DIR)/front.pid; fi

restart: stop start

status:
	@if [ -f $(LOGS_DIR)/back.pid ] && ps -p $$(cat $(LOGS_DIR)/back.pid) > /dev/null 2>&1; then \
		echo "✓ Backend:  Running (PID: $$(cat $(LOGS_DIR)/back.pid))"; \
	else \
		echo "✗ Backend:  Stopped"; \
	fi
	@if [ -f $(LOGS_DIR)/front.pid ] && ps -p $$(cat $(LOGS_DIR)/front.pid) > /dev/null 2>&1; then \
		echo "✓ Frontend: Running (PID: $$(cat $(LOGS_DIR)/front.pid))"; \
	else \
		echo "✗ Frontend: Stopped"; \
	fi

logs:
	@tail -f $(LOGS_DIR)/*.log 2>/dev/null || echo "No logs available"

build:
	@cd $(FRONT_DIR) && $(NPM) run build

clean:
	@find $(BACK_DIR) -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	@rm -rf $(LOGS_DIR) $(FRONT_DIR)/dist

clean-all: clean
	@rm -rf $(BACK_DIR)/venv $(FRONT_DIR)/node_modules $(FRONT_DIR)/package-lock.json