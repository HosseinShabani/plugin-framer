import { useState } from "react";
import { Button } from "./ui";

type TextListProps = {
  texts: string[];
};

const TextList: React.FC<TextListProps> = ({ texts }) => {
  const [showTexts, setShowTexts] = useState(false);

  return (
    texts.length > 0 && (
      <div className="my-4 w-full">
        <Button variant="secondary" fullWidth onClick={() => setShowTexts(!showTexts)}>
          {showTexts ? "Hide Detected Text" : "Show Detected Text"}
        </Button>

        {showTexts && (
          <div className="mt-2 max-h-64 overflow-y-auto rounded border p-2">
            <div className="mb-2 border-b text-xs font-bold">Detected Text ({texts.length})</div>
            <ul className="list-disc flex-wrap space-y-2 text-xs">
              {texts.map((text, i) => (
                <li key={i} className="text-wrap">
                  * {text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default TextList;
