import CenterOnLgScreen from "@/common/utils/CenterOnLgScreen";
import SocialAuth from "@/components/auth/SocialAuth";

type params = {};

export default async function Page(_params: params) {
  return (
    <CenterOnLgScreen className="h-full grid place-items-center">
      <SocialAuth login />
    </CenterOnLgScreen>
  );
}
