import CommentInput from "@/app/components/comments/CommentInput";
import Comment from "./Comment";
import { sanityFetch } from "@/sanity/lib/live";
import { COMMENTS_QUERY } from "@/sanity/lib/queries";
import { COMMENTS_QUERYResult } from "@/sanity.types";
const CommentSection = async ({ postId }: { postId: string | undefined }) => {
  const { data: comments }: { data: COMMENTS_QUERYResult } = await sanityFetch({
    query: COMMENTS_QUERY,
    params: { postId },
  });

  return (
    <section className="mt-20">
      <CommentInput postId={postId} />
      <section className="mt-8 border-t border-black/30 pt-12">
        <header className="flex justify-between items-center">
          <h2
            className="text-xl
          "
          >
            Comments{" "}
            <span className="font-josefin-sans font-semibold bg-secondary pt-1 pb-[2px] rounded-full text-white text-sm align-middle px-2 ml-1">
              {comments.length}
            </span>
          </h2>
          <div>Most recent</div>
        </header>
        <section className="mt-5">
          {comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
        </section>
      </section>
    </section>
  );
};
export default CommentSection;
