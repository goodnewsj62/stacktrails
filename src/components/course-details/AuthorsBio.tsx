"use client";
import ExpandableContent from "@/common/utils/ExpandableContent";
import { Avatar } from "@mui/material";

type AuthorsBioProps = {};
const AuthorsBio: React.FC<AuthorsBioProps> = ({}) => {
  return (
    <section>
      <ExpandableContent maxLines={8}>
        <div className="flex mb-4 gap-2 items-center">
          <Avatar
            src=""
            sx={{
              height: 70,
              width: 70,
              backgroundColor: (theme) =>
                theme.vars?.palette.accentColor.main ?? "#1e90ff",
              fontWeight: 600,
            }}
          >
            EA
          </Avatar>
          <div className="">
            <h3 className="font-bold">Long head ball</h3>
            <small>mine username</small>
          </div>
        </div>
        <div className="space-y-2 pl-2">
          <h3 className="font-bold mb-4">Bio</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consectetur eveniet voluptatibus, repellendus consequuntur ipsum
            nihil praesentium fugit suscipit ducimus vero exercitationem beatae
            maiores maxime blanditiis assumenda. Incidunt magni quidem quae.
          </p>
        </div>
      </ExpandableContent>
    </section>
  );
};

export default AuthorsBio;
