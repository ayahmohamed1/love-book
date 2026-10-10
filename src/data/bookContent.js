/**
 * =========================================================================
 * 💖 BOOK CONTENT CONFIGURATION (التحكم في بيانات الكتاب من الكود)
 * =========================================================================
 * جميع الصور موجودة داخل مجلد: public/images/
 * ملف الأغنية موجود داخل مجلد: public/audio/
 */

export const bookContent = {
  // ألوان الثيم (برجاندي مخملي عميق فاخر + أبيض نقي)
  theme: {
    burgundy: "#4a1017",
    burgundyDark: "#2e070c",
    burgundyAccent: "#6b1723",
    goldScript: "#e29b62",
    white: "#ffffff",
  },

  // 1️⃣ صفحة الغلاف (Cover Page - OUR LOVE)
  cover: {
    title: "OUR LOVE",
    subtitle: "BOOK OF US ",
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
    // صورة الغلاف (توضع داخل الإطار الأبيض كاملة بدون أي قص)
    image: "/images/Couple (2).jpg",
  },

  // 2️⃣ الصفحة 1: كارت رسالة القطة (Message Page)
  messagePage: {
    // صورة القطة بالأعلى (يمكن استبدالها بأي صورة تختارها)
    topImage: "/images/cat.jpg",
    title: "Happy Birthday, my love.",
    message: "Being with you is truly one of the best things that has ever happened to me. From the moment you came into my life, everything started to feel brighter and more meaningful..."
  },

  // 3️⃣ الصفحة 2: صفحة الـ 6 صور (Memories 2x3 Grid)
  memoriesPage: {
    title: "our memories",
    // مصفوفة الـ 6 صور (كل 2 بجانب بعض)
    photos: [
      { id: 1, url: "/images/grid-1.jpg" },
      { id: 2, url: "/images/grid-2.jpg" },
      { id: 3, url: "/images/grid-3.jpg" },
      { id: 4, url: "/images/grid-4.jpg" },
      { id: 5, url: "/images/grid-5.jpg" },
      { id: 6, url: "/images/grid-6.jpg" },
    ]
  },

  // 4️⃣ الصفحة 3: مشغل الأغنية العصري (Modern Burgundy Player)
  musicPage: {
    song: {
      title: "Our Song",
      artist: "every word for you",
      stampImage: "/images/Couple (2).jpg",
      audioUrl: "/audio/song.mp3",
    }
  },

  // 5️⃣ الصفحة 4: LOVE LOVE LOVE وبولارويد (Full Page)
  lovePage: {
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
  },

  // 6️⃣ الصفحة 5: صورة القلب النهائية (Lace Heart Page)
  backPage: {
    // صورة القلب المخططة بالدانتيل (مجرد صورة تتغير بسهولة من هنا)
    image: "/images/heart-lace-final.jpg",
  }
};
