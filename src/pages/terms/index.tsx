import React from "react";
import LayoutMain from "@/components/layouts";
import Link from "next/link";

function Index() {
  return (
    <LayoutMain>
      <div
        className={
          "w-full max-w-[1200px] px-5 md:px-10 pt-[200px] m-auto terms"
        }
      >
        <div
          className={
            "flex flex-col md:flex-row justify-between w-full pb-10 items-center"
          }
        >
          <h2 className={"text-[25px]"}>Terms and Conditions</h2>
          <h3>Effective Date: 29 May 2024</h3>
        </div>
        <p>
          Welcome to <a href={"www.envvia.com"}>www.envvia.com</a>. These Terms
          and Conditions (&ldquo;Terms&ldquo;) govern your use of our website{" "}
          <a href={"www.envvia.com"}>www.envvia.com</a> and the purchase of our
          products. By accessing or using our website, you agree to be bound by
          these Terms.
        </p>
        <br />

        {/*  Section 1  */}
        <section>
          <h4>1. Use of the Website</h4>
          <p>
            <span>1.1 Eligibility</span>: You must be at least 18 years old to
            use our website and purchase our products.{" "}
          </p>
          <p>
            <span>1.2 Account:</span> You may need to create an account to
            access certain features. You are responsible for maintaining the
            confidentiality of your account information and for all activities
            that occur under your account.
          </p>

          <p>
            <span>1.3 Prohibited Activities:</span> You agree not to use our
            website for any unlawful purpose or in any way that could harm us or
            others. This includes, but is not limited to, engaging in fraudulent
            activities, distributing harmful software, or violating intellectual
            property rights.
          </p>
        </section>

        {/*  Section 2  */}
        <section>
          <h4>2. Product Information and Orders</h4>
          <p>
            <span>1.1 Eligibility</span>: You must be at least 18 years old to
            use our website and purchase our products.{" "}
          </p>
          <p>
            <span>1.2 Account:</span> You may need to create an account to
            access certain features. You are responsible for maintaining the
            confidentiality of your account information and for all activities
            that occur under your account.
          </p>

          <p>
            <span>1.3 Prohibited Activities:</span> You agree not to use our
            website for any unlawful purpose or in any way that could harm us or
            others. This includes, but is not limited to, engaging in fraudulent
            activities, distributing harmful software, or violating intellectual
            property rights.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h4>3. Returns and Exchanges</h4>
          <p>
            <span>3.1 Return Policy:</span> We accept returns and exchanges
            within [number] days of delivery. Items must be in their original
            condition and packaging. Custom and engraved items may not be
            eligible for return.
          </p>

          <p>
            <span>3.2 Process:</span> To initiate a return or exchange, please
            contact our customer service team at [contact email]. You are
            responsible for return shipping costs unless the item is defective
            or incorrect.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h4>4. Intellectual Property</h4>
          <p>
            <span>4.1 Ownership:</span> All content on our website, including
            text, images, graphics, and logos, is our property or the property
            of our licensors and is protected by intellectual property laws.
          </p>
          <p>
            <span>4.2 Use:</span> You may not use, reproduce, distribute, or
            display any content from our website without our prior written
            permission.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h4>5. Limitation of Liability</h4>
          <p>
            <span>5.1 Disclaimer:</span> Our website and products are provided
            &ldquo;as is&ldquo; without warranties of any kind, either express
            or implied. We do not warrant that our website will be uninterrupted
            or error-free.
          </p>

          <p>
            <span>5.2 Limitation:</span> To the fullest extent permitted by law,
            we are not liable for any indirect, incidental, or consequential
            damages arising from your use of our website or products.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h4>6. Indemnification</h4>
          <p>
            You agree to indemnify and hold us harmless from any claims,
            damages, losses, or expenses arising from your use of our website or
            violation of these Terms.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h4>7. Governing Law</h4>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of [Your Country/State], without regard to its conflict of law
            principles.
          </p>
        </section>

        {/* Seciton 8 */}
        <section>
          <h4>8. Changes to These Terms</h4>
          <p>
            We may update these Terms from time to time. Any changes will be
            posted on this page with the effective date. Your continued use of
            our website after any changes constitutes your acceptance of the new
            Terms.
          </p>
        </section>

        {/* Section Contact */}
        <section>
          <h4>9. Contact Us</h4>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className={"flex mb-3"}>
            <img
              className={"mr-2"}
              alt="Email"
              src={"/images/icons/email.svg"}
            />{" "}
            <a
              className={"hover:underline"}
              href={"mailto:team@envvia.com?subject=Envvia Inquiry"}
            >
              team@envvia.com
            </a>
          </p>
          <p className={"flex"}>
            <img
              className={"mr-2"}
              alt="Whatsapp"
              src={"/images/icons/whatsapp.svg"}
            />{" "}
            <Link
              href={
                "https://api.whatsapp.com/send/?phone=85284031329&text&type=phone_number&app_absent=0"
              }
              className={
                "bg-transparent text-primary hover:underline transition"
              }
            >
              {" "}
              Message (852) 8403 1329
            </Link>
          </p>
        </section>
      </div>
    </LayoutMain>
  );
}

export default Index;
