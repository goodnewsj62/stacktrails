"use client";

import AppSelectField from "@/common/forms/AppSelectField";
import AppTextField from "@/common/forms/AppTextField";
import AppTitleInput from "@/common/forms/AppTitleInput";
import ErrorMessage from "@/common/forms/ErrorMessage";
import StringArrayInput from "@/common/forms/StringArrayInput";
// create new course

import AppMdEditor from "@/common/markdown/AppMdEditor";
import UploadFileModal from "@/common/media/UploadFileModal";
import { useRouter } from "@/hooks/useBlockNavigation";
import { useQueryParam } from "@/hooks/useQueryParams";
import { appToast } from "@/lib/appToast";
import { createCourseFunction } from "@/lib/http/coursesFetchFunc";
import { getImageProxyUrl } from "@/lib/utils";
import { AppRoutes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import { BsFillHandIndexFill } from "react-icons/bs";
import z from "zod";

// {
//     "title": "string",
//     "image": "string",
//     "description": "string",
//     "short_description": "string",
//     "learning_objectives": [
//       "string"
//     ],
//     "prerequisites": [
//       "string"
//     ],
//     "difficulty_level": "beginner",
//     "estimated_duration_hours": 0,
//     "language": "en",
//     "status": "draft",
//     "enrollment_type": "open",
//     "visibility": "public",
//     "certification_enabled": false,
//     "tags": []
//   }
const optionalString = z.string().optional().or(z.literal(""));
const difficulty_level = [
  "beginner",
  "intermediate",
  "advanced",
  "expert",
] as const;
const course_status = ["draft", "published", "archived"] as const;
const enrollment_type = ["open", "restricted", "invitation_only"] as const;
const visibility = ["public", "private"] as const;

const schema = z.object({
  title: z.string().max(200),
  short_description: z.string().max(224),
  description: z.string(),
  image: z.string(),
  learning_objectives: z.array(z.string()),
  prerequisites: z.array(z.string()).optional(),
  difficulty_level: z.enum(difficulty_level), // ["beginner","intermediate","advanced","expert"]
  estimated_duration_hours: z.number(),
  language: z.string(), // [en,de,fr,es]
  status: z.enum(course_status), // ["draft", "published", "archived"] ("draft")
  enrollment_type: z.enum(enrollment_type), //[ "open","restricted","invitation_only"] (grayed,  open )
  visibility: z.enum(visibility), // ["public", "private"]
  certification_enabled: z.boolean(), // false  (grayed)
  // tags: z.array(z.string()),
});

export default function Page() {
  const t = useTranslations();
  const [param, setParam] = useQueryParam("picker");
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      learning_objectives: [],
      prerequisites: [],
      status: "draft",
      enrollment_type: "open",
      certification_enabled: false,
      estimated_duration_hours: 0,
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutate } = useMutation({
    mutationFn: async (data: CourseCreate) => await createCourseFunction(data),
    onSuccess(data) {
      // TODO:  invalidate queries for created courses dashboard
      appToast.Success(t("CREATE_COURSE.CREATED"));
      router.push(AppRoutes.getCreatedCourseRoute(data.slug));
    },

    onError() {
      appToast.Error(t("EXCEPTIONS.ERROR_OCCURRED"));
    },
  });

  const handleFormSubmit = handleSubmit((values) => {
    mutate(values);
  });

  return (
    <FormProvider {...form}>
      {/* <StorageFileDisplay
        chosenFileHandler={() => {}}
        mimeType={MediaType.DOCUMENT}
        onClose={() => {}}
        provider={DocumentPlatform.GOOGLE_DRIVE}
      /> */}
      <form className="py-16 grid gap-y-8" onSubmit={handleFormSubmit}>
        {param && (
          <UploadFileModal
            accept={["drop_box", "google_drive"]}
            callback={(url) => setValue("image", url, { shouldValidate: true })}
            mimeType="image"
            onClose={() => setParam(null)}
          />
        )}
        <section className="flex gap-8 flex-col xl:flex-row">
          <div className="xl:grow">
            <AppTitleInput
              hookFormProps={form.register("title")}
              placeholder={t("CREATE_COURSE.TITLE")}
              errorMessage={errors?.title?.message ?? ""}
            />
            <AppTextField
              control={control}
              name="short_description"
              label={t("CREATE_COURSE.SHORT_DESCRIPTION")}
              fullWidth
              required
              message={errors.short_description?.message ?? ""}
            />
          </div>

          <div className="xl:basis-[30%]">
            {
              <button
                className="w-full  h-[210px] bg-gray-50 border-dashed  border-2 border-secondary"
                type="button"
                onClick={() => setParam()}
              >
                {watch("image") ? (
                  <img
                    src={getImageProxyUrl(watch("image"))}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <span>pick thumbnail from storage</span>
                    <div className="grid place-items-center py-1">
                      <BsFillHandIndexFill className="w-5 h-5" />
                    </div>
                  </>
                )}
              </button>
            }
          </div>
        </section>

        <section className="">
          <h2 className="text-xl font-bold pb-4">
            {t("CREATE_COURSE.DESCRIPTION")}
          </h2>
          <div className="h-96  px-3 border border-base  overflow-y-auto rounded-md">
            <AppMdEditor
              markdown={watch("description", "")}
              onChange={(e) =>
                setValue("description", e, { shouldValidate: true })
              }
            />
          </div>
        </section>

        <section>
          <h2 className="font-bold text-xl">{t("CREATE_COURSE.OBJECTIVES")}</h2>
          <StringArrayInput name="learning_objectives" />

          {(Array.isArray(errors?.learning_objectives)
            ? errors?.learning_objectives
            : [errors?.learning_objectives]
          ).map((e, idx) => (
            <ErrorMessage key={idx} message={e?.message ?? ""} />
          ))}
        </section>

        <section>
          <h2 className="font-bold text-xl">
            {t("CREATE_COURSE.PREREQUISITES")}
          </h2>
          <StringArrayInput name="prerequisites" />
          {(Array.isArray(errors?.prerequisites)
            ? errors?.prerequisites
            : [errors?.prerequisites]
          ).map((e, idx) => (
            <ErrorMessage key={idx} message={e?.message ?? ""} />
          ))}
        </section>
        <section className="grid gap-8  xl:grid-cols-2">
          <AppSelectField
            control={control}
            name="difficulty_level"
            id="difficulty_level"
            label={
              <div className="text-[#111213]">{t("CREATE_COURSE.LEVEL")}</div>
            }
            options={difficulty_level.map((value) => ({
              text: value,
              value: value,
            }))}
          />
          <AppSelectField
            control={control}
            name="status"
            id="status"
            label={
              <div className="text-[#111213]">{t("CREATE_COURSE.STATUS")}</div>
            }
            disabled
            options={course_status.map((value) => ({
              text: value,
              value: value,
            }))}
          />
          <AppSelectField
            control={control}
            name="enrollment_type"
            id="enrollment_type"
            label={
              <div className="text-[#111213]">
                {t("CREATE_COURSE.ENROLLMENT_TYPE")}
              </div>
            }
            disabled
            options={enrollment_type.map((value) => ({
              text: value,
              value: value,
            }))}
          />
          <AppSelectField
            control={control}
            name="visibility"
            id="visibility"
            label={
              <div className="text-[#111213]">
                {t("CREATE_COURSE.VISIBILITY")}
              </div>
            }
            options={visibility.map((value) => ({
              text: value,
              value: value,
            }))}
          />
          <AppTextField
            control={control}
            type="number"
            name="estimated_duration_hours"
            label={t("CREATE_COURSE.ESTIMATE_DURATION")}
            required
            onChange={(e) => {
              const value = e.target.value === "" ? 0 : Number(e.target.value);
              setValue("estimated_duration_hours", value, {
                shouldValidate: true,
              });
            }}
          />

          <AppSelectField
            control={control}
            name="language"
            id="language"
            label={
              <div className="text-[#111213]">
                {t("CREATE_COURSE.LANGUAGE")}
              </div>
            }
            options={[
              { value: "en", text: "English" },
              { value: "fr", text: "French" },
              { value: "de", text: "Deutsch" },
              { value: "es", text: "Espanol" },
            ]}
            required
          />
        </section>
        <div className="w-full  md:w-1/3">
          <Button
            disableElevation
            fullWidth
            type="submit"
            disabled={!!Object.keys(errors).length}
          >
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
