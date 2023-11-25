import { BiDonateBlood } from "react-icons/bi";

const Footer = () => {
  return (
    <>
      <div className="bg-secondary font-heading">
        <div className="container mx-auto">
          <footer className="footer p-10 text-base-content">
            <aside>
              <div className="text-secondary flex items-center gap-1">
                <BiDonateBlood className="text-3xl text-primary"></BiDonateBlood>
                <h1 className="font-heading text-white text-xl md:text-2xl font-semibold">
                  BloodBridge
                </h1>
              </div>
              <p className="text-white max-w-sm">
                Connecting generous donors with individuals in urgent need of
                blood.
              </p>
            </aside>
            <nav className="text-white">
              <header className="footer-title">Services</header>
              <a className="link link-hover">Branding</a>
            </nav>
            <nav className="text-white">
              <header className="footer-title">Company</header>
              <a className="link link-hover">About us</a>
            </nav>
            <nav className="text-white">
              <header className="footer-title">Legal</header>
              <a className="link link-hover">Terms of use</a>
            </nav>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Footer;
