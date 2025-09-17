import { Modal } from "@mui/material";

type UploadFileModalProps = {
  onClose: () => void;
};
const UploadFileModal: React.FC<UploadFileModalProps> = ({ onClose }) => {
  return (
    <Modal open onClose={onClose}>
      <section className=""></section>
    </Modal>
  );
};

export default UploadFileModal;
