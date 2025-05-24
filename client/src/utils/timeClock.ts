// render remaining seconds
export const timeClock = (val: number | string | undefined | null) => {
  if (!val) {
    return "00:00";
  }

  return `${Math.floor(Number(val) / 60)
    .toString()
    .padStart(2, "0")}:${(Number(val) % 60).toFixed(0).toString().padStart(2, "0")}`;
};
