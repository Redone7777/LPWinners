# 🔐 Guide de Sécurité - LP Winners

## Stockage des Informations Sensibles

### 🎯 Principes de Base

**JAMAIS dans le Frontend** :
- ❌ Pas de mots de passe stockés côté client
- ❌ Pas de clés API dans le code React
- ❌ Pas de secrets dans les variables d'environnement accessibles au navigateur

**TOUJOURS dans le Backend** :
- ✅ Authentification gérée côté serveur
- ✅ Variables d'environnement pour les secrets
- ✅ Base de données pour les informations utilisateur

---

## 📦 Architecture Recommandée

### 1. Variables d'Environnement Backend

**Fichier : `/Back/.env`**
```bash
# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/lpwinners
DATABASE_PASSWORD=super_secure_password_here

# JWT pour l'authentification
JWT_SECRET=votre_secret_jwt_tres_long_et_complexe_ici
JWT_ALGORITHM=HS256
JWT_EXPIRATION=3600  # 1 heure

# Riot API
RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# OAuth (optionnel)
GOOGLE_CLIENT_ID=votre_client_id
GOOGLE_CLIENT_SECRET=votre_client_secret
GITHUB_CLIENT_ID=votre_client_id
GITHUB_CLIENT_SECRET=votre_client_secret

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Email (si notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Important** : Ajouter `.env` au `.gitignore` !

---

### 2. Configuration Backend (FastAPI)

**Fichier : `/Back/config.py`**
```python
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # Database
    database_url: str
    database_password: str
    
    # JWT
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expiration: int = 3600
    
    # Riot API
    riot_api_key: str
    
    # OAuth
    google_client_id: str | None = None
    google_client_secret: str | None = None
    
    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings():
    return Settings()
```

---

### 3. Gestion de l'Authentification JWT

**Fichier : `/Back/auth.py`**
```python
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from config import get_settings

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

def hash_password(password: str) -> str:
    """Hasher un mot de passe"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Vérifier un mot de passe"""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict) -> str:
    """Créer un token JWT"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(seconds=settings.jwt_expiration)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.jwt_secret, 
        algorithm=settings.jwt_algorithm
    )
    return encoded_jwt

def decode_token(token: str) -> dict:
    """Décoder un token JWT"""
    try:
        payload = jwt.decode(
            token, 
            settings.jwt_secret, 
            algorithms=[settings.jwt_algorithm]
        )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalide ou expiré"
        )

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Récupérer l'utilisateur actuel depuis le token"""
    token = credentials.credentials
    payload = decode_token(token)
    user_id = payload.get("sub")
    
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Impossible de valider les credentials"
        )
    
    # TODO: Récupérer l'utilisateur depuis la DB
    return {"id": user_id, "email": payload.get("email")}
```

---

### 4. Routes d'Authentification

**Fichier : `/Back/routes/auth.py`**
```python
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr

from auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    email: EmailStr
    username: str
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

@router.post("/register", response_model=TokenResponse)
async def register(data: RegisterRequest):
    """Inscription d'un nouvel utilisateur"""
    
    # TODO: Vérifier si l'email existe déjà dans la DB
    
    # Hasher le mot de passe
    hashed_password = hash_password(data.password)
    
    # TODO: Sauvegarder l'utilisateur dans la DB
    # user = create_user(email=data.email, username=data.username, password=hashed_password)
    
    # Créer le token JWT
    user_data = {"id": "user123", "email": data.email, "username": data.username}
    token = create_access_token({"sub": user_data["id"], "email": user_data["email"]})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    }

@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest):
    """Connexion d'un utilisateur"""
    
    # TODO: Récupérer l'utilisateur depuis la DB
    # user = get_user_by_email(data.email)
    
    # Simuler un utilisateur (à remplacer par la vraie DB)
    stored_password = hash_password("password123")  # Normalement depuis la DB
    
    # Vérifier le mot de passe
    if not verify_password(data.password, stored_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect"
        )
    
    # Créer le token JWT
    user_data = {"id": "user123", "email": data.email}
    token = create_access_token({"sub": user_data["id"], "email": user_data["email"]})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    }

@router.post("/logout")
async def logout():
    """Déconnexion (côté client, supprimer le token)"""
    return {"message": "Déconnecté avec succès"}
```

---

### 5. Stockage Côté Frontend (React)

**Utiliser localStorage ou sessionStorage pour le token JWT uniquement**

**Fichier : `/Front/src/services/auth.js`**
```javascript
const TOKEN_KEY = 'lp_winners_token';
const USER_KEY = 'lp_winners_user';

export const authService = {
  // Sauvegarder le token après connexion
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Récupérer le token
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Supprimer le token (déconnexion)
  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Sauvegarder les infos utilisateur (NON sensibles)
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // Récupérer les infos utilisateur
  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    return !!this.getToken();
  }
};
```

**Fichier : `/Front/src/services/api.js`**
```javascript
import axios from 'axios';
import { authService } from './auth';

const API_BASE_URL = 'http://localhost:8000';

// Instance Axios avec intercepteur pour ajouter le token
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs 401 (token expiré)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API d'authentification
export const authAPI = {
  async register(email, username, password) {
    const { data } = await api.post('/api/auth/register', {
      email,
      username,
      password,
    });
    authService.setToken(data.access_token);
    authService.setUser(data.user);
    return data;
  },

  async login(email, password) {
    const { data } = await api.post('/api/auth/login', {
      email,
      password,
    });
    authService.setToken(data.access_token);
    authService.setUser(data.user);
    return data;
  },

  async logout() {
    await api.post('/api/auth/logout');
    authService.removeToken();
  },
};

export default api;
```

---

## 🔒 Bonnes Pratiques de Sécurité

### ✅ À FAIRE

1. **Mots de passe** :
   - Utiliser bcrypt pour hasher (minimum 10 rounds)
   - Imposer une longueur minimale (8+ caractères)
   - Exiger des caractères spéciaux

2. **JWT** :
   - Secret long et aléatoire (minimum 32 caractères)
   - Temps d'expiration court (1 heure recommandé)
   - Utiliser HTTPS en production

3. **Base de données** :
   - Utiliser des paramètres préparés (ORM comme SQLAlchemy)
   - Chiffrer les données sensibles au repos
   - Backups réguliers

4. **API** :
   - Rate limiting sur les routes d'authentification
   - CORS configuré correctement
   - Validation des entrées utilisateur

5. **Variables d'environnement** :
   - Jamais commitées dans Git
   - Différentes pour dev/staging/prod
   - Stockées dans un gestionnaire de secrets en prod (AWS Secrets Manager, etc.)

### ❌ À ÉVITER

- ❌ Stocker des mots de passe en clair
- ❌ Utiliser MD5 ou SHA1 pour les mots de passe
- ❌ Token JWT sans expiration
- ❌ Secrets hardcodés dans le code
- ❌ Utiliser HTTP en production (toujours HTTPS)
- ❌ Exposer les détails d'erreur côté client

---

## 📝 Checklist Sécurité

- [ ] `.env` dans `.gitignore`
- [ ] Bcrypt pour les mots de passe
- [ ] JWT avec expiration
- [ ] HTTPS en production
- [ ] CORS configuré
- [ ] Rate limiting sur auth
- [ ] Validation des entrées
- [ ] SQL injection protection (ORM)
- [ ] XSS protection
- [ ] CSRF protection

---

## 🚀 Installation des Dépendances

```bash
# Backend
cd Back
pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt] python-multipart pydantic-settings python-dotenv

# Frontend (déjà installé normalement)
cd Front
npm install axios
```

---

## 🔗 Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [JWT.io](https://jwt.io/)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
