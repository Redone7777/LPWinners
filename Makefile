.PHONY: all setup front back clean

all: setup

setup:
	@echo "Setting up backend..."
	cd Back && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt
	@echo "Setting up frontend..."
	cd Front && npm install
	@echo "Setup complete! Use 'make back' and 'make front' to start services."

front:
	@echo "Starting frontend (http://localhost:5173)..."
	cd Front && npm run dev

back:
	@echo "Starting backend (http://localhost:8000)..."
	cd Back && source venv/bin/activate && uvicorn main:app --reload

clean:
	@echo "Cleaning up..."
	-rm -rf Back/venv
	-rm -rf Front/node_modules
	@echo "Cleanup complete."