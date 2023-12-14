"use client";


import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard from "./AnimeCard";

let page = 2;

export type AnimeCard = JSX.Element;

function LoadMore() {
  const [ref, inView] = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);

  // ************* Infinite scroll *************
  useEffect(() => {
    // alert("Load more...");
    if (inView) {
      fetchAnime(page)
      .then((res) => {
        // To keep track of all datas we had before
        setData([...data, ...res]);
        page++;
      })
    }
  }, [inView, data]);
  

  return (
    <>
      {/* To load all the subsequent pages from page 1 */}
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>

      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
