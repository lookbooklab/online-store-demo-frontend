import React from "react";
import LayoutMain from "@/components/layouts";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function Index() {
  return (
    <LayoutMain>
      <div
        className={
          "w-full px-3 lg:px-0 lg:w-3/4 min-h-screen pt-[200px] grid grid-cols-12 m-auto flex-col md:flex-row"
        }
      >
        <div className={"col-span-12 lg:col-span-6 p-3"}>
          <h2 className={"text-[25px] mb-3"}>Contact Us</h2>
          <p className={"mb-5"}>
            We&apos;re here to help with any questions. Reach out to us, and
            we&apos;ll get back to you as soon as possible!
          </p>
          <p className={"flex mb-3"}>
            <img
              className={"mr-2"}
              alt="Email"
              src={"/images/icons/email.svg"}
            />{" "}
            team@envvia.com
          </p>
          <p className={"flex"}>
            <img
              className={"mr-2"}
              alt="Whatsapp"
              src={"/images/icons/whatsapp.svg"}
            />{" "}
            Message (852) 8403 1329
          </p>
        </div>
        <div className={"col-span-12 lg:col-span-6 p-3"}>
          <div className={"bg-accent-foreground p-5"}>
            <div className={"mb-5"}>
              <Label className={"block mb-2"} htmlFor="name">
                Name
              </Label>
              <Input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className={"flex mb-5 gap-2"}>
              <div className={"w-1/2"}>
                <Label className={"block mb-2"} htmlFor="email">
                  Email
                </Label>
                <Input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className={"w-1/2"}>
                <Label className={"block mb-2"} htmlFor="phone">
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className={"mb-5"}>
              <Label className={"block mb-2"} htmlFor="phone">
                Message
              </Label>
              <TextArea className={"w-full"} rows={8} placeholder={"Message"} />
            </div>

            <Button className={"w-full"}>Send</Button>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}

export default Index;
