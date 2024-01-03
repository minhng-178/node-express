import { Link } from "react-router-dom";

import hero from "@/assets/hero.png";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";

function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1">
        <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
          <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
            <div className="flex flex-col justify-center gap-8">
              <h1 className="h1-bold">
                Train, Compete, Triumph: Your Goals, Our Guidance!
              </h1>
              <p className="p-regular-20 md:p-regular-24">
                Learn and improve your skills from 3,168+ professional football
                players and coaches in our global community.
              </p>
              <Button size="lg" asChild className="button w-full sm:w-fit">
                <Link to="#">Start Training</Link>
              </Button>
            </div>

            <img
              src={hero}
              alt="hero"
              width={1000}
              height={1000}
              className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
            />
          </div>
        </section>
        <section
          id="events"
          className="wrapper my-8 flex flex-col gap-8 md:gap-12"
        >
          <h2 className="h2-bold">
            Trusted by <br /> Thousands of Football Players
          </h2>

          <div className="flex w-full flex-col gap-5 md:flex-row">
            {/* <Search />
    <CategoryFilter /> */}
          </div>

          <Collection
            emptyTitle="No Players Found"
            emptyStateSubtext="Come back later"
          />
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
