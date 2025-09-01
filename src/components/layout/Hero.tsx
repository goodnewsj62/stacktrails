import { getTranslations } from "next-intl/server";
import { IoSearch } from "react-icons/io5";
import HeroImage from "./HeroImage";

const tags = [
  "Physics",
  "Electronics",
  "Maths",
  "Computer Science",
  "Aerospace",
];

export default async function Hero() {
  const t = await getTranslations("HERO");
  return (
    <section className="flex  justify-between gap-8 flex-col-reverse md:flex-row">
      <div className="max-w-[68ch] h-fit grid gap-4">
        <div>
          <h1 className="text-2xl  font-bold md:text-5xl">{t("MAIN")}</h1>
          <p className="py-4 font-light">{t("SUB")}</p>
        </div>
        <div className="relative">
          <input
            type="text"
            className="rounded-2xl p-4 h-full  w-full bg-gray-200 focus:outline-secondary"
            placeholder={t("SEARCH")}
          />
          <button
            type="button"
            className="absolute cursor-pointer bg-primary p-2 rounded-xl  top-1/2 -translate-y-1/2 right-2"
          >
            <IoSearch size={"20px"} color="white" />
          </button>
        </div>
        <div className="flex items-center">
          <span>{t("TAGS")}: </span>
          <span className="flex items-center gap-2 px-2">
            {tags.map((val, i) => (
              <Tag name={val} key={`tag-${i}`} />
            ))}
          </span>
        </div>
      </div>
      <HeroImage />
      {/* <div className="fixed top-0  right-0 -z-[1]">
        <Image
          src="/contor.svg"
          width={500}
          height={200}
          alt="Wave Haikei"
          className="w-full h-[700px]"
        />
      </div> */}
    </section>
  );
}

function Tag({ name }: { name: string }) {
  return (
    <div className="cursor-pointer rounded-2xl  p-2 text-xs shadow-border hover:text-white hover:bg-neutral-black hover:shadow-none">
      {name}
    </div>
  );
}
