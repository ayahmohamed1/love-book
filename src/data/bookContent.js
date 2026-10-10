/**
 * =========================================================================
 * 💖 BOOK CONTENT CONFIGURATION (ملف تعديل بيانات الكتاب بسهولة)
 * =========================================================================
 * يمكنك تعديل جميع النصوص، الصور، الأغنية، والألوان من هذا الملف فقط!
 * مناسب جداً لإعادة الاستخدام لعدة عملاء ومناسبات مختلفة (حب، زواج، خطوبة، ذكرى سنوية).
 */

export const bookContent = {
  // إعدادات المظهر والألوان العامة (Burgundy & White Palette)
  theme: {
    burgundy: "#8b121e",        // اللون البرجاندي الرئيسي الغني
    burgundyDark: "#680a13",    // برجاندي داكن للظلال والعمق
    burgundyLight: "#a81c2b",   // برجاندي فاتح للهوفر والأزرار
    accentGold: "#e89f66",      // اللون الذهبي/المشمشي للنصوص المتشابكة
    paperWhite: "#fdfdfd",      // أبيض نقي للصفحات
    creamBg: "#f9f6f0",         // خلفية كريمية دافئة وراقية
    textDark: "#2d2a2a",        // لون النص الداكن
  },

  // 1️⃣ صفحة الغلاف (Cover Page) - مطابقة لتصميم OUR LOVE
  cover: {
    badge: "EDICIÓN ESPECIAL DE AMOR",
    title: "OUR LOVE",
    subtitle: "MI LUGAR FAVORITO",
    // الأقسام الأربعة الصغيرة الموجودة تحت العنوان
    columns: [
      {
        id: "historia",
        title: "HISTORIA",
        description: "Un conjunto de momentos, desde lo más simple hasta los más mágicos, y cada día que pasa solo lo hace más especial."
      },
      {
        id: "memories",
        title: "MEMORIES",
        description: "Fotos espontáneas, miradas llenas de amor y esos momentos que aunque parezcan pequeños en la memoria, hoy significan todo."
      },
      {
        id: "wishlist",
        title: "WISHLIST",
        description: "Un recordatorio de todo lo que nos espera, de las experiencias que nos iluminan y de los rincones que aún nos faltan visitar."
      },
      {
        id: "planeador",
        title: "PLANEADOR",
        description: "Una oportunidad para seguir sumando locura, abrazos y recuerdos que nos hagan sonreír con solo recordarlos."
      }
    ],
    // صورة الغلاف الرئيسية (صورة الشاطئ)
    // يمكن استبدال هذا الرابط بأي صورة من اختيارك
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Couple at the beach sunset",
    footerText: "THE CHAPTER OF YOU & ME"
  },

  // 2️⃣ التقليبة الأولى: (الصفحة اليسرى: القلبين والرسالة | الصفحة اليمنى: شبكة 9 صور)
  spread1: {
    // الصفحة اليسرى (Left Page): المدالية الفضية ذات القلبين + رسالة الحب
    leftPage: {
      // تفاصيل ميدالية القلبين (Double Heart Locket)
      locket: {
        titleLeft: "My",
        titleRight: "Love",
        // صورة القلب الأيسر
        leftHeartImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        // صورة القلب الأيمن
        rightHeartImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        // لو أردت وضع صورة واحدة كاملة جاهزة للميدالية بدلاً من التصميم البرمجي:
        customLocketFullImage: "", // اتركه فارغاً لاستخدام الميدالية التفاعلية المدمجة
      },
      // رسالة الحب (Love Letter Card)
      letter: {
        scriptHeading: "love",
        paragraphs: [
          "Sometimes it's hard to put into words just how much you mean to me, but as I write this, I want the world to know what an incredible partner you are. You are the first thing I think about when I wake up, and the last person I want to talk to before I fall asleep. Every day with you is a gift, a constant reminder that the best things in life are the simplest ones.",
          "You are the quiet comfort on a chaotic day and the biggest cheerleader when I'm chasing a dream. I value the little things that truly define us: the way you make my coffee just right without having to ask, the shared glance across the room that says everything without a single word, and the easy, effortless way we can make each other laugh until our stomachs hurt. Those small, beautiful moments are what I cherish the most."
        ],
        signature: "Forever Yours, Always ❤️"
      }
    },

    // الصفحة اليمنى (Right Page): شبكة الـ 9 صور (3x3 Photo Grid)
    rightPage: {
      title: "NUESTROS RECUERDOS",
      // مصفوفة الـ 9 صور (يمكن تغيير أي رابط أو وصف)
      photos: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
          caption: "اليوم الأول معاً"
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
          caption: "ضحكات لا تنتهي"
        },
        {
          id: 3,
          url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
          caption: "ليلة تحت النجوم"
        },
        {
          id: 4,
          url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
          caption: "رقصتنا المفضلة"
        },
        {
          id: 5,
          url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
          caption: "حفل لا يُنسى"
        },
        {
          id: 6,
          url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=600&q=80",
          caption: "قلب لقلب"
        },
        {
          id: 7,
          url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
          caption: "غروب ساحر"
        },
        {
          id: 8,
          url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
          caption: "حديث المساء الهادئ"
        },
        {
          id: 9,
          url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
          caption: "معاً إلى الأبد"
        }
      ]
    }
  },

  // 3️⃣ التقليبة الثانية: (الصفحة اليسرى: مشغل الأغنية بطابع الطابع البريدي | الصفحة اليمنى: LOVE LOVE LOVE وبولارويد)
  spread2: {
    // الصفحة اليسرى (Left Page): تصميم مشغل الأغنية كطابع بريدي
    leftPage: {
      song: {
        title: "Por primera vez",
        artist: "Camilo y Evaluna Montaner",
        album: "Por Primera Vez",
        // صورة الطابع البريدي (النافذة في الطائرة أو أي لحظة مميزة)
        stampImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
        // رابط ملف الصوت (ملف نغمة رومانسية حقيقية هادئة تعمل مباشرة)
        audioUrl: "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-1100.mp3",
        duration: "3:02",
        // كلام رومانسي يظهر تحت المشغل
        quote: "Tú eres la respuesta a todas mis oraciones."
      }
    },

    // الصفحة اليمنى (Right Page): تصميم الكلمات التايبوجرافية LOVE LOVE LOVE
    rightPage: {
      // الكلمات الكبيرة المتكررة باللون الأبيض
      bigWords: ["LOVE", "LOVE", "LOVE", "LOVE"],
      // الكلمات المتداخلة بخط اليد باللون الذهبي / المشمشي
      cursiveOverlays: [
        { text: "En este", position: "26%" },
        { text: "lugar", position: "48%" },
        { text: "favorito", position: "70%" }
      ],
      // صورتي البولارويد المائلتين بزوايا واقعية وظلال
      polaroids: [
        {
          id: "top-polaroid",
          image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
          caption: "Roma, Italy",
          rotation: 12, // درجة الميلان
          top: "14%",
          right: "12%"
        },
        {
          id: "bottom-polaroid",
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
          caption: "Our Special Place",
          rotation: -10, // درجة الميلان
          bottom: "16%",
          left: "14%"
        }
      ]
    }
  },

  // 4️⃣ الصفحة الختامية (Back Cover): كلمة ختامية وملاحظة دافئة
  backCover: {
    title: "Forever & Always",
    message: "Every love story is beautiful, but ours is my favorite.",
    dateText: "Since the first moment",
    footerQuote: "Written in the stars, lived by our hearts."
  }
};
