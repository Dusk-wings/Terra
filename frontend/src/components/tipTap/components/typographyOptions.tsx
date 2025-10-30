import React from "react";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  CaseUpper,
  Type,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  editor: Editor | null;
  currentText: string;
  currentColor: string;
  setCurrentText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
}

function TypoGraphyOptions({
  editor,
  currentColor,
  currentText,
  setCurrentColor,
  setCurrentText,
}: Props) {
  return (
    <div id="functionality" className="flex flex-wrap gap-2">
      {/* <Separator
            className="SeparatorRoot"
            decorative
            orientation="vertical"
            style={{ margin: "0 10px", height: "32px" }}
          /> */}
      <div
        id="font-family"
        className="flex items-center gap-2 border bg-zinc-800/80 pl-1 rounded-lg "
      >
        <Label htmlFor="font-selection">
          <Type />
        </Label>
        <Select
          onValueChange={(event) => {
            editor?.chain().setFontFamily(event).run();
            setCurrentText(event);
          }}
          defaultValue={currentText}
        >
          <SelectTrigger className="rounded-l-none">
            <SelectValue placeholder="Font Family" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="flex items-center gap-2">
                <Type /> Font Family
              </SelectLabel>
              <SelectItem value={"calibrie"}>Calibrie</SelectItem>
              <SelectItem value="cursive">cursive</SelectItem>
              <SelectItem value="'Comic Sans MS' , 'Comic Sans'">
                Comic Sans
              </SelectItem>
              <SelectItem value="serif">serif</SelectItem>
              <SelectItem value="monospace">monospace</SelectItem>
              <SelectItem value="Inter">Inter</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* <Separator
              className="SeparatorRoot"
              decorative
              orientation="vertical"
              style={{ margin: "0 10px", height: "32px" }}
            /> */}
      </div>
      <div id="font-color" className="flex items-center gap-2">
        <Label
          htmlFor="font-color-selector"
          className="flex flex-col justify-center  p-1 px-2 rounded-lg border bg-zinc-800/80 hover:bg-zinc-800 cursor-pointer"
        >
          <CaseUpper size={14} />
          <span
            style={{
              backgroundColor: currentColor,
            }}
            className="h-1 w-7 border"
          ></span>
        </Label>
        <input
          id="font-color-selector"
          type="color"
          className="rounded-md p-1 hidden"
          onInput={(event) => {
            editor
              ?.chain()
              .focus()
              .setColor(String((event.target as HTMLInputElement).value))
              .run();
            setCurrentColor((event.target as HTMLInputElement).value);
          }}
          value={editor?.getAttributes("textStyle").color}
          data-testid="setColor"
        />
        {/* <Separator
              className="SeparatorRoot"
              decorative
              orientation="vertical"
              style={{ margin: "0 10px", height: "32px" }}
            /> */}
      </div>
      <div id="font-allignment" className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            className={
              editor?.isActive({ textAlign: "left" }) ? "is-active" : ""
            }
          >
            <AlignLeft />
          </Button>
          <Button
            variant="outline"
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            className={
              editor?.isActive({ textAlign: "center" }) ? "is-active" : ""
            }
          >
            <AlignCenter />
          </Button>
          <Button
            variant="outline"
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            className={
              editor?.isActive({ textAlign: "right" }) ? "is-active" : ""
            }
          >
            <AlignRight />
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              editor?.chain().focus().setTextAlign("justify").run()
            }
            className={
              editor?.isActive({ textAlign: "justify" }) ? "is-active" : ""
            }
          >
            <AlignJustify />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TypoGraphyOptions;
