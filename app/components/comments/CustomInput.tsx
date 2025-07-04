"use client";

import {
  defineSchema,
  EditorProvider,
  PortableTextEditable,
} from "@portabletext/editor";
import type {
  PortableTextBlock,
  RenderDecoratorFunction,
  RenderStyleFunction,
} from "@portabletext/editor";
import { EventListenerPlugin } from "@portabletext/editor/plugins";
import { SetStateAction, useEffect, useState } from "react";
import { useEditor, useEditorSelector } from "@portabletext/editor";
import {
  ALargeSmall,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Quote,
  Underline,
} from "lucide-react";
import * as selectors from "@portabletext/editor/selectors";
import { postComment, postReply } from "@/app/actions";
import { Session } from "next-auth";
import { uuid } from "@sanity/uuid";
import { COMMENTS_QUERYResult } from "@/sanity.types";
import { Dispatch } from "react";
import { OptimisticCommentActionType } from "./CommentSection";

// ...
const schemaDefinition = defineSchema({
  // Decorators are simple marks that don't hold any data
  decorators: [{ name: "strong" }, { name: "em" }, { name: "underline" }],
  // Styles apply to entire text blocks
  // There's always a 'normal' style that can be considered the paragraph style
  styles: [
    { name: "normal" },
    { name: "h1" },
    { name: "h2" },
    { name: "h3" },
    { name: "blockquote" },
  ],

  // The types below are left empty for this example.
  // See the rendering guide to learn more about each type.

  // Annotations are more complex marks that can hold data (for example, hyperlinks).
  annotations: [],
  // Lists apply to entire text blocks as well (for example, bullet, numbered).
  lists: [],
  // Inline objects hold arbitrary data that can be inserted into the text (for example, custom emoji).
  inlineObjects: [],
  // Block objects hold arbitrary data that live side-by-side with text blocks (for example, images, code blocks, and tables).
  blockObjects: [],
});

const CustomInput = ({
  postId,
  commentId,
  handleOptimisticComments,
  session,
  type = "comment",
  setComments,
  setShowReplyInput,
}: {
  postId: string | undefined;
  commentId?: string | undefined;
  handleOptimisticComments: (action: OptimisticCommentActionType) => void;
  session: Session | null;
  type: "comment" | "reply";
  setComments: Dispatch<SetStateAction<[] | COMMENTS_QUERYResult>>;
  setShowReplyInput?: Dispatch<SetStateAction<string | false>>;
}) => {
  const [value, setValue] = useState<Array<PortableTextBlock> | undefined>(
    undefined
  );
  const renderStyle: RenderStyleFunction = (props) => {
    if (props.schemaType.value === "h1") {
      return <h1>{props.children}</h1>;
    }
    if (props.schemaType.value === "h2") {
      return <h2>{props.children}</h2>;
    }
    if (props.schemaType.value === "h3") {
      return <h3>{props.children}</h3>;
    }
    if (props.schemaType.value === "blockquote") {
      return <blockquote>{props.children}</blockquote>;
    }
    return <>{props.children}</>;
  };
  const renderDecorator: RenderDecoratorFunction = (props) => {
    if (props.value === "strong") {
      return <strong>{props.children}</strong>;
    }
    if (props.value === "em") {
      return <em>{props.children}</em>;
    }
    if (props.value === "underline") {
      return <u>{props.children}</u>;
    }
    return <>{props.children}</>;
  };
  const [formError, setFormError] = useState(false);
  const checkIfEmpty = (
    value: Array<PortableTextBlock> | undefined
  ): boolean => {
    const result =
      !Array.isArray(value) ||
      value.every(
        (block) =>
          block._type !== "block" ||
          !Array.isArray(block.children) ||
          block.children.every((child: any) => !child.text?.trim())
      );
    return result;
  };
  const handlePost = async (
    value: Array<PortableTextBlock> | undefined,
    postId: string | undefined
  ) => {
    const isEmpty = checkIfEmpty(value);

    if (session) {
      if (!isEmpty) {
        setFormError(false);
        const comment: any = {
          _id: "temp-id",
          publishedAt: new Date().toISOString(),
          user: {
            _id: session?.id,
            name: session?.user?.name as string | null,
            avatar: session?.user?.image as string | null,
          },
          post: {
            _id: postId as string,
          },
          body: value as any,
          likes: [],
          dislikes: [],
        };
        const _id = uuid();
        if (type === "reply") {
          handleOptimisticComments({
            type: "ADD REPLY",
            payload: { ...comment, sending: true, comment: { _id: commentId } },
          });
          await postReply(value, postId, commentId, _id);
          setComments((prev) => {
            const newState = prev.map((item) => {
              if (item._id === commentId) {
                const newReplies = [{ ...comment, _id }, ...item.replies];
                return { ...item, replies: newReplies };
              }
              return item;
            });
            return newState;
          });
          setShowReplyInput && setShowReplyInput(false);
        } else {
          handleOptimisticComments({
            type: "ADD COMMENT",
            payload: { ...comment, sending: true, replies: [] },
          });
          await postComment(value, postId, _id);
          setComments((prev) => [{ ...comment, _id, replies: [] }, ...prev]);
        }
      } else {
        setFormError(true);
      }
    }
  };
  return (
    <>
      <form
        className={
          !session
            ? "opacity-50 pointer-events-none cursor-not-allowed"
            : "flex-grow"
        }
        action={() => {
          handlePost(value, postId);
        }}
      >
        <EditorProvider
          initialConfig={{ schemaDefinition, initialValue: value }}
        >
          <div
            className={`bg-white rounded-xl ${type === "reply" ? "p-[5px]" : "p-[10px]"}  focus-within:shadow-xl shadow-black transition-shadow text-sm xs:p-3 xs:text-base`}
          >
            <EventListenerPlugin
              on={(event) => {
                if (event.type === "mutation") {
                  setValue(event.value);
                }
              }}
            />
            <PortableTextEditable
              placeholder={type === "comment" ? "Add a comment" : "Add a reply"}
              renderStyle={renderStyle}
              renderDecorator={renderDecorator}
              renderBlock={(props) => <div>{props.children}</div>}
              renderListItem={(props) => <>{props.children}</>}
              className="mb-4 outline-none break-all"
            />
            <div className="flex items-center flex-row justify-between">
              <Toolbar type={type} />
              <button
                disabled={!session}
                className={`${type === "reply" ? "text-xs px-[7px]" : "px-[10px]"} border-2 border-secondary text-sm  pt-[2px] rounded-full  text-secondary font-bold transition-colors duration-300 hover:bg-secondary hover:text-white self-end xs:text-base xs:px-[10px]`}
                type="submit"
              >
                Post
              </button>
            </div>
          </div>
        </EditorProvider>
      </form>
      {!session && (
        <p className="mt-7 font-medium font-oswald text-center text-secondary">
          Please sign in to post a comment
        </p>
      )}
      {formError && (
        <p className="mt-7 font-medium font-oswald text-center text-secondary">
          Please enter a valid comment
        </p>
      )}
    </>
  );
};
export default CustomInput;

function Toolbar({ type = "comment" }: { type: "comment" | "reply" }) {
  const styleIcons = {
    normal: <ALargeSmall />,
    h1: (
      <Heading1
        className={`${type === "reply" ? "size-[18px]" : "size-[20px]"} xs:size-auto`}
      />
    ),
    h2: (
      <Heading2
        className={`${type === "reply" ? "size-[18px]" : "size-[20px]"} xs:size-auto`}
      />
    ),
    h3: (
      <Heading3
        className={`${type === "reply" ? "size-[18px]" : "size-[20px]"} xs:size-auto`}
      />
    ),

    blockquote: (
      <Quote
        strokeWidth="2.2"
        className={`${type === "reply" ? "size-[13px]" : "size-[15px]"} xs:size-[18px]`}
      />
    ),
  };
  const decoratorIcons = {
    strong: <Bold strokeWidth={2.6} className="size-[14px] xs:size-[18px]" />,
    em: <Italic strokeWidth={2.6} className="size-[14px] xs:size-[18px]" />,
    underline: (
      <Underline strokeWidth={2.5} className="size-[16px] xs:size-[21px]" />
    ),
  };
  // useEditor provides access to the PTE
  const editor = useEditor();
  const styleButtons = schemaDefinition.styles.map((style) => {
    const active = useEditorSelector(
      editor,
      selectors.isActiveStyle(style.name)
    );
    return (
      <button
        key={style.name}
        type="button"
        onClick={() => {
          // Send style toggle event
          editor.send({ type: "style.toggle", style: style.name });
          editor.send({ type: "focus" });
        }}
        className={active ? "active-decorator" : "editor-btn"}
      >
        {styleIcons[style.name]}
      </button>
    );
  });
  const decoratorButtons = schemaDefinition.decorators.map((decorator) => {
    const active = useEditorSelector(
      editor,
      selectors.isActiveDecorator(decorator.name)
    );
    return (
      <button
        key={decorator.name}
        type="button"
        onClick={() => {
          // Send decorator toggle event
          editor.send({ type: "decorator.toggle", decorator: decorator.name });
          editor.send({ type: "focus" });
        }}
        className={active ? "active-decorator" : "editor-btn"}
      >
        {decoratorIcons[decorator.name]}
      </button>
    );
  });

  return (
    <div className="flex justify-between w-[77%] xs:w-auto xs:gap-[6px] sm:gap-3">
      {styleButtons}
      <div className="border-r-black/30 bg-black/30 border"></div>
      {decoratorButtons}
    </div>
  );
}
