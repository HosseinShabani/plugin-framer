import { Button } from "../ui/button";
import Modal from "../ui/modal";

type Props = {
  show: boolean;
  onClose: () => void;
};

const EditProfileModal: React.FC<Props> = ({ onClose, show }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-[317px] px-6 py-10">
        <div className="mx-auto flex w-[221px] flex-col items-center justify-center">
          <h3 className="mt-2 text-center text-xl font-semibold">Edit Profile</h3>
          <h5 className="text-framer-text-tertiary text-center text-xs font-medium">
            Enter your license key or email to login
          </h5>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-1.5">
          <div className="focus-within:border-framer-text bg-framer-bg flex h-9 w-full items-center rounded-lg border border-transparent px-2.75">
            <input
              type="text"
              placeholder="First Name"
              className="h-full w-full border-none bg-transparent px-2 outline-0"
            />
          </div>
          <div className="focus-within:border-framer-text bg-framer-bg flex h-9 w-full items-center rounded-lg border border-transparent px-2.75">
            <input
              type="text"
              placeholder="Last Name"
              className="h-full w-full border-none bg-transparent px-2 outline-0"
            />
          </div>

          <div className="focus-within:border-framer-text bg-framer-bg col-span-2 flex h-9 w-full items-center rounded-lg border border-transparent px-2.75">
            <input
              type="email"
              placeholder="Email"
              className="h-full w-full border-none bg-transparent px-2 outline-0"
            />
          </div>
        </div>
        <Button fullWidth className="mt-3" onClick={onClose}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
