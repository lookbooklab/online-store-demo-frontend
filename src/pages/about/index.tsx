import React from "react";
import LayoutMain from "@/components/layouts";

function Index() {
  return (
    <LayoutMain>
      <div
        className={
          "w-full max-w-[1200px] px-5 md:px-10 pt-[200px] m-auto terms mb-[400px]"
        }
      >
        <h2 className={"text-center text-2xl mb-10"}>The Envvia Difference</h2>
        <p className={"max-w-[600px] m-auto "}>
          Envvia - A New Personal Jewelry Shopping Destination. Our mission is
          to transform the world of fine and high jewelry shopping into a truly
          personalized and extraordinary experience. With our network of
          seasoned and knowledgeable Jewelry Consultants just a tap away,
          accessible through instant messaging and social media, we offer expert
          advice on jewelry collecting, styling ideas, product recommendations,
          and inspiring content showcasing top jewelers and designs. No request
          is too extravagant, no detail too minute, and we&apos;re here to make
          it happen.
        </p>
      </div>
    </LayoutMain>
  );
}

export default Index;
