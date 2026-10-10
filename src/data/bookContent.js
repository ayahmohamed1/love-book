/**
 * =========================================================================
 * 💖 BOOK CONTENT CONFIGURATION (التحكم في بيانات الكتاب من الكود)
 * =========================================================================
 * جميع الصور موجودة داخل مجلد: public/images/
 * ملف الأغنية موجود داخل مجلد: public/audio/
 * يمكنك استبدال أي صورة أو نص مباشرة من هنا.
 */

export const bookContent = {
  // ألوان الثيم (برجاندي دافئ أنيق وداكن + أبيض كريمي)
  theme: {
    burgundy: "#5c0b14",        // برجاندي داكن دافئ وراقي
    burgundyDark: "#43050b",    // للظلال والعمق
    goldScript: "#e29b62",      // اللون الذهبي للكلمات المتداخلة
    creamCard: "#f7f2e8",       // لون كارت الصفحة الأخيرة
    white: "#ffffff",
  },

  // 1️⃣ صفحة الغلاف (Cover Page)
  cover: {
    // صورة الغلاف بالكامل (تناسب التصميم المعطى بدقة 100% بدون أي قص):
    fullCoverImage: "/images/cover.jpg",

    // أو يمكنك تفريغ fullCoverImage واستخدام التصميم البرمجي مع نصوص مخصصة وصورة الكابلز:
    title: "OUR LOVE",
    subtitle: "MI LUGAR FAVORITO",
    columns: [
      {
        title: "HISTORIA",
        desc: "Un conjunto de momentos, desde lo más simple hasta los más mágicos."
      },
      {
        title: "MEMORIES",
        desc: "Fotos espontáneas, miradas llenas de amor y esos momentos que hoy significan todo."
      },
      {
        title: "WISHLIST",
        desc: "Un recordatorio de todo lo que nos espera y nos ilumina."
      },
      {
        title: "PLANEADOR",
        desc: "Una oportunidad para seguir sumando locura y abrazos."
      }
    ],
    image: "/images/cover.jpg",
  },

  // 2️⃣ التقليبة الأولى (Spread 1)
  spread1: {
    // الصفحة اليسرى: ميدالية القلبين + رسالة الحب
    leftPage: {
      locket: {
        titleLeft: "My",
        titleRight: "Love",
        leftHeartImage: "/images/locket-left.jpg",
        rightHeartImage: "/images/locket-right.jpg",
      },
      letter: {
        scriptHeading: "love",
        paragraphs: [
          "Sometimes it's hard to put into words just how much you mean to me, but as I write this, I want the world to know what an incredible partner you are. You are the first thing I think about when I wake up, and the last person I want to talk to before I fall asleep. Every day with you is a gift, a constant reminder that the best things in life are the simplest ones.",
          "You are the quiet comfort on a chaotic day and the biggest cheerleader when I'm chasing a dream. I value the little things that truly define us: the way you make my coffee just right without having to ask, the shared glance across the room that says everything without a single word, and the easy, effortless way we can make each other laugh until our stomachs hurt. Those small, beautiful moments are what I cherish the most."
        ]
      }
    },

    // الصفحة اليمنى: شبكة 9 صور
    rightPage: {
      photos: [
        { id: 1, url: "/images/grid-1.jpg" },
        { id: 2, url: "/images/grid-2.jpg" },
        { id: 3, url: "/images/grid-3.jpg" },
        { id: 4, url: "/images/grid-4.jpg" },
        { id: 5, url: "/images/grid-5.jpg" },
        { id: 6, url: "/images/grid-6.jpg" },
        { id: 7, url: "/images/grid-7.jpg" },
        { id: 8, url: "/images/grid-8.jpg" },
        { id: 9, url: "/images/grid-9.jpg" },
      ]
    }
  },

  // 3️⃣ التقليبة الثانية (Spread 2)
  spread2: {
    // الصفحة اليسرى: مشغل الأغنية بطابع الطابع البريدي
    leftPage: {
      song: {
        title: "Por primera vez",
        artist: "Camilo y Evaluna Montaner",
        stampImage: "/images/song-cover.jpg",
        audioUrl: "/audio/song.mp3",
      }
    },

    // الصفحة اليمنى: LOVE LOVE LOVE وبولارويد
    rightPage: {
      bigWords: ["LOVE", "LOVE", "LOVE", "LOVE"],
      cursiveOverlays: [
        { text: "En este", position: "26%" },
        { text: "lugar", position: "48%" },
        { text: "favorito", position: "70%" }
      ],
      polaroids: [
        {
          id: 1,
          image: "/images/polaroid-1.jpg",
          rotation: 12,
          top: "14%",
          right: "12%"
        },
        {
          id: 2,
          image: "/images/polaroid-2.jpg",
          rotation: -10,
          bottom: "16%",
          left: "14%"
        }
      ]
    }
  },

  // 4️⃣ الصفحة الختامية (Back Page - You are loved)
  backPage: {
    image: "/images/back-cover.jpg",
    title: "You are",
    titleSecondLine: "loved.",
    subtitle: "In every whispered breeze and\nevery star above.",
  }
};
