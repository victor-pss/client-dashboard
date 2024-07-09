// import ClientArea from "./client/page";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <main>
      <Nav title="PSS Projects" clientId="" projectManager="" >
        <div className="h-screen overflow-auto -z-50">
          <video autoPlay muted loop className="">
            <source src="/videos/pss-hero-video.webm" type="video/webm" />
          </video>
        </div>
        <div className="absolute top-1/3 left-1/3 w-1/3 p-16 bg-gradient-to-b from-[rgba(0,36,192,.199)] to-[#0024c0]">
          <h1 className="text-5xl text-center font-bold font-serif">Plastic Surgery Studios Projects</h1>
          <p className="text-lg text-center mt-5 font-[oswald,sans-serif]">If you have stumbled upon this page, please contact your project manager to guide you to your project page.</p>
        </div>
      </Nav>
    </main>
  );
}
