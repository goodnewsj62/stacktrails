import { Avatar, Button, TextField } from "@mui/material";
import { useState } from "react";

type CreateCommentProps = {
  avatarUrl?: string;
  username?: string;
  onSubmit?: (text: string) => void;
};

const CreateComment: React.FC<CreateCommentProps> = ({
  avatarUrl,
  username = "U",
  onSubmit,
}) => {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    if (onSubmit) await onSubmit(text.trim());
    setText("");
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 py-4 items-start">
      <Avatar src={avatarUrl} alt={username} sx={{ width: 40, height: 40 }}>
        {username.substring(0, 2).toUpperCase()}
      </Avatar>
      <div className="flex-1">
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          multiline
          minRows={2}
          maxRows={6}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={!text.trim() || submitting}
            sx={{ borderRadius: 8, textTransform: "none", fontWeight: 500 }}
          >
            Comment
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateComment;
