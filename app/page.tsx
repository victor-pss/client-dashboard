// import ClientArea from "./client/page";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <main>
      <Nav title="PSS Projects" clientId="" projectManager="" >
        <div className="min-h-screen -z-50 relative">
          <video autoPlay muted loop className="min-h-screen w-auto object-cover">
            <source src="/videos/pss-hero-video.webm" type="video/webm" />
          </video>
        </div>
        <div className="absolute top-[15%] left-[10%] w-[80%] p-8 xl:top-1/3 xl:left-1/3 xl:w-1/3 lg:top-1/4 lg:left-1/4 lg:w-1/2 lg:p-16 bg-gradient-to-b from-[rgba(0,36,192,.199)] to-[#0024c0] md:top-1/4 md:left-1/4 md:w-2/4 ">
          <h1 className="text-5xl text-center font-bold font-serif">PSS Projects</h1>
          <p className="text-lg text-center mt-5 font-[oswald,sans-serif]">Whoops! If you've stumbled upon this page, please reach out to your Project Manager for help accessing your project page.</p>
        </div>
      </Nav>
    </main>
  );
}
