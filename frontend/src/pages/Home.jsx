import Sidebar from "../components/home/Sidebar";
import Navbar from "../components/home/Navbar";
import Content from "../components/home/Content";

function Home() {
  const token = localStorage.getItem("token");
  console.log(token)
  return (
    <div className="min-h-screen w-full flex">
      <div className=" w-[30%] bg-black">
        <Sidebar></Sidebar>
      </div>
      <div className="flex flex-col w-[88%]">
        <div className=" bg-black bg-opacity-95">
          <Navbar></Navbar>
        </div>
        <div className="flex min-h-screen flex-col lg:gap-9 gap-5 lg:p-5 p-4 bg-app-black bg-opacity-90">
          {token ? (
            <div>
              <Content text="Focus"></Content>
              <Content text="Spotify Playlist"></Content>
              <Content text="Sound of India"></Content>
            </div>
          ) : (
            <div className="lg:text-4xl text-sm text-gray-400 font-bold">
              Login To Dive Into The World Of Music
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
