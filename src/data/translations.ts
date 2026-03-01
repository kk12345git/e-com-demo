export type Language = 'en' | 'ta' | 'mm';

type TranslationDictionary = {
    [key: string]: {
        en: string;
        ta: string;
        mm: string;
    };
};

export const translations: TranslationDictionary = {
    // Navigation
    "nav.collections": {
        en: "Collections",
        ta: "தொகுப்புகள்",
        mm: "Items buddy",
    },
    "nav.login": {
        en: "Login",
        ta: "உள்நுழைய",
        mm: "Log in pannu",
    },
    "nav.account": {
        en: "Your Account",
        ta: "உங்கள் கணக்கு",
        mm: "Ungal Account",
    },
    "nav.wishlist": {
        en: "Wishlist",
        ta: "விருப்பப்பட்டியல்",
        mm: "Wishlist",
    },
    "nav.search": {
        en: "Search products...",
        ta: "தயாரிப்புகளைத் தேடுங்கள்...",
        mm: "Enna venum thedu buddy...",
    },

    // Hero Section
    "hero.badge": {
        en: "New Arrivals",
        ta: "புதிய வரவுகள்",
        mm: "Pudhu varavu buddy",
    },
    "hero.title1": {
        en: "Premium Indian",
        ta: "சிறந்த இந்திய",
        mm: "Semma Indian",
    },
    "hero.title2": {
        en: "Craftsmanship.",
        ta: "கைவினைத்திறன்.",
        mm: "Products da.",
    },
    "hero.subtitle": {
        en: "Discover curated collections bringing the best of India to the world. Authentic, premium, and globally loved.",
        ta: "இந்தியாவின் சிறந்தவற்றை உலகிற்கு கொண்டு வரும் தொகுக்கப்பட்ட சேகரிப்புகளைக் கண்டறியவும். உண்மையான, பிரீமியம் மற்றும் உலகளவில் விரும்பப்படும்.",
        mm: "Namma ooru best items ellam ulagathukku kondu porom. Suddhamana, premium, verify panna products.",
    },
    "hero.cta": {
        en: "Shop Now",
        ta: "இப்போது வாங்கவும்",
        mm: "Vangu buddy",
    },

    // Homepage Sections
    "home.trending.badge": {
        en: "Trending Now",
        ta: "தற்போது பிரபலமானவை",
        mm: "Trend aagudhu buddy",
    },
    "home.trending.title1": {
        en: "Our ",
        ta: "எங்கள் ",
        mm: "Namma ",
    },
    "home.trending.title2": {
        en: "Collection.",
        ta: "சேகரிப்பு.",
        mm: "Sarakku.",
    },
    "home.seeAll": {
        en: "See All Items",
        ta: "அனைத்து பொருட்களையும் பார்க்க",
        mm: "Ellam paaru buddy",
    },

    // Newsletter
    "newsletter.badge": {
        en: "Exclusive Community",
        ta: "பிரத்யேக சமூகம்",
        mm: "Namma Vibe",
    },
    "newsletter.title": {
        en: "Join The Club",
        ta: "கிளப்பில் சேரவும்",
        mm: "Vandhu join pannu buddy",
    },
    "newsletter.subtitle": {
        en: "Subscribe to get 15% off your first order, plus early access to new drops and private sales.",
        ta: "உங்கள் முதல் ஆர்டரில் 15% தள்ளுபடியைப் பெற பதிவு செய்யவும், மேலும் புதிய வெளியீடுகள் மற்றும் தனிப்பட்ட விற்பனைகளுக்கான ஆரம்ப அணுகலைப் பெறவும்.",
        mm: "Join pannikko, first order-ku 15% cut. Pudhu items vandha muthalla unakku dhaan solluvom.",
    },
    "newsletter.placeholder": {
        en: "Enter your email address",
        ta: "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
        mm: "Un email podu buddy",
    },
    "newsletter.button": {
        en: "Subscribe",
        ta: "பதிவு செய்க",
        mm: "Ulla vanthuru",
    },
    "newsletter.toast.title": {
        en: "Welcome!",
        ta: "வரவேற்கிறோம்!",
        mm: "Kudu da kaiya!",
    },
    "newsletter.toast.desc": {
        en: "You successfully joined our community.",
        ta: "நீங்கள் வெற்றிகரமாக எங்கள் சமூகத்தில் இணைந்துள்ளீர்கள்.",
        mm: "Vibe-la join panniyachu buddy. Enjoy.",
    },

    // Footer
    "footer.desc": {
        en: "From India To The World. Authentic premium marketplace.",
        ta: "இந்தியாவில் இருந்து உலகிற்கு. உண்மையான பிரீமியம் சந்தை.",
        mm: "Namma ooru items ulagathukku. Semma mass marketplace.",
    },
    "footer.linksTag": {
        en: "Quick Links",
        ta: "விரைவான இணைப்புகள்",
        mm: "Namba Pages",
    },
    "footer.supportTag": {
        en: "Support",
        ta: "ஆதரவு",
        mm: "Uthavi Buddy",
    },

    // Common UI
    "ui.only": {
        en: "Only",
        ta: "மட்டும்",
        mm: "Only",
    },
    "ui.left": {
        en: "left",
        ta: "மீதம்",
        mm: "left buddy",
    },
    "ui.addToCart": {
        en: "Add to Cart",
        ta: "வண்டியில் சேர்",
        mm: "Bag-la podu",
    },
    "ui.viewing": {
        en: "viewing right now",
        ta: "தற்போது பார்க்கிறார்கள்",
        mm: "ippo paakuranga",
    },
};
