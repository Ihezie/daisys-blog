interface Link {
  text: string;
  link: string;
}
interface BlogPost {
  id: string;
  image: string;
  title: string;
  category: string;
  date: string;
  body: string;
  comments: any[];
}
interface BlogDesc {
  id: string;
  image: string;
  title: string;
  body: string;
}
export interface Category {
  image: string;
  animatedIcon: {
    src: string;
    alt: string;
  };
  color: string;
}

export const categories: { [key: string]: Category } = {
  skincare: {
    image: "/category-images/skincare.jpeg",
    animatedIcon: {
      src: "/organic-cream.gif",
      alt: "organic-cream",
    },
    color: "bg-orange-400",
  },
  makeup: {
    image: "/category-images/makeup.jpeg",
    animatedIcon: {
      src: "/blush.gif",
      alt: "blush",
    },
    color: "bg-green-400",
  },
  exercise: {
    image: "/category-images/exercise.jpeg",
    animatedIcon: {
      src: "/training.gif",
      alt: "woman-training",
    },
    color: "bg-yellow-400",
  },
  haircare: {
    image: "/category-images/haircare.jpeg",
    animatedIcon: {
      src: "/hairdryer.gif",
      alt: "hairdryer",
    },
    color: "bg-blue-400",
  },
  fashion: {
    image: "/category-images/fashion.jpeg",
    animatedIcon: {
      src: "/dress.gif",
      alt: "dress",
    },
    color: "bg-green-400",
  },
  soliloquies: {
    image: "/category-images/soliloquies.jpeg",
    animatedIcon: {
      src: "/brain.gif",
      alt: "brain",
    },
    color: "bg-purple-400",
  },
};

export const links: Link[] = [
  { text: "posts", link: "/posts" },
  { text: "favourites", link: "/favourites" },
  { text: "shop", link: "/shop" },
];

export const carouselData: any[] = [
  {
    id: "blog-desc",
    image: "/daisy-3.jpg",
    title: "Hey stranger!",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, eligendi a! Qui impedit dolore magni omnis sunt! Adipisci a placeat distinctio et necessitatibus enim quod voluptates sit, commodi earum dolor?",
  },
  {
    id: "1",
    image:
      "https://i.pinimg.com/736x/b6/7f/36/b67f36818bc6fd59331823e073041de3.jpg",
    title: "The Ultimate Skin Care Routine",
    category: "skincare",
    date: "15 Feb 2025",
    body: "Achieving glowing skin requires a consistent and effective skincare routine. From cleansing and exfoliating to moisturizing and sun protection, every step plays a crucial role. Proper skincare is not just about applying products but understanding your skin type and its needs. Using gentle cleansers, hydrating serums, and effective sunscreens can help maintain a youthful glow. Additionally, incorporating a balanced diet, staying hydrated, and getting adequate sleep play significant roles in skin health. This guide will provide step-by-step instructions and recommend essential products tailored to different skin types, ensuring you achieve and maintain radiant skin.",
    comments: [],
  },
  {
    id: "2",
    image:
      "https://i.pinimg.com/736x/6b/a8/2c/6ba82c9d68fafbc6c64d0a8218ec8d82.jpg",
    title: "Timeless Fashion Trends",
    category: "fashion",
    date: "07 Mar 2025",
    body: "Fashion trends come and go, but some styles remain timeless. Building a wardrobe with versatile pieces allows you to always stay stylish without chasing fleeting trends. Items such as a well-fitted blazer, classic denim, little black dresses, and quality leather shoes are essential for any wardrobe. Understanding how to mix and match these staples with modern elements can elevate your style effortlessly. Accessories like statement watches, scarves, and handbags further enhance any outfit. This post explores key wardrobe investments, color coordination tips, and strategies to adapt classic styles for contemporary fashion.",
    comments: [],
  },
  {
    id: "3",
    image:
      "https://i.pinimg.com/736x/c7/a9/bc/c7a9bc89f2b3d22f4781f9fb7fd7d4e3.jpg",
    title: "Effective Exercise Routines",
    category: "exercise",
    date: "21 Apr 2025",
    body: "Regular exercise is essential for maintaining a healthy body and mind. An effective routine includes a mix of strength training, cardiovascular workouts, and flexibility exercises to ensure overall fitness. Strength training helps build muscle and boost metabolism, while cardio improves heart health and endurance. Incorporating activities like yoga or Pilates enhances flexibility and reduces stress. A well-balanced workout schedule should also include rest days to allow muscle recovery and prevent injuries. This blog provides detailed workout plans tailored for beginners, intermediate, and advanced fitness levels, ensuring everyone finds a suitable and enjoyable routine.",
    comments: [],
  },
];
