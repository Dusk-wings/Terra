"use client";

import TipTapTextEditor from "@/components/tipTap/tiptap-editor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import DomPurify from "dompurify";
import "@/app/editor/Modal.Editor.css";
import ControlPannelOptions from "@/app/editor/components/ControlPannelOptions";

function Page() {
  const [pageTitle, setPageTitle] = useState("");
  const [pageContent, setPageContent] = useState("<p>No Content yet !!</p>");

  const handelClick = () => {
    localStorage.setItem("page-title", DomPurify.sanitize(pageTitle));
    localStorage.setItem("page-content", DomPurify.sanitize(pageContent));
  };

  return (
    <div className="lg:flex  gap-5  items-start justify-center relative  w-11/12 mx-auto  overlfow-hidden ">
      <Card className="lg:block fixed lg:sticky lg:top-4 sm:bottom-2 bottom-0 max-sm:left-0  max-sm:w-full sm:w-64 order-last z-50 max-lg:m-0 max-lg:p-0 max-lg:px-2 max-sm:rounded-b-none ">
        <CardHeader className="max-lg:hidden">
          <h3 className="font-semibold">Control Pannel</h3>
        </CardHeader>
        <Separator className="max-lg:hidden" />
        <ControlPannelOptions
          handelClick={handelClick}
          setPageTitle={setPageTitle}
          className="max-lg:hidden"
        />
        <Accordion type="multiple" className="lg:hidden ">
          <AccordionItem value="Control-Pannel" className="">
            <AccordionTrigger className="lg:hidden ">
              <Label htmlFor="web-tags" className="accordion-label">
                Control Pannel
              </Label>
            </AccordionTrigger>
            <AccordionContent>
              <ControlPannelOptions
                handelClick={handelClick}
                setPageTitle={setPageTitle}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      <TipTapTextEditor getEditorContent={setPageContent} />
    </div>
  );
}

export default Page;
