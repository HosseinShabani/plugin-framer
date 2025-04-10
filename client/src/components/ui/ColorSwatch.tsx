type ColorSwatchProps = {
  color: string;
  label?: string;
};

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, label }) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className="border-framer-color-divider h-6 w-6 rounded border"
        style={{ backgroundColor: color }}
      />
      {label && <span className="text-xs">{label}</span>}
    </div>
  );
};
