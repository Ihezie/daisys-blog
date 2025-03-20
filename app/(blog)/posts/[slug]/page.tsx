import { SINGLE_POST_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { SINGLE_POST_QUERYResult } from "@/sanity.types";
import { ArrowDown, ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { PortableText } from "next-sanity";
import BackButton from "@/app/components/BackButton";

const myPortableTextComponents = {
  block: {
    h1: ({ children, node }: any) => <h1 id={node._key}>{children}</h1>,
    h2: ({ children, node }: any) => <h2 id={node._key}>{children}</h2>,
    h3: ({ children, node }: any) => <h3 id={node._key}>{children}</h3>,
  },
};

const Post = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const post = await client.fetch<SINGLE_POST_QUERYResult>(
    SINGLE_POST_QUERY,
    { slug: slug }
    // { cache: "force-cache" }
  );
  const postImageUrl = post?.image
    ? urlFor(post.image)?.width(1500).height(1200).url()
    : null;

  const categoryColor = post?.category?.tailwindColor || "bg-purple-400";
  return (
    <main className="pt-6">
      <BackButton/>
      <div className="flex justify-center items-center gap-4">
        <span
          className={`py-[2px] px-3 rounded-full ${categoryColor} capitalize`}
        >
          {post?.category?.name}
        </span>
        <span className="border-r h-7 inline-block border-black/50"></span>
        <span className="">{formatDate(post?.publishedAt || "")}</span>
      </div>
      <h1 className="text-center mt-8">{post?.title}</h1>
      <Image
        src={postImageUrl || "/no-image.jpg"}
        width={1500}
        height={1200}
        alt={post?.title || ""}
        className="mt-8 rounded-2xl max-h-[550px] object-cover"
      />
      <section className="xl:grid xl:grid-cols-[35%_61%] xl:mt-16 xl:gap-[4%]">
        {Array.isArray(post?.body) && <TableOfContents body={post.body} />}
        <article className="mt-16 prose xl:mt-0">
          {Array.isArray(post?.body) && (
            <PortableText
              value={post.body}
              components={myPortableTextComponents}
            />
          )}
        </article>
      </section>
    </main>
  );
};
export default Post;

const TableOfContents = ({
  body,
}: {
  body: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
}) => {
  const headings = ["h1", "h2", "h3"];
  return (
    <nav className="mt-6 xl:mt-0">
      <ul className="xl:sticky xl:top-28">
        {body.map((item) => {
          if (headings.includes(item?.style || "")) {
            const text = [
              ...(item.children?.map((child) => child?.text) as string[]),
            ].join(" ");
            return (
              <li key={item._key}>
                <a
                  href={`#${item?._key}`}
                  className="border-b group border-black py-[10px] flex justify-between cursor-pointer"
                >
                  <span className="group-hover:text-secondary custom-transition">
                    {text}
                  </span>
                  <ArrowDown className="group-hover:text-secondary custom-transition xl:hidden" />
                  <ArrowRight className="group-hover:text-secondary custom-transition hidden xl:block" />
                </a>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};
