import { Counter } from "@/components/ui/counter";
import { useSeeDream4Store } from "@/context/see-dream-4";
import { useShallow } from "zustand/react/shallow";

const CounterInput = () => {
  const { max_images, handleMaxImages } = useSeeDream4Store(useShallow((state) => state));

  return <Counter count={max_images} max={15} min={1} onChange={handleMaxImages} />;
};

export default CounterInput;
