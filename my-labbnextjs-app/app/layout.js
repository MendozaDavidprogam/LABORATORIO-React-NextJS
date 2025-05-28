// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Portal de Noticias',
  description: 'Aplicación web de noticias con Next.js y MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="d-flex flex-column min-vh-100">
        {children}
      </body>
    </html>
  );
}
