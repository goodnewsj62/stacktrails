export class PublicRoutes {
  constructor(private readonly locale: string) {}

  static LOGIN = `/auth/login`;
  static REGISTER = `/auth/register`;
  static HOME = `/`;
  static POLICY = `/site/policy`;
  static TERMS = `/site/terms`;
  static COURSES = `/courses`;
  static ABOUT = "/about";

  static getCourseRoute(slug: string) {
    return `/course/${slug}`;
  }
  static getTopicRoute(slug: string) {
    return `/topic/${slug}`;
  }
  static getAuthor(u: string) {
    return `/author/${u}`;
  }
}
export class AppRoutes {
  static DASHBOARD = `/dashboard/`;
  static ACCOUNT = `/dashboard/account`;
  static ENROLLED = `/dashboard/enrolled`;
  static SAVED = `/dashboard/saved`;
  static CREATED = `/dashboard/created`;
  static CREATE_COURSE = `/create/course`;

  static getCreatedCourseRoute(slug: string) {
    return `/create/course/${slug}`;
  }

  static getPreviewCreatedCourseRoute(slug: string) {
    return `/create/course/${slug}/preview`;
  }
  static getEnrolledCourseRoute(slug: string) {
    return `/course/enrolled/${slug}`;
  }
  static getEnrolledCourseModuleRoute(slug: string, module_id: string) {
    return `/course/enrolled/${slug}/${module_id}`;
  }

  static getCreateModuleRoute(section_id: string) {
    return `/create/section/${section_id}/module`;
  }

  static getCreatedModuleRoute(section_id: string, module_id: string) {
    return `/create/section/${section_id}/module/${module_id}`;
  }
}

export class BackendRoutes {
  static MY_ACCOUNT = "/account";
  static GITHUB_LOGIN = "/auth/github/login";
  static GOOGLE_LOGIN = "/auth/google/login";
  static GOOGLE_ONE_TAP = "/auth/google-one-tap";
  static LOGOUT = "/auth/logout";
  static ALL_COURSES = "/courses";
  static COURSE_DETAIL = (slug: string) => `/courses/${slug}`;
  static COURSE_CONTENT_MINIMAL = (slug: string) =>
    `/courses/${slug}/content/minimal`;
  static COURSE_COMMENTS = (course_id: string) =>
    `/courses/${course_id}/comments`;
  static COMMENT_REPLIES = (comment_id: string) =>
    `/courses/${comment_id}/replies`;
  static LIKE_COMMENT = (comment_id: string) =>
    `/courses/${comment_id}/like-unlike`;
  static COURSE_REVIEW = (course_id: string) => `/courses/${course_id}/ratings`;

  static CREATE_RATING = "/courses/ratings";
  static ENROLL = "/courses/enroll";
  static CREATE_COMMENT = "/courses/comments";
  static GET_COURSE_ENROLLMENT = (course_id: string) =>
    `/courses/${course_id}/enroll`;
}
