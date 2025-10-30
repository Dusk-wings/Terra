import React from "react";
import {
  Highlighter,
  ItalicIcon,
  Link2Icon,
  Strikethrough,
  SubscriptIcon,
  BoldIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor | null;
  checkIfSelectedTextIsLink: () => void;
}

function StylingOptions({ editor, checkIfSelectedTextIsLink }: Props) {
  return (
    <div id="marks" className="flex flex-wrap gap-2">
      {/* <Separator
            className="SeparatorRoot"
            decorative
            orientation="vertical"
            style={{ margin: "0 10px", height: "32px" }}
          /> */}
      <Button
        variant="outline"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        className={editor?.isActive("bold") ? "is-active" : ""}
      >
        <BoldIcon />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        className={editor?.isActive("italic") ? "is-active" : ""}
      >
        <ItalicIcon />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        className={editor?.isActive("underline") ? "is-active" : ""}
      >
        <UnderlineIcon />
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          editor?.chain().focus().toggleHighlight({ color: "yellow" }).run()
        }
        className={
          editor?.isActive("highlight", { color: "yellow" }) ? "is-active" : ""
        }
      >
        <Highlighter />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        className={editor?.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough />
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          if (editor?.isActive("superscript")) {
            editor.chain().focus().unsetSuperscript().run();
          }
          editor?.chain().focus().toggleSubscript().run();
        }}
        className={editor?.isActive("subscript") ? "is-active" : ""}
      >
        <SubscriptIcon />
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          if (editor?.isActive("subscript")) {
            editor.chain().focus().unsetSubscript().run();
          }
          editor?.chain().focus().toggleSuperscript().run();
        }}
        className={editor?.isActive("superscript") ? "is-active" : ""}
      >
        <SuperscriptIcon />
      </Button>
      <Button variant="outline" onClick={checkIfSelectedTextIsLink}>
        <Link2Icon />
      </Button>
    </div>
  );
}

export default StylingOptions;
