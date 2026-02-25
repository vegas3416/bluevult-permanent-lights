import logo from "@/assets/bluevult-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src={logo} alt="BlueVult Lighting" className="h-10 w-auto opacity-70" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BlueVult Lighting. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
