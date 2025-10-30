import React from "react";
import { Editor } from "@tiptap/react";

import { Card, CardContent } from "../ui/card";
import { Tabs, TabsList } from "../ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";

import {
  AccordionContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import MarkUpOptions from "./components/markupOptions";
import StylingOptions from "./components/stylingOptions";
import TypoGraphyOptions from "./components/typographyOptions";

interface Props {
  editor: Editor | null;
  setCurrentText: React.Dispatch<React.SetStateAction<string>>;
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
  checkIfSelectedTextIsLink: () => void;
  currentText: string;
  currentColor: string;
  setFileSelectorState: React.Dispatch<React.SetStateAction<boolean>>;
  setYoutubeAdder: React.Dispatch<React.SetStateAction<boolean>>;
}

function FunctionBar({
  editor,
  setCurrentText,
  setCurrentColor,
  checkIfSelectedTextIsLink,
  setFileSelectorState,
  setYoutubeAdder,
  currentText,
  currentColor,
}: Props) {
  return (
    <Card id="Edit Pannel" className="w-full py-2 pb-0 lg:mb-7 mb-3">
      <CardContent className="flex  lg:gap-4 gap-2 flex-col flex-wrap py-0 w-full ">
        <Tabs defaultValue="Markup">
          <TabsList className="flex gap-4">
            <TabsTrigger
              className="aria-selected:border aria-selected:bg-zinc-900 p-1 rounded-lg text-sm"
              value="Markup"
            >
              Markup
            </TabsTrigger>
            <TabsTrigger
              className="aria-selected:border aria-selected:bg-zinc-900 p-1 rounded-lg text-sm"
              value="Styling"
            >
              Styling
            </TabsTrigger>
            <TabsTrigger
              className="aria-selected:border aria-selected:bg-zinc-900 p-1 rounded-lg text-sm"
              value="Typography"
            >
              Typography
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Markup" className="h-fit ">
            <Card className="mb-1 p-1 rounded-lg max-sm:hidden">
              <CardContent className="px-0">
                <MarkUpOptions
                  editor={editor}
                  setFileSelectorState={setFileSelectorState}
                  setYoutubeAdder={setYoutubeAdder}
                />
              </CardContent>
            </Card>
            <Accordion
              type="single"
              defaultValue="Markup"
              collapsible
              className="gap-0 lg:gap-2 sm:hidden mb-2"
            >
              <AccordionItem value="Markup">
                <AccordionTrigger>
                  <h1 className="max-md:text-sm">Markup</h1>{" "}
                </AccordionTrigger>
                <AccordionContent className="accordion-content pb-0 w-11/12 mx-auto">
                  <MarkUpOptions
                    editor={editor}
                    setFileSelectorState={setFileSelectorState}
                    setYoutubeAdder={setYoutubeAdder}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="Styling">
            <Card className="mb-1 p-1 rounded-lg max-sm:hidden">
              <CardContent className="px-0">
                <StylingOptions
                  editor={editor}
                  checkIfSelectedTextIsLink={checkIfSelectedTextIsLink}
                />
              </CardContent>
            </Card>
            <Accordion
              type="single"
              defaultValue="Styling"
              collapsible
              className="gap-0 lg:gap-2 sm:hidden mb-2"
            >
              <AccordionItem value="Styling">
                <AccordionTrigger>
                  <h1 className="max-md:text-sm">Styling</h1>{" "}
                </AccordionTrigger>
                <AccordionContent className="accordion-content pb-0 w-11/12 mx-auto">
                  <StylingOptions
                    editor={editor}
                    checkIfSelectedTextIsLink={checkIfSelectedTextIsLink}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="Typography">
            <Card className="mb-1 p-1 rounded-lg max-sm:hidden">
              <CardContent className="px-0">
                <TypoGraphyOptions
                  editor={editor}
                  currentColor={currentColor}
                  currentText={currentText}
                  setCurrentColor={setCurrentColor}
                  setCurrentText={setCurrentText}
                />
              </CardContent>
            </Card>
            <Accordion
              type="single"
              defaultValue="Typography"
              collapsible
              className="gap-0 lg:gap-2 sm:hidden mb-2"
            >
              <AccordionItem value="Typography">
                <AccordionTrigger>
                  <h1 className="max-md:text-sm">Typography</h1>{" "}
                </AccordionTrigger>
                <AccordionContent className="accordion-content pb-0 w-11/12 mx-auto">
                  <TypoGraphyOptions
                    editor={editor}
                    currentColor={currentColor}
                    currentText={currentText}
                    setCurrentColor={setCurrentColor}
                    setCurrentText={setCurrentText}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* <CardContent> */}
      {/* <Separator
            className="SeparatorRoot"
            decorative
            orientation="vertical"
            style={{ margin: "0 10px", height: "32px" }}
          /> */}
      {/* <Separator /> */}

      {/* <Separator /> */}
      {/* </CardContent> */}
    </Card>
  );
}

export default FunctionBar;
