import CourseCard from "@/common/cards/CourseCard";
import Hero from "@/components/layout/Hero";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getTranslations } from "next-intl/server";
import { FaPlus } from "react-icons/fa";

export default async function Page() {
  const t = await getTranslations();

  const difficultyLevels = [
    { name: t("DIFFICULTY_LEVEL.BEGINNER"), value: "beginner" },
    { name: t("DIFFICULTY_LEVEL.INTERMEDIATE"), value: "intermediate" },
    { name: t("DIFFICULTY_LEVEL.ADVANCED"), value: "advanced" },
    { name: t("DIFFICULTY_LEVEL.EXPERT"), value: "expert" },
  ];

  // "HOME_SORT": {
  //       "MOST_VIEWED": "Most Viewed",
  //       "TOP_RATED": "Top Reated",
  //       "RECENTLY_ADDED": "Recently Added"
  //   },

  return (
    <>
      <Hero />
      <section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            {/* MUI Select for Popular */}
            <Select
              labelId="popular-select-label"
              id="popular-select"
              defaultValue="most-viewed"
              fullWidth
              size="small"
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="most-viewed">
                {t("HOME_SORT.MOST_VIEWED")}
              </MenuItem>
              <MenuItem value="top-rated">{t("HOME_SORT.TOP_RATED")}</MenuItem>
              <MenuItem value="recent">
                {t("HOME_SORT.RECENTLY_ADDED")}
              </MenuItem>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            {/* Desktop: show tags, Mobile: show select dropdown */}
            <div className="hidden md:flex gap-4">
              {difficultyLevels.map((level) => (
                <FilterPropertiesTag
                  key={level.value}
                  name={level.name}
                  selected={level.value === "beginner"}
                />
              ))}
            </div>
            <select
              className="md:hidden w-full p-2 rounded-md border"
              defaultValue=""
            >
              <option value="" disabled>
                {t("PUBLIC_MAIN.SELECT_DIFFICULTY")}
              </option>
              {difficultyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Button variant="contained" endIcon={<FaPlus size={"15px"} />}>
              {t("PUBLIC_MAIN.CREATE_COURSE")}
            </Button>
          </div>
        </div>
        <div className="w-full grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <CourseCard
            imageSrc="/1.png"
            title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente ut doloremque commodi et, vitae rerum. Magni, rerum cupiditate consequatur odit totam commodi ea nesciunt tempore doloribus iusto in fugiat labore?"
          />
          <CourseCard imageSrc="/2.png" />
          <CourseCard imageSrc="/3.png" />
          <CourseCard imageSrc="/1.png" />
        </div>
      </section>
    </>
  );
}

function FilterPropertiesTag({
  name,
  selected,
}: {
  name: string;
  selected?: boolean;
}) {
  return (
    <div
      className={`cursor-pointer p-2 px-4 rounded-xl font-semibold text-sm ${
        selected ? "bg-base" : "shadow-border"
      }`}
    >
      {name}
    </div>
  );
}
