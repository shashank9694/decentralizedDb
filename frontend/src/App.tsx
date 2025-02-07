import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import type { Book } from './types';
import Homepage from './pages/homepage';
import Header from './pages/header';
import UploadPage from './pages/upload';
import Footer from './pages/footer';
import { ToastContainer} from 'react-toastify';


function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    console.log("Fetching Books...",books);
    const getBooks = async () => {
      const response = await fetch('http://localhost:4000/books');
      const data = await response.json();
      setBooks(data);
    };
    getBooks();
  }, []);

  // ✅ Animated Title and Favicon
  useEffect(() => {
    const frames = [
      { title: "🌍 D", favicon: "/vite1.gif" },
      { title: "🌍 De", favicon: "/vite1.gif" },
      { title: "🌍 Dec", favicon: "/vite1.gif" },
      { title: "🌍 Dece", favicon: "/vite1.gif" },
      { title: "🌍 Decen", favicon: "/vite1.gif" },
      { title: "🌍 Decent", favicon: "/vite1.gif" },
      { title: "🌍 Decentr", favicon: "/vite1.gif" },
      { title: "🌍 Decentra", favicon: "/vite1.gif" },
      { title: "🌍 Decentral", favicon: "/vite1.gif" },
      { title: "🌍 Decentrali", favicon: "/vite1.gif" },
      { title: "🌍 Decentraliz", favicon: "/vite1.gif" },
      { title: "🌍 Decentralize", favicon: "/vite1.gif" },
      { title: "🌍 Decentralized", favicon: "/vite1.gif" },
      { title: "🌍 Decentralized D", favicon: "/vite1.gif" },
      { title: "🌍 Decentralized DB", favicon: "/vite1.gif" },
      { title: "🌍 Decentralized DB", favicon: "/vite1.gif" },
     
    ];

    let index = 0;
    const interval = setInterval(() => {
      document.title = frames[index].title; // Update tab title

      const favicon = document.querySelector("link[rel='shortcut icon']");
      if (favicon) {
        favicon.setAttribute("href", frames[index].favicon); // Update favicon
      }

      index = (index + 1) % frames.length;
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
      <Footer />

    </Router>
  );
}

export default App;
