import bg from "@/assets/img/bg.png";
import LoginModal from "@/components/modals/login-modal";

const LoginPage = () => {
  return (
    <div className="relative">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className=" bg-cover min-h-dvh  scale-95  "
      >
        <div className="bg-gradient-to-b from-framer-bg from-0% via-framer-bg/10 via-60% to-framer-bg to-100% min-h-dvh">
          <LoginModal onClose={() => {}} show />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
