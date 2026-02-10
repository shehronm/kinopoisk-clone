// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Volume2, VolumeX, ChevronLeft, ChevronRight, User, Bell, ArrowRight, Twitter, Facebook, Instagram, Youtube, Send, ImageOff } from 'lucide-react';

// --- ДАННЫЕ HERO ---
const HERO_MOVIES = [
  { 
    id: 1, 
    title: "ДЮНА: ЧАСТЬ ВТОРАЯ", 
    desc: "Пол Атрейдес объединяется с фрименами, чтобы отомстить заговорщикам. Эпическая фантастика Дени Вильнёва.",
    videoId: "Way9Dexny3w", 
  },
  { 
    id: 2, 
    title: "ДЖОН УИК 4", 
    desc: "Джон Уик находит способ победить Правление Кланов. Но прежде ему предстоит сразиться с новым врагом.",
    videoId: "qEVUtrk8_B4", 
  },
  { 
    id: 3, 
    title: "ДЭДПУЛ И РОСОМАХА", 
    desc: "Уэйд Уилсон попадает в организацию «Управление временными изменениями». Самый безумный кроссовер Marvel.",
    videoId: "73_1biulkYk", 
  }
];

// --- НОВАЯ БАЗА С ВЕЧНЫМИ ССЫЛКАМИ (TMDB) ---
const CATEGORIES = [
  {
    title: "Рекомендуем вам посмотреть",
    items: [
      { id: 101, title: "Интерстеллар", rating: 8.6, genre: "Фантастика", img: "https://image.tmdb.org/t/p/w500/gEU2QniL6E8AHtMY4kHKDmGVf0.jpg" },
      { id: 102, title: "Джентльмены", rating: 8.5, genre: "Криминал", img: "https://image.tmdb.org/t/p/w500/jtrhTYB7xSrxFhMMaALw99E18W0.jpg" },
      { id: 103, title: "Волк с Уолл-стрит", rating: 7.9, genre: "Биография", img: "https://image.tmdb.org/t/p/w500/pWHf4khOloNVfCxscsXFGH3jjII.jpg" },
      { id: 104, title: "1+1", rating: 8.8, genre: "Драма", img: "https://image.tmdb.org/t/p/w500/ttX0v81p5d862fC9x8d641d4k7w.jpg" },
      { id: 105, title: "Начало", rating: 8.7, genre: "Фантастика", img: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKqJCZVnBNmBDXLs.jpg" },
      { id: 106, title: "Джокер", rating: 8.0, genre: "Триллер", img: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg" },
      { id: 107, title: "Побег из Шоушенка", rating: 9.1, genre: "Драма", img: "https://image.tmdb.org/t/p/w500/lyQBXzOQKo0bAjqbdyKXUcaFODA.jpg" },
    ]
  },
  {
    title: "Популярные сериалы",
    items: [
      { id: 201, title: "Слово пацана", rating: 8.3, genre: "Драма", img: "https://upload.wikimedia.org/wikipedia/ru/a/a2/Slovo_pacana_poster.jpg" },
      { id: 202, title: "Игра престолов", rating: 9.0, genre: "Фэнтези", img: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbGw83trZrcr5uk.jpg" },
      { id: 203, title: "Рик и Морти", rating: 8.9, genre: "Мультфильм", img: "https://image.tmdb.org/t/p/w500/cvhNj9eoRBe5SxjCbQTkh05UP5K.jpg" },
      { id: 204, title: "Очень странные дела", rating: 8.4, genre: "Ужасы", img: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg" },
      { id: 205, title: "Черное зеркало", rating: 8.5, genre: "Фантастика", img: "https://image.tmdb.org/t/p/w500/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg" },
      { id: 206, title: "Во все тяжкие", rating: 8.9, genre: "Криминал", img: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg" },
      { id: 207, title: "Мандалорец", rating: 8.0, genre: "Фантастика", img: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg" },
    ]
  },
  {
    title: "Эксклюзивы Cinema+",
    items: [
      { id: 301, title: "Король и Шут", rating: 8.2, genre: "Музыка", img: "https://upload.wikimedia.org/wikipedia/ru/4/47/%D0%9A%D0%BE%D1%80%D0%BE%D0%BB%D1%8C_%D0%B8_%D0%A8%D1%83%D1%82_%28%D1%81%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%29.jpg" },
      { id: 302, title: "Одни из нас", rating: 8.8, genre: "Драма", img: "https://image.tmdb.org/t/p/w500/uKvVjHNqBPlVZjzsK7msjekc23q.jpg" },
      { id: 303, title: "Пацаны", rating: 8.5, genre: "Боевик", img: "https://image.tmdb.org/t/p/w500/7ns781E2F545fN69XW74t8U47z.jpg" },
      { id: 304, title: "Дом Дракона", rating: 8.4, genre: "Фэнтези", img: "https://image.tmdb.org/t/p/w500/1X4h40nxdE4o1K3wqzaLN9SdMKN.jpg" },
      { id: 305, title: "Уэнсдэй", rating: 8.5, genre: "Фэнтези", img: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg" },
      { id: 306, title: "Локи", rating: 8.1, genre: "Фантастика", img: "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg" },
    ]
  }
];

// --- КОМПОНЕНТ КАРТИНКИ С ЗАЩИТОЙ ОТ ОШИБОК ---
const MovieImage = ({ src, title }) => {
    const [imgError, setImgError] = useState(false);

    if (imgError || !src) {
        return (
            <div className="w-full h-full bg-[#2a2a2a] flex flex-col items-center justify-center p-4 text-center">
                <ImageOff className="text-gray-600 mb-2" size={32} />
                <span className="text-xs text-gray-400 font-bold">{title}</span>
            </div>
        );
    }

    return (
        <img 
            src={src} 
            alt={title} 
            loading="lazy" 
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={() => setImgError(true)} 
        />
    );
};

// --- КОМПОНЕНТ ЛЕНТЫ ---
const MovieRow = ({ title, items }) => {
    const rowRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
  
    const checkScroll = () => {
        if (rowRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
        }
    };

    useEffect(() => {
        const row = rowRef.current;
        if (row) {
            row.addEventListener('scroll', checkScroll);
            checkScroll();
            return () => row.removeEventListener('scroll', checkScroll);
        }
    }, [items]);
  
    const scroll = (direction) => {
      if (rowRef.current) {
        const { current } = rowRef;
        const width = current.clientWidth;
        const scrollAmount = direction === 'left' ? -(width * 0.7) : (width * 0.7);
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };
  
    return (
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-5 text-white hover:text-[#f50] cursor-pointer flex items-center gap-2 transition-colors px-4 md:px-12 group/title">
          {title} <ChevronRight className="text-gray-500 group-hover/title:text-[#f50] transition-colors" size={24} />
        </h3>
  
        <div className="relative group px-4 md:px-12">
            
            {/* Левая стрелка */}
            <button 
                onClick={() => scroll('left')}
                className={`
                    absolute left-2 top-1/2 -translate-y-1/2 z-40 
                    w-12 h-12 flex items-center justify-center rounded-full 
                    bg-white/10 backdrop-blur-md border border-white/10
                    text-white shadow-2xl transition-all duration-300
                    hover:bg-[#f50] hover:scale-110 hover:border-[#f50]
                    ${canScrollLeft ? 'opacity-0 group-hover:opacity-100 visible' : 'opacity-0 invisible'}
                `}
            >
                <ChevronLeft size={28} />
            </button>

            {/* Скролл */}
            <div 
                ref={rowRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x items-stretch"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
            >
                {items.map((item) => (
                    <div key={item.id} className="min-w-[160px] md:min-w-[220px] cursor-pointer group/card snap-start">
                        <div className="relative rounded-xl overflow-hidden aspect-[2/3] w-full mb-3 shadow-lg transition-transform duration-500 group-hover/card:scale-105 border border-white/5 bg-[#1f1f1f]">
                            
                            {/* УМНАЯ КАРТИНКА */}
                            <MovieImage src={item.img} title={item.title} />

                            <div className={`absolute top-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-md ${item.rating >= 8 ? 'bg-green-600/90 text-white' : 'bg-gray-500/90 text-white'}`}>
                                {item.rating}
                            </div>
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-12 h-12 bg-[#f50] rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover/card:scale-100 transition-transform duration-300">
                                    <Play fill="white" className="ml-1" size={20} />
                                </div>
                            </div>
                        </div>
                        <h4 className="font-bold text-[15px] leading-tight text-gray-100 truncate pr-2 group-hover/card:text-[#f50] transition-colors">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{item.genre}</p>
                    </div>
                ))}

                <div className="min-w-[160px] md:min-w-[220px] cursor-pointer group/showall snap-start flex flex-col">
                    <div className="relative rounded-xl overflow-hidden aspect-[2/3] w-full mb-3 border border-white/10 bg-[#1f1f1f] flex items-center justify-center group-hover/showall:bg-[#2a2a2a] transition-colors duration-300">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/showall:bg-[#f50] group-hover/showall:border-[#f50] transition-all duration-300">
                                <ArrowRight size={24} className="text-gray-300 group-hover/showall:text-white" />
                            </div>
                            <span className="text-sm font-bold text-gray-400 group-hover/showall:text-white transition-colors">Показать все</span>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* Правая стрелка */}
            <button 
                onClick={() => scroll('right')}
                className={`
                    absolute right-2 top-1/2 -translate-y-1/2 z-40 
                    w-12 h-12 flex items-center justify-center rounded-full 
                    bg-white/10 backdrop-blur-md border border-white/10
                    text-white shadow-2xl transition-all duration-300
                    hover:bg-[#f50] hover:scale-110 hover:border-[#f50]
                    ${canScrollRight ? 'opacity-0 group-hover:opacity-100 visible' : 'opacity-0 invisible'}
                `}
            >
                <ChevronRight size={28} />
            </button>
        </div>
      </div>
    );
};

// --- КОМПОНЕНТ ФУТЕРА ---
const Footer = () => {
    return (
        <footer className="bg-[#1f1f1f] border-t border-white/5 pt-16 pb-12 mt-24">
            <div className="px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    
                    <div className="space-y-6">
                        <h4 className="font-bold text-white text-lg">Cinema+</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-[#f50] transition">О нас</a></li>
                            <li><a href="#" className="hover:text-[#f50] transition">Вакансии</a></li>
                            <li><a href="#" className="hover:text-[#f50] transition">Реклама</a></li>
                            <li><a href="#" className="hover:text-[#f50] transition">Контакты</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-white text-lg">Пользователям</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-[#f50] transition">Мой профиль</a></li>
                            <li><a href="#" className="hover:text-[#f50] transition">Подписки</a></li>
                            <li><a href="#" className="hover:text-[#f50] transition">Активация кода</a></li>
                            <li><a href="#" className="hover:text-[#f50] transition">Служба поддержки</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-white text-lg">Разделы</h4>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-[#f50] transition">Фильмы</a></li>
                            <li><a href="#" className="hover:text-[#f50] transition">Сериалы</a></li>
                            <li><a href="#" className="hover:text-[#f50] transition">Игры</a></li>
                            <li><a href="#" className="hover:text-[#f50] transition">Спорт</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-white text-lg">Мы в соцсетях</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#f50] hover:text-white transition-all text-gray-400">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#f50] hover:text-white transition-all text-gray-400">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#f50] hover:text-white transition-all text-gray-400">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#f50] hover:text-white transition-all text-gray-400">
                                <Youtube size={20} />
                            </a>
                        </div>
                        <button className="flex items-center gap-2 bg-[#f50]/10 text-[#f50] px-6 py-3 rounded-lg font-bold hover:bg-[#f50] hover:text-white transition-all w-full justify-center border border-[#f50]/20">
                            <Send size={18} /> Написать в чат
                        </button>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2026 Cinema+. 18+</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition">Пользовательское соглашение</a>
                        <a href="#" className="hover:text-white transition">Политика конфиденциальности</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default function KinopoiskPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % HERO_MOVIES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + HERO_MOVIES.length) % HERO_MOVIES.length);

  if (!hasMounted) return <div className="min-h-screen bg-[#0f0f0f]" />;

  const currentMovie = HERO_MOVIES[currentIndex];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans overflow-x-hidden">
      
      {/* НАВИГАЦИЯ */}
      <nav className={`fixed top-0 w-full z-50 px-8 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-[#0f0f0f]/95 shadow-lg backdrop-blur-sm' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="flex items-center gap-12">
           <h1 className="text-2xl font-black text-[#f50] tracking-tighter cursor-pointer uppercase">CINEMA+</h1>
           <div className="hidden lg:flex gap-6 text-[15px] font-medium text-gray-300">
             <a href="#" className="hover:text-white transition">Главное</a>
             <a href="#" className="hover:text-white transition">Моё</a>
             <a href="#" className="hover:text-white transition">Каналы</a>
           </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="bg-[#1f1f1f]/80 backdrop-blur-md flex items-center px-3 py-2 rounded-lg w-64 group border border-transparent focus-within:border-[#ff6600] transition-all">
             <Search size={18} className="text-gray-400 group-hover:text-white transition" />
             <input type="text" placeholder="Фильмы, персоны" className="bg-transparent border-none outline-none text-sm ml-3 text-white w-full placeholder-gray-500" />
          </div>
          <Bell className="cursor-pointer text-gray-300 hover:text-white" />
          <User className="cursor-pointer text-gray-300 hover:text-white" />
        </div>
      </nav>

      {/* HERO СЛАЙДЕР */}
      <section className="relative h-[85vh] w-full bg-black">
        <div className="absolute inset-0 z-0 pointer-events-none scale-[1.35]">
            <iframe
                key={currentMovie.videoId}
                width="100%" height="100%"
                src={`https://www.youtube.com/embed/${currentMovie.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&loop=1&playlist=${currentMovie.videoId}&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover opacity-80"
            />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-transparent z-10" />

        <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 max-w-4xl pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-6xl md:text-7xl font-black mb-6 uppercase tracking-tight text-white drop-shadow-2xl">
                {currentMovie.title}
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl font-medium drop-shadow-md line-clamp-3">
                {currentMovie.desc}
              </p>
              
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-gradient-to-r from-[#f50] to-[#d94800] hover:brightness-110 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-900/50">
                  <Play fill="white" size={20} /> Смотреть
                </button>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition border border-white/10"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={prevSlide} className="absolute left-4 top-1/2 z-30 p-3 rounded-full bg-white/5 hover:bg-[#f50] backdrop-blur-md transition-all group"><ChevronLeft className="group-hover:scale-110" /></button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 z-30 p-3 rounded-full bg-white/5 hover:bg-[#f50] backdrop-blur-md transition-all group"><ChevronRight className="group-hover:scale-110" /></button>
      </section>

      {/* --- СПИСКИ ФИЛЬМОВ --- */}
      <div className="relative z-30 -mt-24 space-y-4">
        {CATEGORIES.map((category, index) => (
          <MovieRow key={index} title={category.title} items={category.items} />
        ))}
      </div>

      {/* --- ФУТЕР --- */}
      <Footer />

    </div>
  );
}