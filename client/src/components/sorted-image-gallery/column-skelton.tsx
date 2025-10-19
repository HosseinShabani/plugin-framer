const ColumnSkelton: React.FC<{ array: any[] }> = ({ array }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        array.filter((_, i) => i % 3 === 0),
        array.filter((_, i) => i % 3 === 1),
        array.filter((_, i) => i % 3 === 2),
      ].map((arr, i) => (
        <div className="grid h-fit gap-2" key={i}>
          {arr.map((_, index) => {
            return (
              <div
                key={index}
                className="bg-framer-text h-32 w-full animate-pulse rounded-lg"
                style={{
                  animationDelay: `-${index * 1000}ms`,
                }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ColumnSkelton;
