"use client";
import ExpandableContent from "@/common/utils/ExpandableContent";
import { Avatar } from "@mui/material";

type AuthorsBioProps = {
  data: Course;
};
const AuthorsBio: React.FC<AuthorsBioProps> = ({ data }) => {
  return (
    <section>
      <ExpandableContent maxLines={8}>
        <div className="flex mb-4 gap-2 items-center">
          <Avatar
            src={data.author.profile.avatar}
            sx={{
              height: 70,
              width: 70,
              backgroundColor: (theme) =>
                theme.vars?.palette.accentColor.main ?? "#1e90ff",
              fontWeight: 600,
            }}
          >
            {data.author.username.substring(0, 2).toUpperCase()}
          </Avatar>
          <div className="">
            <h3 className="font-bold">
              {" "}
              {data.author.profile?.display_name || data.author.username}
            </h3>
            <small>{data.author.username}</small>
          </div>
        </div>
        {data.author.profile.bio && (
          <div className="space-y-2 pl-2">
            <h3 className="font-bold mb-4">Bio</h3>
            <p>{data.author.profile.bio}</p>
          </div>
        )}
      </ExpandableContent>
    </section>
  );
};

export default AuthorsBio;
