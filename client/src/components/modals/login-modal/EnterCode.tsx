import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/context/auth";
import { useShallow } from "zustand/shallow";
import OtpInput from "react-otp-input";
import { useTimer } from "@/hooks/useTimer";
import { timeClock } from "@/utils/timeClock";
import Icon from "@/components/ui/Icon";

const EnterCode = () => {
  const { seconds, timerEnded, restart } = useTimer({ initialSeconds: 5 });

  const [otp, handleOtp, handleStep, handleIsLoggedIn] = useAuthStore(
    useShallow((state) => [state.otp, state.handleOtp, state.handleStep, state.handleIsLoggedIn])
  );

  return (
    <>
      <Button
        onClick={() => {
          handleOtp("");
          handleStep("method");
        }}
        color="gray"
        className="mt-2 ml-2"
        variant="ghost"
      >
        <Icon name="undo" className="stroke-framer-text size-3" />
      </Button>

      <div className="px-6 py-5">
        <div className="mx-auto flex flex-col items-center justify-center">
          <h3 className="text-center text-xl font-semibold">Enter the code</h3>
          <h5 className="text-framer-text-tertiary text-center text-[10px] font-medium">
            A code was sent to aminmasihzade@gamil.com
          </h5>
        </div>

        <div className="mt-5 mb-3">
          <OtpInput
            value={otp}
            onChange={(e) => handleOtp(e)}
            numInputs={4}
            renderSeparator={<span className="w-1.5"> </span>}
            renderInput={(props) => (
              <input {...props} className="bg-framer-bg h-9 !w-[63px] rounded-lg" />
            )}
          />
        </div>

        <Button fullWidth className="text-xs" onClick={() => handleIsLoggedIn(true)}>
          Continue
        </Button>

        <div className="mt-6">
          {timerEnded ? (
            <Button
              fullWidth
              color="gray"
              variant="ghost"
              className="text-xs"
              onClick={() => restart()}
            >
              Resend
            </Button>
          ) : (
            <div className="text-framer-text-tertiary text-center text-xs font-medium">
              Resend code in {timeClock(seconds)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EnterCode;
