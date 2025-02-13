import { SINGLE_POST_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { SINGLE_POST_QUERYResult } from "@/sanity.types";
import { ChevronLeft } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { ArrowDown } from "lucide-react";

const myPortableTextComponents = {
  block: {
    h1: ({ children, node }: any) => <h1 id={node._key}>{children}</h1>,
    h2: ({ children, node }: any) => <h2 id={node._key}>{children}</h2>,
    h3: ({ children, node }: any) => <h3 id={node._key}>{children}</h3>,
    h4: ({ children, node }: any) => <h4 id={node._key}>{children}</h4>,
    h5: ({ children, node }: any) => <h5 id={node._key}>{children}</h5>,
    h6: ({ children, node }: any) => <h6 id={node._key}>{children}</h6>,
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
  console.log(post);

  const categoryColor = post?.category?.tailwindColor || "bg-purple-400";
  return (
    <main className="pt-6">
      <button className="flex items-center gap-1 hover:bg-secondary-800 custom-transition rounded-full py-1 pr-3 pl-1 mb-5">
        <ChevronLeft size={28} />
        <span className="font-semibold mt-[3px]">Back</span>
      </button>
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
        className="mt-8 rounded-2xl max-h-[600px] object-cover"
      />
      {Array.isArray(post?.body) && <TableOfContents body={post.body} />}
      <article className="mt-16 prose">
        {Array.isArray(post?.body) && (
          <PortableText
            value={post.body}
            components={myPortableTextComponents}
          />
        )}
      </article>
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
  const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
  return (
    <nav className="mt-6">
      <ul>
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
                  <ArrowDown className="group-hover:text-secondary custom-transition" />
                </a>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};
