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
          <h2 className={"text-[25px]"}>Privacy Policy</h2>
          <h3>Effective Date: 29 May 2024</h3>
        </div>

        {/*  Section 1  */}
        <section>
          <h4>1. Introduction</h4>
          <p>
            Welcome to Envvia. We value your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website www.envvia.com, make a purchase, or otherwise
            interact with us.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h4>2. Information We Collect</h4>
          <p>
            Personal Information:
            <ul>
              <li>Name</li>
              <li>Email</li>
              <li>Phone Number</li>
            </ul>
          </p>
          <p>
            Non-Personal Information:
            <ul>
              <li>Broswer type</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visted on envvia.com</li>
              <li>Time and date of visit</li>
            </ul>
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h4>3. How We Use Your Information</h4>
          <p>
            We use the information we collect for various purposes, including:
            <ul>
              <li>Processing transactions and sending order confirmations</li>
              <li>Providing customer service and responding to inquiries</li>
              <li>Personalizing your shopping experience</li>
              <li>
                Sending promotional materials and updates (with your consent)
              </li>
              <li>Improving our website and services</li>
            </ul>
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h4>4. Sharing Your Information</h4>
          <p>
            We may share your information with:
            <ul>
              <li>
                Service providers who perform services on our behalf (e.g.,
                payment processors, shipping companies)
              </li>
              <li>
                Legal authorities if required by law or to protect our rights
              </li>
              <li>
                Third parties in connection with a merger, sale, or acquisition
                of our business
              </li>
            </ul>
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h4>5. Cookies and Tracking Technologies</h4>
          <p>
            We use cookies and similar tracking technologies to:
            <ul>
              <li>Enhance your browsing experience</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Remember your preferences and settings</li>
            </ul>
            You can control cookies through your browser settings. However,
            disabling cookies may affect your ability to use certain features of
            our website.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h4>6. Data Security</h4>
          <p>
            We implement appropriate security measures to protect your personal
            information from unauthorized access, disclosure, alteration, or
            destruction. However, no method of transmission over the internet or
            electronic storage is completely secure.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h4>7. Your Rights</h4>
          <p>
            You have the right to:
            <ul>
              <li>Access and review your personal information</li>
              <li>
                Request corrections to any inaccurate or incomplete information
              </li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of receiving marketing communications</li>
            </ul>
            To exercise these rights, please contact us at{" "}
            <a href={"www.envvia.com"}>www.envvia.com</a>.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h4>8. Third-Party Links</h4>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these external
            sites. We encourage you to read the privacy policies of any linked
            sites you visit.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h4>9. Third-Party Links</h4>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page, and the effective date will be updated
            accordingly. We encourage you to review this policy periodically.
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
