// components/Header.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import RegisterModal from './RegisterModal';

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className="bg-dark text-white py-3 shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <span className="fs-4 fw-bold">Portal Noticias</span>
          </div>
          <div className="d-flex gap-2">
            <Link href="/login" className="btn btn-outline-light">
              Iniciar sesión
            </Link>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Registrarse
            </button>
          </div>
        </div>
      </header>
      <RegisterModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}
