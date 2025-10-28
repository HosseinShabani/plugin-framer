import { Counter } from "@/components/ui/counter";
import { useNanoBananaStore } from "@/context/nano-banana";
import { useShallow } from "zustand/react/shallow";

const CounterInput = () => {
  const { max_images, handleMaxImages } = useNanoBananaStore(useShallow((state) => state));

  return <Counter count={max_images} max={4} min={1} onChange={handleMaxImages} />;
};

export default CounterInput;
