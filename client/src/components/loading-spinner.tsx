type LoadingSpinnerProps = {
  title?: string;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ title = "Loading Data..." }) => {
  return (
    <div className="mb-4 w-full rounded border border-blue-100 bg-blue-50 p-3 text-center text-sm text-blue-700">
      <div className="mx-auto mb-2 size-5 animate-spin bg-blue-400 ..." />
      {title}
    </div>
  );
};
