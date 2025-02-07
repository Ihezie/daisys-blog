import SearchBar from "../components/Search";
import Post from "../components/posts/Post";

const Posts = () => {
  return (
    <main className="pt-12">
      <SearchBar />
      <section className="grid grid-cols-auto-fill gap-8">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </section>
    </main>
  );
};
export default Posts;
