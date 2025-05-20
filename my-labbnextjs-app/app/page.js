// app/page.js
import { connectDB } from './utils/db';
import News from './models/News';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsCard from './components/NewsCard';

export default async function Home() {
  await connectDB();
  const articles = await News.find().sort({ date: -1 }).limit(10).lean();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container py-4 flex-grow-1">
        <h1 className="mb-4 text-center">Últimas Noticias</h1>
        {articles.length === 0 ? (
          <p className="text-center">No hay noticias disponibles.</p>
        ) : (
          <div className="row">
            {articles.map((article) => (
              <div key={article._id} className="col-md-6 mb-4">
                <NewsCard article={article} />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
