import React from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  TextQuote,
  Code,
  ImageIcon,
  SquareMinus,
  YoutubeIcon,
  List,
  ListOrdered,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Props {
  editor: Editor | null;
  setFileSelectorState: React.Dispatch<React.SetStateAction<boolean>>;
  setYoutubeAdder: React.Dispatch<React.SetStateAction<boolean>>;
}

function MarkUpOptions({
  editor,
  setFileSelectorState,
  setYoutubeAdder,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={editor?.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <Heading1 />
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={editor?.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <Heading2 />
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={editor?.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <Heading3 />
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 4 }).run()
        }
        className={editor?.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        <Heading4 />
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 5 }).run()
        }
        className={editor?.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        <Heading5 />
      </Button>
      <div className="flex gap-1 items-center">
        <Button
          variant="outline"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor?.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          <Heading6 />
        </Button>
        <Separator
          className="SeparatorRoot"
          decorative
          orientation="vertical"
          style={{ margin: "0 10px", height: "32px" }}
        />
      </div>

      <Button
        variant="outline"
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        className={editor?.isActive("blockquote") ? "is-active" : ""}
      >
        <TextQuote />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        className={editor?.isActive("codeBlock") ? "is-active" : ""}
      >
        <Code />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        className={editor?.isActive("horizontalRule") ? "is-active" : ""}
      >
        <SquareMinus />
      </Button>
      <Button
        variant="outline"
        onClick={() => setFileSelectorState((prev) => !prev)}
      >
        <ImageIcon />
      </Button>
      <div className="flex gap-1 items-center">
        <Button
          variant="outline"
          onClick={() => setYoutubeAdder((prev) => !prev)}
        >
          <YoutubeIcon />
        </Button>
        <Separator
          className="SeparatorRoot"
          decorative
          orientation="vertical"
          style={{ margin: "0 10px", height: "32px" }}
        />
      </div>
      <Button
        variant="outline"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        className={editor?.isActive("bulletList") ? "is-active" : ""}
      >
        <List />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        className={editor?.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered />
      </Button>
    </div>
  );
}

export default MarkUpOptions;
