// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Play, Volume2, VolumeX, ChevronLeft, ChevronRight, 
  User, Bell, ArrowRight, Twitter, Facebook, Instagram, Youtube, 
  Send, Home, MonitorPlay, Bookmark, X, Plus, Check 
} from 'lucide-react';

// --- ДАННЫЕ HERO ---
const HERO_MOVIES = [
  { 
    id: 1, title: "ДЮНА: ЧАСТЬ ВТОРАЯ", rating: 8.8, genre: "Фантастика", year: "2024",
    img: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjcNsV.jpg",
    desc: "Пол Атрейдес объединяется с фрименами, чтобы отомстить заговорщикам. Эпическая фантастика Дени Вильнёва.",
    videoId: "Way9Dexny3w", 
  },
  { 
    id: 2, title: "ДЖОН УИК 4", rating: 8.4, genre: "Боевик", year: "2023",
    img: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    desc: "Джон Уик находит способ победить Правление Кланов. Но прежде ему предстоит сразиться с новым врагом.",
    videoId: "qEVUtrk8_B4", 
  },
  { 
    id: 3, title: "ДЭДПУЛ И РОСОМАХА", rating: 8.2, genre: "Комедия", year: "2024",
    img: "https://image.tmdb.org/t/p/w500/9kFpE1z2fK1nJvP52zW1I4XW3Rj.jpg",
    desc: "Уэйд Уилсон попадает в организацию «Управление временными изменениями». Самый безумный кроссовер Marvel.",
    videoId: "73_1biulkYk", 
  }
];

// --- 100+ КАРТОЧЕК ---
const CATEGORIES = [
  {
    title: "Рекомендуем вам посмотреть",
    items: [
      { id: 101, title: "Интерстеллар", rating: 8.6, genre: "Фантастика", year: "2014", img: "https://image.tmdb.org/t/p/w500/gEU2QniL6E8AHtMY4kHKDmGVf0.jpg", desc: "Группа исследователей отправляется в путешествие за пределы нашей галактики, чтобы спасти человечество." },
      { id: 102, title: "Джентльмены", rating: 8.5, genre: "Криминал", year: "2019", img: "https://image.tmdb.org/t/p/w500/jtrhTYB7xSrxFhMMaALw99E18W0.jpg", desc: "Талантливый выпускник Оксфорда придумал нелегальную схему обогащения." },
      { id: 103, title: "Волк с Уолл-стрит", rating: 7.9, genre: "Биография", year: "2013", img: "https://image.tmdb.org/t/p/w500/pWHf4khOloNVfCxscsXFGH3jjII.jpg", desc: "История Джордана Белфорта, брокера, который создал империю на Уолл-стрит." },
      { id: 104, title: "1+1", rating: 8.8, genre: "Драма", year: "2011", img: "https://image.tmdb.org/t/p/w500/ttX0v81p5d862fC9x8d641d4k7w.jpg", desc: "Пострадав в результате несчастного случая, богатый аристократ нанимает в помощники человека с улицы." },
      { id: 105, title: "Начало", rating: 8.7, genre: "Фантастика", year: "2010", img: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKqJCZVnBNmBDXLs.jpg", desc: "Профессиональный вор крадет идеи из подсознания людей во время сна." },
      { id: 106, title: "Джокер", rating: 8.0, genre: "Триллер", year: "2019", img: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", desc: "Готэм, начало 1980-х. Комик Артур Флек живет с больной матерью, которая учит его ходить с улыбкой. Но мир жесток." },
      { id: 107, title: "Побег из Шоушенка", rating: 9.1, genre: "Драма", year: "1994", img: "https://image.tmdb.org/t/p/w500/lyQBXzOQKo0bAjqbdyKXUcaFODA.jpg", desc: "Успешный банкир обвинен в убийстве. Оказавшись в тюрьме, он не сдается и планирует побег." },
      { id: 108, title: "Зеленая миля", rating: 9.1, genre: "Фэнтези", year: "1999", img: "", desc: "История о надзирателе в блоке смертников и необычном заключенном с даром исцеления." },
      { id: 109, title: "Матрица", rating: 8.7, genre: "Фантастика", year: "1999", img: "", desc: "Хакер Нео узнает страшную правду о том, что реальный мир — это иллюзия." },
      { id: 110, title: "Бойцовский клуб", rating: 8.8, genre: "Триллер", year: "1999", img: "", desc: "Обычный клерк и харизматичный продавец мыла организуют подпольный клуб." },
      { id: 111, title: "Темный рыцарь", rating: 9.0, genre: "Боевик", year: "2008", img: "", desc: "Бэтмен сталкивается с самым опасным врагом Готэма — криминальным гением Джокером." },
      { id: 112, title: "Форрест Гамп", rating: 8.8, genre: "Драма", year: "1994", img: "", desc: "Необычная история человека с низким IQ, который стал героем войны, миллиардером и пробежал через всю Америку." },
      { id: 113, title: "Властелин колец", rating: 8.9, genre: "Фэнтези", year: "2001", img: "", desc: "Хоббит Фродо отправляется в опасное путешествие, чтобы уничтожить Кольцо Всевластия." },
      { id: 114, title: "Криминальное чтиво", rating: 8.9, genre: "Криминал", year: "1994", img: "", desc: "Несколько переплетающихся историй о бандитах, наркотиках и философских беседах." },
      { id: 115, title: "Гладиатор", rating: 8.5, genre: "Боевик", year: "2000", img: "", desc: "Великий генерал становится рабом-гладиатором и бросает вызов самому императору Рима." },
      { id: 116, title: "Леон", rating: 8.5, genre: "Криминал", year: "1994", img: "", desc: "Профессиональный киллер берет под свою опеку 12-летнюю девочку, чью семью убили коррумпированные полицейские." },
      { id: 117, title: "Престиж", rating: 8.5, genre: "Фантастика", year: "2006", img: "", desc: "Два фокусника-иллюзиониста ведут жестокую борьбу за секрет идеального трюка." },
      { id: 118, title: "Остров проклятых", rating: 8.2, genre: "Триллер", year: "2010", img: "", desc: "Два маршала отправляются на остров-клинику для душевнобольных преступников, чтобы расследовать исчезновение пациентки." }
    ]
  },
  {
    title: "Топ Аниме",
    items: [
      { id: 501, title: "Код Гиасс", rating: 8.7, genre: "Аниме", year: "2006", img: "", desc: "Изгнанный британский принц Лелуш получает мистическую силу «Гиасс» и поднимает восстание против величайшей империи мира, скрываясь под маской Зеро." },
      { id: 502, title: "Класс превосходства", rating: 8.2, genre: "Аниме", year: "2017", img: "", desc: "В элитной школе Кодо Икусэй ученикам дается полная свобода, но выживают и побеждают здесь только самые умные и хитрые. Киётака Аянокодзи начинает свою скрытую игру." },
      { id: 503, title: "Человек-бензопила", rating: 8.6, genre: "Аниме", year: "2022", img: "", desc: "Дэндзи, бедный парень в долгах, заключает контракт с демоном-бензопилой Почитой и становится охотником на демонов, жаждущим нормальной жизни." },
      { id: 504, title: "Последний серафим", rating: 7.9, genre: "Аниме", year: "2015", img: "", desc: "Человечество уничтожено вирусом, а выжившие дети порабощены вампирами. Юитиро сбегает и клянется отомстить кровопийцам за гибель своей семьи." },
      { id: 505, title: "Hunter x Hunter", rating: 9.0, genre: "Аниме", year: "2011", img: "", desc: "Гон Фрикс отправляется в опасное путешествие, чтобы сдать жестокий экзамен на Охотника и найти своего пропавшего отца, одного из величайших в этом деле." },
      { id: 506, title: "Атака титанов", rating: 9.1, genre: "Аниме", year: "2013", img: "", desc: "Остатки человечества укрываются за гигантскими стенами от пожирающих людей титанов. Эрен Йегер клянется уничтожить их всех." },
      { id: 507, title: "Тетрадь смерти", rating: 9.0, genre: "Аниме", year: "2006", img: "", desc: "Школьник находит тетрадь, убивающую любого, чье имя в ней записано, и решает стать богом нового мира." },
      { id: 508, title: "Клинок, рассекающий демонов", rating: 8.6, genre: "Аниме", year: "2019", img: "", desc: "Тандзиро становится охотником на демонов, чтобы найти способ исцелить свою сестру, превратившуюся в монстра." },
      { id: 509, title: "Магическая битва", rating: 8.7, genre: "Аниме", year: "2020", img: "", desc: "Юдзи Итадори проглатывает проклятый палец древнего духа и становится сосудом для могущественного проклятия." },
      { id: 510, title: "Киберпанк: Бегущие по краю", rating: 8.3, genre: "Аниме", year: "2022", img: "", desc: "Талантливый парень из трущоб Найт-Сити становится наемником-киберпанком, чтобы выжить в безжалостном мегаполисе." },
      { id: 511, title: "Стальной алхимик", rating: 9.1, genre: "Аниме", year: "2009", img: "", desc: "Два брата пытаются вернуть свои тела, утерянные при попытке воскресить мать с помощью запретной алхимии." },
      { id: 512, title: "Евангелион", rating: 8.5, genre: "Аниме", year: "1995", img: "", desc: "Подростки пилотируют гигантских биомеханических роботов, чтобы защитить Землю от загадочных существ — Ангелов." },
      { id: 513, title: "Блич", rating: 8.2, genre: "Аниме", year: "2004", img: "", desc: "Обычный школьник Ичиго Куросаки случайно получает силы синигами (бога смерти) и теперь должен защищать мир живых." },
      { id: 514, title: "Ван Пис", rating: 8.9, genre: "Аниме", year: "1999", img: "", desc: "Манки Д. Луффи и его команда пиратов путешествуют по океану Гранд Лайн в поисках легендарного сокровища." },
      { id: 515, title: "Врата Штейна", rating: 8.8, genre: "Аниме", year: "2011", img: "", desc: "Группа друзей случайно изобретает машину времени из микроволновки, что приводит к непредсказуемым последствиям." },
      { id: 516, title: "Токийский гуль", rating: 7.8, genre: "Аниме", year: "2014", img: "", desc: "Обычный студент становится наполовину гулем — существом, питающимся человеческой плотью, и вынужден скрываться." },
      { id: 517, title: "Наруто", rating: 8.4, genre: "Аниме", year: "2002", img: "", desc: "Молодой ниндзя Наруто Узумаки стремится стать Хокаге — лидером своей деревни и сильнейшим воином." },
      { id: 518, title: "ДжоДжо", rating: 8.5, genre: "Аниме", year: "2012", img: "", desc: "История нескольких поколений семьи Джостар, которым суждено сражаться со сверхъестественным злом." },
      { id: 519, title: "Ванпанчмен", rating: 8.7, genre: "Аниме", year: "2015", img: "", desc: "Сайтама стал настолько сильным, что побеждает любого врага с одного удара. И теперь ему невыносимо скучно." }
    ]
  },
  {
    title: "Популярные сериалы",
    items: [
      { id: 201, title: "Слово пацана", rating: 8.3, genre: "Драма", year: "2023", img: "https://upload.wikimedia.org/wikipedia/ru/a/a2/Slovo_pacana_poster.jpg", desc: "Конец 1980-х. Брошенные всеми дети сбиваются в уличные стаи и бьются за асфальт." },
      { id: 202, title: "Острые козырьки", rating: 8.8, genre: "Криминал", year: "2013", img: "", desc: "Бирмингем, 1920-е годы. Жестокая и амбициозная банда «Острые козырьки» под руководством Томаса Шелби захватывает власть в городе." },
      { id: 203, title: "Игра престолов", rating: 9.0, genre: "Фэнтези", year: "2011", img: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbGw83trZrcr5uk.jpg", desc: "Девять благородных семей борются за контроль над мифическими землями Вестероса." },
      { id: 204, title: "Во все тяжкие", rating: 8.9, genre: "Криминал", year: "2008", img: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg", desc: "Учитель химии Уолтер Уайт узнает, что болен раком легких. Чтобы обеспечить будущее семьи, он начинает варить мет." },
      { id: 205, title: "Рик и Морти", rating: 8.9, genre: "Мультфильм", year: "2013", img: "https://image.tmdb.org/t/p/w500/cvhNj9eoRBe5SxjCbQTkh05UP5K.jpg", desc: "Безумный ученый Рик Санчез втягивает своего внука Морти в опасные приключения." },
      { id: 206, title: "Очень странные дела", rating: 8.4, genre: "Ужасы", year: "2016", img: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", desc: "В маленьком городке пропадает мальчик. В ходе поисков его друзья сталкиваются со сверхъестественным." },
      { id: 207, title: "Черное зеркало", rating: 8.5, genre: "Фантастика", year: "2011", img: "https://image.tmdb.org/t/p/w500/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg", desc: "Сериал исследует современное общество и влияние новых технологий на людей." },
      { id: 208, title: "Офис", rating: 8.9, genre: "Комедия", year: "2005", img: "", desc: "Повседневная жизнь сотрудников бумажной компании Dunder Mifflin в Скрантоне под руководством Майкла Скотта." },
      { id: 209, title: "Настоящий детектив", rating: 8.9, genre: "Детектив", year: "2014", img: "", desc: "Два детектива из Луизианы расследуют странное оккультное убийство на протяжении многих лет." },
      { id: 210, title: "Шерлок", rating: 8.9, genre: "Детектив", year: "2010", img: "", desc: "Современная адаптация классических рассказов Артура Конан Дойла о гениальном сыщике в Лондоне наших дней." },
      { id: 211, title: "Друзья", rating: 8.9, genre: "Комедия", year: "1994", img: "", desc: "Культовый комедийный сериал о жизни шестерых друзей на Манхэттене." },
      { id: 212, title: "Мандалорец", rating: 8.0, genre: "Фантастика", year: "2019", img: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg", desc: "Одинокий мандалорец-наемник живет на краю обитаемой галактики." },
      { id: 213, title: "Пацаны", rating: 8.5, genre: "Боевик", year: "2019", img: "https://image.tmdb.org/t/p/w500/7ns781E2F545fN69XW74t8U47z.jpg", desc: "Группа мстителей решает поставить на место коррумпированных супергероев." },
      { id: 214, title: "Сопрано", rating: 9.2, genre: "Криминал", year: "1999", img: "", desc: "Босс мафии Тони Сопрано пытается найти баланс между своей криминальной «семьей» и личной жизнью, тайно посещая психиатра." },
      { id: 215, title: "Ведьмак", rating: 8.0, genre: "Фэнтези", year: "2019", img: "", desc: "Геральт из Ривии, мутант и охотник на чудовищ, изо всех сил старается найти свое место в мире." },
      { id: 216, title: "Фарго", rating: 8.9, genre: "Триллер", year: "2014", img: "", desc: "Череда нелепых и кровавых преступлений в заснеженных городках Америки." }
    ]
  },
  {
    title: "Игровые вселенные (Геймерам)",
    items: [
      { id: 601, title: "Arcane", rating: 9.0, genre: "Фэнтези", year: "2021", img: "", desc: "История сестер Вай и Джинкс, оказавшихся по разные стороны баррикад в конфликте между богатым Пилтовером и задыхающимся Зауном. По вселенной League of Legends." },
      { id: 602, title: "DOTA: Кровь дракона", rating: 7.8, genre: "Фэнтези", year: "2021", img: "", desc: "Известный рыцарь-дракон Дэвион посвятил жизнь борьбе с бедами мира. Но все меняется после встречи с принцессой Мираной." },
      { id: 603, title: "Fallout", rating: 8.5, genre: "Фантастика", year: "2024", img: "", desc: "Спустя 200 лет после ядерной войны девушка покидает уютное убежище и отправляется в опасную и безумную пустошь Лос-Анджелеса." },
      { id: 604, title: "Castlevania", rating: 8.3, genre: "Мультфильм", year: "2017", img: "", desc: "Последний выживший член клана Бельмонтов пытается спасти Восточную Европу от графа Дракулы." },
      { id: 605, title: "Tomb Raider: Лара Крофт", rating: 7.0, genre: "Приключения", year: "2018", img: "", desc: "Юная Лара Крофт отправляется в свою первую экспедицию, чтобы завершить начатое отцом археологическое исследование." },
      { id: 606, title: "Halo", rating: 7.2, genre: "Фантастика", year: "2022", img: "", desc: "В XXVI веке человечество ведет жестокую войну с инопланетным союзом Ковенант. Главная надежда людей — кибернетически улучшенный солдат Мастер Чиф." },
      { id: 607, title: "Варкрафт", rating: 7.5, genre: "Фэнтези", year: "2016", img: "", desc: "Орки бегут из своего умирающего мира в Азерот, что развязывает великую войну между людьми и Ордой." },
      { id: 608, title: "Обитель зла", rating: 7.4, genre: "Ужасы", year: "2002", img: "", desc: "В секретной лаборатории корпорации Umbrella происходит утечка смертоносного вируса, превращающего людей в зомби." },
      { id: 609, title: "Uncharted: На картах не значится", rating: 6.9, genre: "Приключения", year: "2022", img: "", desc: "Молодой искатель приключений Нейтан Дрейк и его наставник Салли отправляются на поиски величайшего сокровища." },
      { id: 610, title: "Супер Марио в кино", rating: 7.1, genre: "Мультфильм", year: "2023", img: "", desc: "Братья-водопроводчики Марио и Луиджи случайно попадают в Грибное королевство, где им предстоит спасти принцессу Пич от Боузера." },
      { id: 611, title: "Мортал Комбат", rating: 7.0, genre: "Боевик", year: "2021", img: "", desc: "Бойцы Земли собираются вместе, чтобы принять участие в смертельном турнире против врагов из Внешнего Мира." },
      { id: 612, title: "Соник в кино", rating: 6.5, genre: "Комедия", year: "2020", img: "", desc: "Синий еж со сверхзвуковой скоростью объединяется с шерифом, чтобы противостоять злому доктору Роботнику." },
      { id: 613, title: "Детектив Пикачу", rating: 6.6, genre: "Комедия", year: "2019", img: "", desc: "Парень ищет пропавшего отца-детектива в Райм-Сити, объединив усилия с умным и говорящим Пикачу." },
      { id: 614, title: "Кредо убийцы", rating: 5.7, genre: "Фантастика", year: "2016", img: "", desc: "С помощью революционной технологии Каллум Линч переживает воспоминания своего предка-ассасина в Испании XV века." },
      { id: 615, title: "Gran Turismo", rating: 7.4, genre: "Спорт", year: "2023", img: "", desc: "Реальная история геймера Янна Марденборо, который выиграл турнир Nissan и стал настоящим профессиональным гонщиком." }
    ]
  },
  {
    title: "Эксклюзивы Cinema+",
    items: [
      { id: 301, title: "Король и Шут", rating: 8.2, genre: "Музыка", year: "2023", img: "https://upload.wikimedia.org/wikipedia/ru/4/47/%D0%9A%D0%BE%D1%80%D0%BE%D0%BB%D1%8C_%D0%B8_%D0%A8%D1%83%D1%82_%28%D1%81%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%29.jpg", desc: "История панк-группы и параллельный фэнтези-мир, где Горшок и Князь спасают принцессу." },
      { id: 302, title: "Одни из нас", rating: 8.8, genre: "Драма", year: "2023", img: "https://image.tmdb.org/t/p/w500/uKvVjHNqBPlVZjzsK7msjekc23q.jpg", desc: "Контрабандист Джоэл должен вывести девочку Элли через разрушенную эпидемией Америку." },
      { id: 304, title: "Дом Дракона", rating: 8.4, genre: "Фэнтези", year: "2022", img: "https://image.tmdb.org/t/p/w500/1X4h40nxdE4o1K3wqzaLN9SdMKN.jpg", desc: "История дома Таргариенов, происходящая за 200 лет до событий «Игры престолов»." },
      { id: 305, title: "Уэнсдэй", rating: 8.5, genre: "Фэнтези", year: "2022", img: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg", desc: "Уэнсдэй Аддамс поступает в академию «Невермор»." },
      { id: 306, title: "Локи", rating: 8.1, genre: "Фантастика", year: "2021", img: "https://image.tmdb.org/t/p/w500/voHUmluYmKyleFkTu3lOXQG702u.jpg", desc: "Бог хитрости попадает в организацию «Управление временными изменениями»." },
      { id: 307, title: "Разделение", rating: 8.7, genre: "Фантастика", year: "2022", img: "", desc: "Сотрудники загадочной компании Lumon проходят процедуру «разделения», которая отделяет рабочие воспоминания от личных." },
      { id: 308, title: "Сёгун", rating: 8.7, genre: "Драма", year: "2024", img: "", desc: "Эпическая история о власти и интригах в феодальной Японии." },
      { id: 309, title: "Пингвин", rating: 8.5, genre: "Криминал", year: "2024", img: "", desc: "Освальд Кобблпот стремится захватить власть над преступным миром Готэма." },
      { id: 310, title: "Медведь", rating: 8.6, genre: "Драма", year: "2022", img: "", desc: "Молодой шеф-повар из мира высокой кухни возвращается в Чикаго, чтобы управлять семейной закусочной." },
      { id: 311, title: "Задача трех тел", rating: 7.5, genre: "Фантастика", year: "2024", img: "", desc: "Решение молодого ученого в Китае 1960-х годов эхом разносится сквозь пространство и время." },
      { id: 312, title: "Дюна: Пророчество", rating: 7.9, genre: "Фантастика", year: "2024", img: "", desc: "За 10 000 лет до Пола Атрейдеса. История создания могущественного ордена Бене Гессерит." },
      { id: 313, title: "Белый лотос", rating: 7.9, genre: "Комедия", year: "2021", img: "", desc: "Сатирическая история о богатых гостях и персонале элитного тропического курорта." },
      { id: 314, title: "Тед Лассо", rating: 8.8, genre: "Комедия", year: "2020", img: "", desc: "Тренер по американскому футболу переезжает в Англию, чтобы тренировать команду Премьер-лиги." },
      { id: 315, title: "Наследники", rating: 8.9, genre: "Драма", year: "2018", img: "", desc: "Глава могущественной медиа-империи решает отойти от дел, и его дети начинают безжалостную борьбу за кресло директора." }
    ]
  }
];

// Плоский массив для поиска и раздела "Моё"
const ALL_MOVIES = [...HERO_MOVIES, ...CATEGORIES.flatMap(c => c.items)]
  .filter((movie, index, self) => index === self.findIndex((t) => t.id === movie.id));

// --- ГЕНЕРАТОР ПОСТЕРОВ ---
const MovieImage = ({ src, title }) => {
    const [imgError, setImgError] = useState(false);
    if (imgError || !src) {
        const gradients = ['from-indigo-900 to-purple-900', 'from-red-900 to-orange-900', 'from-blue-900 to-cyan-900', 'from-green-900 to-teal-900', 'from-stone-800 to-neutral-900', 'from-rose-900 to-pink-900'];
        const colorIndex = (title.charCodeAt(0) || 0) % gradients.length;
        return (
            <div className={`w-full h-full bg-gradient-to-br ${gradients[colorIndex]} flex flex-col items-center justify-center p-3 text-center border border-white/5`}>
                <span className="text-sm md:text-lg text-white/90 font-black uppercase tracking-widest drop-shadow-lg leading-tight">{title}</span>
            </div>
        );
    }
    return <img src={src} alt={title} loading="lazy" className="w-full h-full object-cover transition-opacity duration-300" onError={() => setImgError(true)} />;
};

// --- МОДАЛЬНОЕ ОКНО ФИЛЬМА ---
const MovieModal = ({ movie, onClose, isSaved, onToggleSave }) => {
    if (!movie) return null;
    return (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#141414] border border-white/10 rounded-2xl max-w-4xl w-full relative overflow-hidden shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors"><X size={20} /></button>
                <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 max-h-[90vh] overflow-y-auto scrollbar-hide">
                    <div className="w-[150px] md:w-[250px] mx-auto md:mx-0 shrink-0 rounded-xl overflow-hidden shadow-2xl aspect-[2/3]">
                        <MovieImage src={movie.img} title={movie.title} />
                    </div>
                    <div className="flex-1 text-center md:text-left pt-2">
                        <h2 className="text-2xl md:text-4xl font-black text-white mb-3 uppercase tracking-tight">{movie.title}</h2>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs md:text-sm font-bold text-gray-400 mb-4">
                            <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded">Рейтинг: {movie.rating}</span>
                            <span className="bg-white/10 px-2 py-1 rounded">{movie.year}</span>
                            <span className="bg-white/10 px-2 py-1 rounded">{movie.genre}</span>
                            <span className="border border-gray-500 px-1 rounded text-[10px]">18+</span>
                        </div>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-8">{movie.desc}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                            <button className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                <Play fill="black" size={18} /> Смотреть
                            </button>
                            <button onClick={() => onToggleSave(movie.id)} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors border ${isSaved ? 'bg-green-600/20 text-green-500 border-green-500/30' : 'bg-white/10 text-white border-white/5 hover:bg-white/20'}`}>
                                {isSaved ? <Check size={18} /> : <Plus size={18} />} {isSaved ? 'В списке' : 'Мой список'}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// --- КОМПОНЕНТ ЛЕНТЫ С ФИЛЬМАМИ ---
const MovieRow = ({ title, items, onMovieClick, onShowAll }) => {
    const rowRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
  
    const checkScroll = () => {
        if (rowRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
            setCanScrollLeft(scrollLeft > 2);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [items]);
  
    const scroll = (direction) => {
      if (rowRef.current) {
        const { current } = rowRef;
        const scrollAmount = direction === 'left' ? -(current.clientWidth * 0.7) : (current.clientWidth * 0.7);
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setTimeout(checkScroll, 350);
      }
    };
  
    return (
      <div className="mb-6 md:mb-12 relative">
        <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-5 text-white hover:text-[#f50] cursor-pointer flex items-center gap-1 md:gap-2 px-4 md:px-12 group/title" onClick={onShowAll}>
          {title} <ChevronRight className="text-gray-500 group-hover/title:text-[#f50] transition-colors w-5 md:w-6 h-5 md:h-6" />
        </h3>
        <div className="relative group px-0 md:px-12">
            <button onClick={() => scroll('left')} className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-40 w-12 h-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white transition-all hover:bg-[#f50] hover:scale-110 ${canScrollLeft ? 'opacity-0 group-hover:opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}><ChevronLeft size={28} /></button>
            <div ref={rowRef} onScroll={checkScroll} className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {items.map((item) => (
                    <div key={item.id} onClick={() => onMovieClick(item)} className="shrink-0 min-w-[130px] w-[130px] md:min-w-[220px] md:w-[220px] cursor-pointer group/card snap-start transition-all duration-300 hover:scale-105">
                        <div className="relative rounded-xl overflow-hidden aspect-[2/3] w-full mb-2 shadow-lg border border-white/5 bg-[#1f1f1f]">
                            <MovieImage src={item.img} title={item.title} />
                            <div className={`absolute top-1.5 left-1.5 md:top-2 md:left-2 text-[10px] md:text-[11px] font-bold px-1.5 md:px-2 py-0.5 rounded backdrop-blur-md ${item.rating >= 8 ? 'bg-green-600/90 text-white' : 'bg-gray-500/90 text-white'}`}>{item.rating}</div>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-300">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#f50] rounded-full flex items-center justify-center shadow-lg transform scale-100"><Play fill="white" className="ml-0.5" size={20} /></div>
                            </div>
                        </div>
                        <h4 className="font-bold text-[12px] md:text-[14px] leading-tight truncate pr-2 text-gray-100 md:group-hover/card:text-[#f50] transition-colors">{item.title}</h4>
                    </div>
                ))}
                <div onClick={onShowAll} className="shrink-0 min-w-[130px] w-[130px] md:min-w-[220px] md:w-[220px] cursor-pointer group/showall snap-start flex flex-col justify-start">
                    <div className="relative rounded-xl overflow-hidden aspect-[2/3] w-full flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/10 transition-all duration-300 hover:bg-[#2a2a2a] hover:border-white/20 hover:scale-105 shadow-lg">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#1f1f1f] border border-white/10 flex items-center justify-center group-hover/showall:bg-[#f50] group-hover/showall:border-[#f50] transition-colors duration-300"><ArrowRight className="text-gray-400 group-hover/showall:text-white w-6 h-6 md:w-8 md:h-8" /></div>
                        <span className="text-xs md:text-sm font-bold text-gray-400 group-hover/showall:text-white transition-colors">Показать всё</span>
                    </div>
                </div>
            </div>
            <button onClick={() => scroll('right')} className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-40 w-12 h-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white transition-all hover:bg-[#f50] hover:scale-110 ${canScrollRight ? 'opacity-0 group-hover:opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}><ChevronRight size={28} /></button>
        </div>
      </div>
    );
};

// --- СЕТКА ДЛЯ ПОИСКА И "МОЁ" ---
const MovieGrid = ({ title, movies, onMovieClick }) => (
    <div className="pt-24 md:pt-32 px-4 md:px-12 max-w-7xl mx-auto min-h-screen pb-24 md:pb-12">
        <h2 className="text-2xl md:text-4xl font-black mb-6 md:mb-10 text-white uppercase">{title}</h2>
        {movies.length === 0 ? (
            <div className="text-center text-gray-500 py-20 flex flex-col items-center">
                <Bookmark size={48} className="mb-4 opacity-50" />
                <p className="text-lg">Здесь пока ничего нет.</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {movies.map(item => (
                    <div key={item.id} onClick={() => onMovieClick(item)} className="cursor-pointer group/card transition-all duration-300 hover:scale-105">
                        <div className="relative rounded-xl overflow-hidden aspect-[2/3] w-full mb-2 shadow-lg border border-white/5 bg-[#1f1f1f]">
                            <MovieImage src={item.img} title={item.title} />
                            <div className={`absolute top-1.5 left-1.5 md:top-2 md:left-2 text-[10px] md:text-[11px] font-bold px-1.5 md:px-2 py-0.5 rounded backdrop-blur-md ${item.rating >= 8 ? 'bg-green-600/90 text-white' : 'bg-gray-500/90 text-white'}`}>{item.rating}</div>
                        </div>
                        <h4 className="font-bold text-[12px] md:text-[14px] leading-tight truncate pr-2 text-gray-100 group-hover/card:text-[#f50] transition-colors">{item.title}</h4>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const Footer = () => (
    <footer className="bg-[#141414] border-t border-white/5 pt-12 pb-24 md:pb-12 mt-12">
        <div className="px-6 md:px-12 max-w-7xl mx-auto text-center md:text-left">
            <h1 className="text-2xl font-black text-[#f50] uppercase mb-6">CINEMA+</h1>
            <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-gray-500"><p>© 2026 Cinema+. Сделано с любовью.</p></div>
        </div>
    </footer>
);

// --- ГЛАВНАЯ СТРАНИЦА ---
export default function KinopoiskPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [savedMovieIds, setSavedMovieIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [modalMovie, setModalMovie] = useState(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % HERO_MOVIES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + HERO_MOVIES.length) % HERO_MOVIES.length);

  const toggleSave = (id) => {
      setSavedMovieIds(prev => prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]);
  };

  const handleSearchInput = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      if (query.trim() !== '') {
          setActiveTab('search');
          window.scrollTo(0, 0);
      } else {
          setActiveTab('home');
      }
  };

  const navigateTo = (tab) => {
      setActiveTab(tab);
      setSearchQuery('');
      setIsMobileSearchOpen(false);
      window.scrollTo(0, 0);
  };

  if (!hasMounted) return <div className="min-h-screen bg-[#0f0f0f]" />;

  const currentMovie = HERO_MOVIES[currentIndex];
  const searchResults = ALL_MOVIES.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.year.includes(searchQuery)
  );
  const myMovies = ALL_MOVIES.filter(m => savedMovieIds.includes(m.id));

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans overflow-x-hidden relative">
      
      <AnimatePresence>
          {modalMovie && (
              <MovieModal movie={modalMovie} onClose={() => setModalMovie(null)} isSaved={savedMovieIds.includes(modalMovie.id)} onToggleSave={toggleSave} />
          )}
      </AnimatePresence>

      {/* --- НАВИГАЦИЯ --- */}
      <nav className={`fixed top-0 w-full z-50 px-4 md:px-8 py-3 md:py-4 flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 ${scrolled || activeTab !== 'home' ? 'bg-[#0f0f0f]/95 shadow-lg backdrop-blur-sm' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
        <div className="flex items-center justify-between w-full md:w-auto gap-12">
           <h1 onClick={() => navigateTo('home')} className="text-xl md:text-2xl font-black text-[#f50] tracking-tighter cursor-pointer uppercase">CINEMA+</h1>
           <div className="hidden lg:flex gap-6 text-[15px] font-medium text-gray-300">
             <button onClick={() => navigateTo('home')} className={`transition ${activeTab === 'home' ? 'text-white font-bold' : 'hover:text-white'}`}>Главное</button>
             <button onClick={() => navigateTo('my')} className={`transition ${activeTab === 'my' ? 'text-white font-bold' : 'hover:text-white'}`}>Моё</button>
           </div>
           <div className="flex gap-4 md:hidden">
               <Search onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} className="cursor-pointer text-gray-300 hover:text-white w-6 h-6" />
           </div>
        </div>

        <div className="hidden md:flex items-center gap-4 md:gap-6">
          <div className="flex bg-[#1f1f1f]/80 backdrop-blur-md items-center px-3 py-2 rounded-lg w-64 border border-transparent focus-within:border-[#ff6600] transition-all">
             <Search size={18} className={searchQuery ? 'text-white' : 'text-gray-400'} />
             <input type="text" value={searchQuery} onChange={handleSearchInput} placeholder="Фильмы, сериалы, жанры..." className="bg-transparent border-none outline-none text-sm ml-3 text-white w-full" />
          </div>
          <User className="cursor-pointer text-gray-300 hover:text-white w-6 h-6" />
        </div>

        {isMobileSearchOpen && (
            <div className="w-full mt-4 md:hidden">
                <div className="flex bg-[#1f1f1f] items-center px-3 py-2 rounded-lg w-full border border-[#f50]">
                    <Search size={18} className="text-[#f50]" />
                    <input autoFocus type="text" value={searchQuery} onChange={handleSearchInput} placeholder="Искать фильмы..." className="bg-transparent border-none outline-none text-sm ml-3 text-white w-full" />
                    <X size={18} onClick={() => {setIsMobileSearchOpen(false); setSearchQuery(''); setActiveTab('home');}} className="text-gray-400 cursor-pointer ml-2" />
                </div>
            </div>
        )}
      </nav>

      {/* --- НИЖНЯЯ ПАНЕЛЬ ДЛЯ ТЕЛЕФОНА --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#141414]/95 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
          <div className="flex justify-around items-center py-2 px-2">
              <button onClick={() => navigateTo('home')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'home' ? 'text-[#f50]' : 'text-gray-400'}`}><Home size={22} /><span className="text-[10px] font-medium">Главная</span></button>
              <button onClick={() => {setIsMobileSearchOpen(true); setActiveTab('search'); window.scrollTo(0,0);}} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'search' ? 'text-[#f50]' : 'text-gray-400'}`}><Search size={22} /><span className="text-[10px] font-medium">Поиск</span></button>
              <button onClick={() => navigateTo('my')} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'my' ? 'text-[#f50]' : 'text-gray-400'}`}><Bookmark size={22} /><span className="text-[10px] font-medium">Моё</span></button>
              <button className="flex flex-col items-center gap-1 p-2 text-gray-400"><User size={22} /><span className="text-[10px] font-medium">Профиль</span></button>
          </div>
      </div>

      {/* --- ОСНОВНОЙ КОНТЕНТ --- */}
      {activeTab === 'home' && (
          <>
              {/* --- ИСПРАВЛЕННЫЙ HERO СЛАЙДЕР С КНОПКАМИ И АВТОПЛЕЕМ ДЛЯ ТЕЛЕФОНОВ --- */}
              <section className="relative h-[70vh] md:h-[85vh] w-full bg-black overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none scale-[1.5] md:scale-[1.35]">
                    {/* Добавлен playsinline=1 для автоплея на телефонах без полноэкранного режима */}
                    <iframe 
                        key={currentMovie.videoId} 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${currentMovie.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&loop=1&playlist=${currentMovie.videoId}&modestbranding=1&playsinline=1`} 
                        className="w-full h-full object-cover opacity-70 md:opacity-80" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/50 md:via-transparent to-transparent z-10" />
                
                <div className="absolute inset-0 z-20 flex flex-col justify-end md:justify-center px-4 md:px-12 pb-16 md:pb-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-4xl md:text-7xl font-black mb-3 uppercase text-white drop-shadow-2xl">{currentMovie.title}</h2>
                            <p className="text-sm md:text-lg text-gray-300 mb-6 max-w-[90%] md:max-w-xl line-clamp-3">{currentMovie.desc}</p>
                            <div className="flex gap-3 relative z-30">
                              <button onClick={() => setModalMovie(currentMovie)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#f50] text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600"><Play fill="white" size={20} /> Смотреть</button>
                              <button onClick={() => setIsMuted(!isMuted)} className="p-3 bg-white/10 rounded-xl hover:bg-white/20 border border-white/10">{isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}</button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- ВОЗВРАЩЕНЫ КНОПКИ ПЕРЕКЛЮЧЕНИЯ HERO --- */}
                <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/5 hover:bg-[#f50] backdrop-blur-md transition-all group hidden sm:block"><ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110" /></button>
                <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/5 hover:bg-[#f50] backdrop-blur-md transition-all group hidden sm:block"><ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110" /></button>
              </section>

              <div className="relative z-30 -mt-6 md:-mt-24">
                {CATEGORIES.map((category, index) => (
                    <MovieRow key={index} title={category.title} items={category.items} onMovieClick={(movie) => setModalMovie(movie)} onShowAll={() => { setSearchQuery(category.items[0].genre); setActiveTab('search'); window.scrollTo(0,0); }} />
                ))}
              </div>
          </>
      )}

      {activeTab === 'my' && (
          <MovieGrid title="Мой список" movies={myMovies} onMovieClick={(movie) => setModalMovie(movie)} />
      )}

      {activeTab === 'search' && (
          <MovieGrid title={searchQuery ? `Поиск: ${searchQuery}` : "Все фильмы"} movies={searchResults} onMovieClick={(movie) => setModalMovie(movie)} />
      )}

      <Footer />
    </div>
  );
}