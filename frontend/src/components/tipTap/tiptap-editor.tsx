import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
import { BubbleMenu } from "@tiptap/react/menus";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Text from "@tiptap/extension-text";
import OrderedList from "@tiptap/extension-ordered-list";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Youtube from "@tiptap/extension-youtube";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import Dropcursor from "@tiptap/extension-dropcursor";
import TextAlign from "@tiptap/extension-text-align";
import {
  BoldIcon,
  Check,
  Highlighter,
  ItalicIcon,
  UnderlineIcon,
} from "lucide-react";
// import { TabExtension } from "@/utils/editor-extensions/TapKeyExtension";
import ListKeymap from "@tiptap/extension-list-keymap";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import "./Modal.TipTap.css";
import { TextStyleKit } from "@tiptap/extension-text-style";
import FunctionBar from "./tiptap-function-bar";

interface Props {
  getEditorContent: React.Dispatch<SetStateAction<string>>;
}

const lowlight = createLowlight(all);

const TipTapTextEditor = ({ getEditorContent }: Props) => {
  const [content, setContent] = useState("<p>Hello !! </p>");
  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Paragraph,
      HorizontalRule,
      ListItem,
      BulletList,
      OrderedList,
      Image.configure({
        inline: true,
      }),
      Blockquote,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Youtube.configure({
        nocookie: true,
        allowFullscreen: false,
        controls: false,
      }),
      Bold,
      Italic,
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      Strike,
      Subscript,
      Superscript,
      Link.configure({
        protocols: ["http", "https", "ftp", "mailto"],
        autolink: true,
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
        },
      }),
      Dropcursor.configure({
        color: "#ff0000",
        width: 2,
        class: "border-dotted",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      ListKeymap,
      //   TabExtension,
      TextStyleKit,
    ],
    immediatelyRender: false,
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    // content: '<p className="bg-zinc-600">Start Creating from here</p>',
  });

  // if (!editor) return null;

  useEffect(() => {
    if (content) {
      getEditorContent(content);
    }
  }, [content, getEditorContent]);

  const editroRef = useRef<HTMLDivElement>(null);

  // const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.files && event.target.files[0]);

  //   if (event.target.files) {
  //     // const imageData = event.target.files[0];
  //     const imageURl = URL.createObjectURL(event.target.files[0]);
  //     editor?.chain().focus().setImage({ src: imageURl }).run();
  //   }
  // };

  const [fileSelectorState, setFileSelectorState] = useState(false);

  useEffect(() => {
    const editorElem = editroRef.current;
    if (editorElem) {
      const handleTabPress = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          e.preventDefault();
        }
      };
      editorElem.addEventListener("keydown", handleTabPress);
      // Cleanup function to remove the event listener
      return () => {
        editorElem.removeEventListener("keydown", handleTabPress);
      };
    }
  }, [editor]);

  const checkIfSelectedTextIsLink = () => {
    if (editor) {
      const { state } = editor;

      // Get the current selection
      const { from, to } = state.selection;

      if (from == to) {
        setIsSelected(false);
        setAddLink((prev) => !prev);
        return;
      }

      // Check if there's a link node in the selected range
      const isLink = state.doc.rangeHasMark(from, to, editor.schema.marks.link);

      if (isLink) {
        editor.chain().focus().unsetLink().run();
      } else {
        console.log("Add Link");
        const selectedText = editor.state.doc.textBetween(from, to, "\n");
        setPlaceHolderText(selectedText);
        setIsSelected(true);
        setAddLink((prev) => !prev);
      }
    }
  };

  const addLink = () => {
    if (linkURL == "") {
      setAddLink(false);
      return;
    }

    if (placeholderText == "") {
      editor?.commands.insertContent(
        `<a href="${linkURL}" target="_blank" rel="noopener nofollow noreferrer">${linkURL}</a>`
      );
      setAddLink(false);
      return;
    }

    editor?.commands.insertContent(
      `<a href="${linkURL}" target="_blank" rel="noopener nofollow noreferrer">${placeholderText}</a>`
    );
    setAddLink(false);
  };

  const [imageURL, setImageUrl] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [youtubeAdder, setYoutubeAdder] = useState(false);
  const [currentColor, setCurrentColor] = useState("black");
  const [currentText, setCurrentText] = useState("");
  const [isAddLink, setAddLink] = useState(false);
  const [placeholderText, setPlaceHolderText] = useState("");
  const [linkURL, setLinkURL] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`text-white h-full  flex flex-col lg:w-3/4 w-full items-center ${
        fileSelectorState || youtubeAdder || (isAddLink && "overflow-hidden")
      }`}
    >
      {(fileSelectorState || youtubeAdder || isAddLink) && (
        <div className="h-screen absolute flex justify-center items-center w-screen">
          <div
            className="w-full h-full opacity-20 bg-slate-500 absolute"
            onClick={() => {
              if (fileSelectorState) {
                setFileSelectorState(false);
              } else if (youtubeAdder) {
                setYoutubeAdder(false);
              } else {
                setAddLink(false);
              }
            }}
          ></div>
          {fileSelectorState && (
            <Card className="flex  flex-col absolute z-50 min-w-52 w-96 justify-center items-center h-72">
              <CardContent>
                <Tabs
                  className="min-w-48 w-80 flex flex-col gap-6"
                  defaultValue="Upload"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-zinc-800 py-2 rounded-lg gap-2 px-1">
                    <TabsTrigger
                      value="Upload"
                      className="tab-trigger rounded-md text-sm py-1 drop-shadow-md"
                    >
                      Upload
                    </TabsTrigger>
                    <TabsTrigger
                      value="URL"
                      className="tab-trigger rounded-md text-sm py-1 drop-shadow-md"
                    >
                      URL
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="Upload">
                    <Card>
                      <CardHeader></CardHeader>
                      <CardContent className="flex flex-col gap-5">
                        <Label
                          htmlFor="selection-btn"
                          className="text-sm font-semibold"
                        >
                          Upload the Files{" "}
                        </Label>
                        <Button variant="default" id="selection-btn">
                          Upload
                        </Button>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="URL">
                    <Card>
                      <CardHeader></CardHeader>
                      <CardContent className="flex flex-col gap-5">
                        <Label
                          htmlFor="image-url"
                          className="text-sm font-semibold"
                        >
                          Image URL
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="https://expample.com/image1.png"
                            id="image-url"
                            name="image-url"
                            onChange={(event) =>
                              setImageUrl(event.target.value)
                            }
                          />
                          <Button
                            variant="default"
                            onClick={() => {
                              editor
                                ?.chain()
                                .focus()
                                .setImage({ src: imageURL })
                                .run();
                              setFileSelectorState(false);
                            }}
                          >
                            <Check />
                          </Button>
                        </div>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
          {youtubeAdder && (
            <Card className="flex flex-col absolute z-50 min-w-52 w-96 justify-center items-center h-72">
              <CardContent>
                <Card>
                  <CardHeader></CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <Label
                      htmlFor="video-url"
                      className="text-sm font-semibold"
                    >
                      Youtube Video URL
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="https://Youtube.com/xahb1112"
                        id="video-url"
                        name="video-url"
                        onChange={(event) => setVideoURL(event.target.value)}
                      />
                      <Button
                        variant="default"
                        onClick={() => {
                          editor?.commands.setYoutubeVideo({
                            src: videoURL,
                            width: 640,
                            height: 480,
                          });
                          setYoutubeAdder(false);
                        }}
                      >
                        <Check />
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </CardContent>
            </Card>
          )}
          {isAddLink && (
            <Card className="flex flex-col z-50 min-w-52 w-96 justify-center items-center h-72">
              <CardContent className="flex flex-col gap-5">
                <div>
                  <Label
                    htmlFor="placeholder-text "
                    className="text-sm font-semibold"
                  >
                    Display Text
                  </Label>
                  <Input
                    id="placeholder-text"
                    name="placeholder"
                    placeholder="Google"
                    onChange={(event) => setPlaceHolderText(event.target.value)}
                    disabled={isSelected}
                    value={placeholderText}
                  />
                </div>
                <div>
                  <Label htmlFor="link-url" className="text-sm font-semibold">
                    URL
                  </Label>
                  <Input
                    id="link-url"
                    name="link-url"
                    placeholder="https://www.google.com"
                    onChange={(event) => setLinkURL(event.target.value)}
                  />
                </div>
                <Button onClick={addLink}>Place</Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
      <FunctionBar
        editor={editor}
        setCurrentColor={setCurrentColor}
        setCurrentText={setCurrentText}
        checkIfSelectedTextIsLink={checkIfSelectedTextIsLink}
        setFileSelectorState={setFileSelectorState}
        setYoutubeAdder={setYoutubeAdder}
        currentColor={currentColor}
        currentText={currentText}
      />
      {editor && (
        <BubbleMenu
          editor={editor}
          options={{ placement: "bottom", offset: 8, flip: true }}
          className="bg-zinc-900  rounded-lg dark:text-amber-100"
        >
          <Button
            variant="outline"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`${
              editor?.isActive("bold") ? "is-active" : ""
            } rounded-r-none`}
          >
            <BoldIcon />
          </Button>
          <Button
            variant="outline"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`${
              editor?.isActive("italic") ? "is-active" : ""
            } rounded-none`}
          >
            <ItalicIcon />
          </Button>
          <Button
            variant="outline"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`${
              editor?.isActive("underline") ? "is-active" : ""
            } rounded-none`}
          >
            <UnderlineIcon />
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              editor?.chain().focus().toggleHighlight({ color: "yellow" }).run()
            }
            className={`${
              editor?.isActive("highlight", { color: "yellow" })
                ? "is-active"
                : ""
            } rounded-l-none`}
          >
            <Highlighter />
          </Button>
        </BubbleMenu>
      )}
      <div className="scroll-container-vertical relative w-full md:h-[72vh] h-[69vh] overflow-y-auto  p-1 bg-neutral-700 rounded-xs">
        {/* <label
          htmlFor="editor"
          className=" absolute h-96 w-full -z-10 bg-white"
        ></label> */}
        <EditorContent
          id="editor"
          ref={editroRef}
          editor={editor}
          onClick={() => editor?.commands.focus()}
          className="bg-amber-100 w-full  text-black editor p-5 min-h-full outline-none focus:outline-none focus:ring-0 border-0 focus:border-transparent cursor-text rounded-xs"
        />
      </div>
    </div>
  );
};

export default TipTapTextEditor;
