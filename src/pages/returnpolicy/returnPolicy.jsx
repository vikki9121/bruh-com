import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";

const ReturnPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
          Return Policy
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center mb-12">
          <div className="md:w-1/2 md:mr-8 mb-6 md:mb-0">
            <img
              src="https://www.cloudways.com/blog/wp-content/uploads/Ecommerce-Return-Policy.jpg"
              alt="Return Policy"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg mb-4">
              At <span className="text-pink-500 font-bold"> V Jyothi</span>, we
              want you to be completely satisfied with your purchase. If you are
              not satisfied with your purchase for any reason, you may return it
              to us for a full refund, store credit, or exchange. Please see our
              return policy below for more information.
            </p>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Return Eligibility
            </h2>
            <p className="text-lg mb-6">
              To be eligible for a return, your item must be unused and in the
              same condition that you received it. It must also be in the
              original packaging.
            </p>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Return Process
            </h2>
            <ol className="list-decimal list-inside mb-6">
              <li className="text-lg mb-2">
                Initiate your return by contacting our customer service team.
              </li>
              <li className="text-lg mb-2">
                Package your item securely for return.
              </li>
              <li className="text-lg mb-2">
                Ship your return package to the address provided by our customer
                service team.
              </li>
              <li className="text-lg mb-2">
                Once your return is received and inspected, we will send you an
                email to notify you that we have received your returned item.
              </li>
              <li className="text-lg mb-2">
                If your return is approved, your refund, store credit, or
                exchange will be processed.
              </li>
            </ol>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Contact Us
            </h2>
            <p className="text-lg">
              If you have any questions about our return policy, please contact
              us at{" "}
              <a
                href="mailto:info@ourstore.com"
                className="text-blue-600 hover:underline"
              >
                info@ourstore.com
              </a>{" "}
              or call us at{" "}
              <a
                href="tel:+919894520688"
                className="text-blue-600 hover:underline"
              >
                9894520688
              </a>
              <span> / </span>
              <a
                href="tel:+919176420688"
                className="text-blue-600 hover:underline"
              >
                9176420688
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnPolicyPage;
