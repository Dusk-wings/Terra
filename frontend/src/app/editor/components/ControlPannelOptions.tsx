"use client";
import React from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  AccordionContent,
  Accordion,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Props {
  handelClick: () => void;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}

function ControlPannelOptions({ handelClick, setPageTitle, className }: Props) {
  return (
    <div className={`${className}`}>
      <CardContent className="">
        <Accordion type="single" collapsible>
          <AccordionItem value="title">
            <AccordionTrigger>
              <Label htmlFor="web-tags" className="accordion-label">
                Title
              </Label>
            </AccordionTrigger>
            <AccordionContent className="accordion-content">
              <p className="accordion-text">
                Give the tile to this page, which will be displayed at the top
                of the page and will help to increase SEO
              </p>
              <Input
                id="page-title"
                placeholder="Page Title"
                onChange={(event) => setPageTitle(event.target.value)}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tabs">
            <AccordionTrigger>
              <Label htmlFor="web-tags" className="accordion-label">
                Tags
              </Label>
            </AccordionTrigger>
            <AccordionContent className="accordion-content">
              <p className="accordion-text">
                Tags are used to improve SEO of the page, So add the tags that
                are relevant to your content. Seprate each tag using comma
              </p>
              <Input
                id="web-tags"
                placeholder="Blog, Tour Blog, Familly, Lifestyle"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="comments">
            <AccordionTrigger>
              <Label htmlFor="comments-ref" className="accordion-label">
                Comments
              </Label>
            </AccordionTrigger>
            <AccordionContent className="accordion-content">
              <p className="accordion-text">
                Modify weather the comments should be allowed by the public or
                they should be disabled so that no one can talk about the
                content
              </p>
              <RadioGroup defaultValue="allowed">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="allowed" id="allowed" />
                  <Label htmlFor="allowed">Allowed</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="disabled" id="disabled" />
                  <Label htmlFor="disabled">Disabled</Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="p-3">
        <a href="/editor/preview" target="_blank">
          <Button variant="default" onClick={handelClick}>
            Preview <Eye />
          </Button>
        </a>
      </CardFooter>
    </div>
  );
}

export default ControlPannelOptions;
