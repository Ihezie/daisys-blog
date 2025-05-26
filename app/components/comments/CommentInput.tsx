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
import { useState } from "react";
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
import { postComment } from "@/app/actions";

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

const CommentInput = ({postId} : {postId: string | undefined}) => {
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

  return (
    <EditorProvider initialConfig={{ schemaDefinition, initialValue: value }}>
      <div className="bg-white rounded-xl p-[10px] focus-within:shadow-xl shadow-black transition-shadow sm:p-3">
        <EventListenerPlugin
          on={(event) => {
            if (event.type === "mutation") {
              setValue(event.value);
            }
          }}
        />
        <PortableTextEditable
          placeholder="Add a comment"
          renderStyle={renderStyle}
          renderDecorator={renderDecorator}
          renderBlock={(props) => <div>{props.children}</div>}
          renderListItem={(props) => <>{props.children}</>}
          className="mb-6 outline-none"
        />
        <div className="flex flex-col items-center xs:flex-row xs:justify-between">
          <Toolbar />

          {/* Input post logic */}
          <button
            className="border-2 border-secondary px-4 pt-[2px] rounded-full text-secondary font-bold mt-3 transition-colors duration-300 hover:bg-secondary hover:text-white self-end xs:mt-0"
            type="submit"
            onClick={() => {
              postComment(value, postId);
            }}
          >
            Post
          </button>
        </div>
      </div>
    </EditorProvider>
  );
};
export default CommentInput;

function Toolbar() {
  const styleIcons = {
    normal: <ALargeSmall />,
    h1: <Heading1 />,
    h2: <Heading2 />,
    h3: <Heading3 />,
    blockquote: <Quote strokeWidth="2.2" className="size-[18px]" />,
  };
  const decoratorIcons = {
    strong: <Bold strokeWidth={2.6} className="size-[18px]" />,
    em: <Italic strokeWidth={2.6} className="size-[18px]" />,
    underline: <Underline strokeWidth={2.5} className="size-[21px]" />,
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
    <div className="flex justify-between w-full xs:w-auto xs:gap-3">
      {styleButtons}
      <div className="border-r-black/30 bg-black/30 border"></div>
      {decoratorButtons}
    </div>
  );
}
