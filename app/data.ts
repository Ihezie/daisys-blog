export interface AboutBlog {
  _type: string;
  id: string;
  image: string;
  title: string;
  body: string;
  socials: Socials[];
}
interface Socials {
  icon: string;
  name: string;
  link: string;
}
interface Link {
  text: string;
  link: string;
}
export const links: Link[] = [
  { text: "home", link: "/" },
  { text: "posts", link: "/posts" },
  { text: "favourites", link: "/favourites" },
];
export const aboutBlog: AboutBlog = {
  _type: "about-blog",
  id: "blog-desc",
  image: "/daisy/daisy-6.jpg",
  title: "Hey stranger!",
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, eligendi a! Qui impedit dolore magni omnis sunt! Adipisci a placeat distinctio et necessitatibus enim quod voluptates sit, commodi earum dolor?",
  socials: [
    { icon: "/social-icons/black/tik-tok.png", name: "tik-tok", link: "" },
    {
      icon: "/social-icons/black/instagram.png",
      name: "instagram",
      link: "",
    },
    { icon: "/social-icons/black/youtube.png", name: "youtube", link: "" },
    { icon: "/social-icons/black/twitter.png", name: "twitter", link: "" },
  ],
};
