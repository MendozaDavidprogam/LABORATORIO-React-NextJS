'use client';

import { useState } from 'react';
import RegisterModal from './RegisterModal';
import LoginModal from './loginModal';
import ArticuloModal from './ArticlesModal';

export default function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showArticleModel, setShowArticleModal] = useState(false);
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  const handleLogout = () => {
    setUser(null);
  };

  const handleLoginSuccess = (usuario) => {
    setUser(usuario);
  };

  return (
    <>
      <header className="bg-dark text-white py-3 shadow">
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-4 fw-bold">Portal Noticias</span>
          </div>
          <div className="flex-grow-1 mx-4">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar noticias..."
                aria-label="Buscar"
              />
              <button className="btn btn-outline-light" type="submit" disabled>
                Buscar
              </button>
            </form>
          </div>
          <div className="d-flex gap-2">
            {!isAuthenticated ? (
              <>
                <button className="btn btn-primary" onClick={() => setShowLoginModal(true)}>
                  Iniciar Sesión
                </button>
                <button className="btn btn-primary" onClick={() => setShowRegisterModal(true)}>
                  Registrarse
                </button>
              </>
            ) : (
              <>
                {user?.rol === 'publicador' && (
                  <button className="btn btn-primary" onClick={() => setShowArticleModal(true)}>
                    Registrar Artículo
                  </button>
                )}
                <button className="btn btn-danger" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <RegisterModal
        show={showRegisterModal}
        handleClose={() => setShowRegisterModal(false)}
      />

      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ArticuloModal
        show={showArticleModel}
        handleClose={() => setShowArticleModal(false)}
      />
    </>
  );
}

