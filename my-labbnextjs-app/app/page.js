// app/page.js

import { connectDB } from './utils/db';
import Articulo from './models/Articulo';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticuloCard from './components/ArticuloCard';

export default async function Home() {
  await connectDB();

  const articulosRaw = await Articulo.find().sort({ articuloId: -1 }).lean();

  const articulos = articulosRaw.map((articulo) => ({
    ...articulo,
    _id: articulo._id.toString(),
    categoria: articulo.categoria?.toString() || '',
    articuloId: articulo.articuloId?.toString() || '', // Cambio aquí
  }));

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-4 flex-grow-1">
        <h1 className="mb-4 text-center">Artículos Publicados</h1>
        {articulos.length === 0 ? (
          <p className="text-center">No hay artículos disponibles.</p>
        ) : (
          <div className="row">
            {articulos.map((articulo) => (
              <div key={articulo._id} className="col-md-6 mb-4">
                <ArticuloCard articulo={articulo} />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}