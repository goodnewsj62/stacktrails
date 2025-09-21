"use client";

import AppSelectField from "@/common/forms/AppSelectField";
import AppTextField from "@/common/forms/AppTextField";
import StringArrayInput from "@/common/forms/StringArrayInput";
import AppMdEditor from "@/common/markdown/AppMdEditor";
import UploadFile from "@/common/media/UploadFile";
import AppLinkBreadCrumbs from "@/common/utils/AppBreadCrumbs";
import LoadingComponent from "@/common/utils/LoadingComponent";
import { AppRoutes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { use, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import useCourseSectionQuery from "../useFetchSection";

const moduleType = [
  "video",
  "document",
  "quiz",
  "discussion",
  "external_link",
] as const;

const optionalString = z.string().optional().or(z.literal(""));
const schema = z.object({
  title: z.string().min(3),
  description: optionalString,
  content_data: z.object({ additionalProp1: z.object({}) }).optional(),
  order_index: z.number(),
  estimated_duration_minutes: z.number(),
  is_required: z.boolean().optional(),
  prerequisites: z.array(z.string()).optional(),
  settings: z.object({ additionalProp1: z.object({}) }).optional(),
  module_type: z.enum(moduleType),
});

export default function Page({
  params,
}: {
  params: Promise<{ section_id: string }>;
}) {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      module_type: "video",
    },
    resolver: zodResolver(schema),
  });

  const t = useTranslations();
  const { section_id } = use(params);

  const {
    control,
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const getAvailableIndex = useCallback((sections: FullModule[]) => {
    if (sections.length < 1) return [[1, true]];

    const available = new Map(
      Array.from({ length: sections.length + 1 }, (_, i) => [i + 1, true])
    );

    sections.forEach((section) => available.delete(section.order_index));

    return available.entries();
  }, []);

  const { status, data, isLoading } = useCourseSectionQuery(section_id);
  return (
    <LoadingComponent
      loading={isLoading}
      error={status === "error"}
      data={data as FullSection}
    >
      {(cleanedData) => (
        <div className="py-5 px-4">
          <AppLinkBreadCrumbs
            links={[
              {
                name: t("SECTIONS.COURSE_DETAILS"),
                to: AppRoutes.getCreatedCourseRoute(cleanedData.course.slug),
              },
              {
                name: `${cleanedData.title}`,
                to: AppRoutes.CREATED_COURSE_SECTION(cleanedData.course.slug),
              },
              {
                name: t("MODULE.MODULES"),
                to: AppRoutes.SECTION_MODULES(cleanedData.id),
              },
              {
                name: t("MODULE.CREATE"),
                to: AppRoutes.getCreateModuleRoute(cleanedData.id),
              },
            ]}
          />

          <div></div>
          <FormProvider {...form}>
            <form className="space-y-8">
              <div className="w-full flex flex-col gap-4 lg:flex-row">
                <AppTextField
                  control={control}
                  name="title"
                  fullWidth
                  placeholder={t("MODULE.TITLE")}
                />
                <AppTextField
                  control={control}
                  name="description"
                  fullWidth
                  placeholder={t("MODULE.DESCRIPTION")}
                />
              </div>

              <AppSelectField
                control={control}
                name="order_index"
                id="order_index"
                label={
                  <div className="text-[#111213]">{t("SECTIONS.ORDER")}</div>
                }
                options={Array.from(getAvailableIndex(cleanedData.modules)).map(
                  ([value, _]) => ({
                    text: value.toString(),
                    value: value,
                  })
                )}
                message={errors.order_index?.message}
              />

              <div>
                <h2 className="text-xl font-bold py-3">
                  {t("MODULE.PREREQUISITES")}
                </h2>
                <StringArrayInput name="prerequisites" />
              </div>

              <AppTextField
                fullWidth
                control={control}
                name="estimated_duration_minutes"
                placeholder={t("SECTIONS.ESTIMATE_DURATION")}
                message={errors.estimated_duration_minutes?.message}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : Number(e.target.value);

                  if (!Number.isNaN(value))
                    setValue("estimated_duration_minutes", value, {
                      shouldValidate: true,
                    });
                }}
              />

              <div className="flex items-center gap-4">
                <h5>{t("MODULE.REQUIRED")}</h5>
                <div>
                  <Checkbox {...register("is_required")} />
                </div>
              </div>

              <div>
                <AppSelectField
                  control={control}
                  name="module_type"
                  id="module_type"
                  label={
                    <div className="text-[#111213]">
                      {t("MODULE.MODULE_TYPE")}
                    </div>
                  }
                  options={[
                    t("MODULE.MODULE_TYPES.VIDEO"),
                    t("MODULE.MODULE_TYPES.DOCUMENT"),
                    t("MODULE.MODULE_TYPES.DISCUSSION"),
                    t("MODULE.MODULE_TYPES.EXTERNAL_LINK"),
                  ].map((value) => ({
                    text: value.toString(),
                    value: value,
                  }))}
                  message={errors.prerequisites?.message}
                />
              </div>

              <div>
                <div
                  className={`hidden ${
                    watch("module_type") === "video" && "!block"
                  }`}
                >
                  <VideoUpload />
                </div>
                <div
                  className={`hidden ${
                    watch("module_type") === "document" && "!block"
                  }`}
                >
                  <DocumentUpload />
                </div>
                <div
                  className={`hidden ${
                    watch("module_type") === "discussion" && "!block"
                  }`}
                >
                  <DiscussSection />
                </div>
                <div
                  className={`hidden ${
                    watch("module_type") === "external_link" && "!block"
                  }`}
                >
                  <ExternalLink />
                </div>
              </div>

              <div>
                <Button className="w-full lg:!w-auto">Submit</Button>
              </div>
            </form>
          </FormProvider>
        </div>
      )}
    </LoadingComponent>
  );
}

type pageProps = {};
const VideoUpload: React.FC<pageProps> = ({}) => {
  return (
    <div className="">
      <UploadFile
        accept={["youtube", "daily_motion", "google_drive", "drop_box", "link"]}
        callback={() => {}}
        mimeType="video"
      />
    </div>
  );
};

type docProps = {};
const DocumentUpload: React.FC<docProps> = ({}) => {
  return (
    <div className="">
      <UploadFile
        accept={["google_drive", "drop_box", "link"]}
        callback={() => {}}
        mimeType="document"
      />
    </div>
  );
};

type discussProps = {};
const DiscussSection: React.FC<discussProps> = ({}) => {
  return (
    <div className="">
      <AppMdEditor markdown="" />
    </div>
  );
};

type externalLinkProps = {};
const ExternalLink: React.FC<externalLinkProps> = ({}) => {
  const t = useTranslations();
  const changeHandler = (e: React.ChangeEvent<any>) => {};
  return (
    <div className="">
      <TextField
        fullWidth
        onChange={changeHandler}
        className=""
        placeholder={t("MODULE.GOOGLE_WEBSITE")}
      />
    </div>
  );
};

// {
//     "platform": "youtube",
//     "external_video_id": "string",
//     "video_url": "string",
//     "embed_url": "string",
//     "thumbnail_url": "string",
//     "duration_seconds": 0,
//     "title": "string",
//     "description": "string",
//     "embed_settings": {
//       "additionalProp1": {}
//     },
//     "module_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//   }

// {
//     "platform": "google_drive",
//     "external_file_id": "string",
//     "file_url": "string",
//     "embed_url": "string",
//     "file_name": "string",
//     "file_type": "string",
//     "file_size_bytes": 0,
//     "viewer_settings": {
//       "additionalProp1": {}
//     },
//     "module_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//   }

// {
//     "data": [
//       {
//         "attachment_type": "document",
//         "file_url": "string",
//         "external_file_id": "string",
//         "embed_url": "string",
//         "title": "string",
//         "description": "string",
//         "document_type": "google_drive",
//         "file_type": "string",
//         "module_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//       }
//     ]
//   }
