const ContactUs = () => {
  return (
    <>
      <section className="bg-white font-heading">
        <div className="py-4 lg:py-8 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl  text-secondary tracking-tight font-extrabold text-center">
            Contact Us
          </h2>
          <p className="mb-4 font-light text-center text-gray-500sm:text-xl">
            We value your feedback and inquiries. Feel free to reach out to us
            using the information provided below:
          </p>
          <div className="mb-8 lg:mb-16 text-primary font-bold">
            <h3 className="text-center">
              1234 Blood Donation Avenue, City, State, ZIP
            </h3>
            <h3 className="text-center">+1-234-567-8901</h3>
          </div>
          <form action="#" className="space-y-8">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Your Email"
                required
              ></input>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Let us know how we can help you"
                required
              ></input>
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Leave your inquiry..."
              ></textarea>
            </div>
            <button className="btn w-full bg-secondary text-white hover:shadow-xl hover:bg-secondary">
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
