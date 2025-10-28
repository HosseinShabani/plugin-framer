import logo from "@/assets/img/icon.svg";

const LogoTitle = () => {
  return (
    <div className="mb-[18px]">
      <div className="flex items-center gap-2">
        <h3 className="relative z-10 text-2xl font-semibold">Imagine</h3>

        <img
          className="h-[46px] w-[46px] -rotate-12 rounded-lg shadow-[_-27.26px_5.93px_80.6px_11.85px_rgba(7,33,151,0.8)]"
          src={logo}
          alt="logo"
        />
        <h3 className="relative z-10 text-2xl font-semibold">something.</h3>
      </div>
      <h3 className="relative z-10 text-2xl font-semibold">Anything...</h3>
    </div>
  );
};

export default LogoTitle;
