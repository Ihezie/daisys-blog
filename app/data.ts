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
  body: "This is a lifestyle blog inspired by my sister. It doesn't contain any real posts for now. All posts are AI-generated for demo purposes. Don't bother clicking on the social links either; they're purely decorative (wouldn't want to expose her info 😅). Enjoy!❤️",
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
