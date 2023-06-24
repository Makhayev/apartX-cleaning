import type { NextPage } from "next";

const Home: NextPage = () => (
  <div>
    <main
      className="flex h-screen flex-col items-center justify-center"
      style={{
        backgroundImage: `url('/backgroundCurves.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex justify-center text-Bold32 text-dark">
        Apart-X cleaning app
      </div>
      <div className="mt-10 flex justify-center text-Bold20">
        Coming soon... salam aleikum
      </div>
    </main>
  </div>
);

export default Home;
