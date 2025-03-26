import { framer, CanvasNode, PublishInfo } from "framer-plugin";
import { useState, useEffect } from "react";
import "./App.css";

framer.showUI({
  position: "top right",
  width: 240,
  height: 695,
});

function useSelection() {
  const [selection, setSelection] = useState<CanvasNode[]>([]);

  useEffect(() => {
    return framer.subscribeToSelection(setSelection);
  }, []);

  return selection;
}

// Function to recursively find all text nodes from a starting node
// async function getAllTexts(nodes: CanvasNode[]): Promise<string[]> {
//   const texts: string[] = [];

//   for (const node of nodes) {
//     // console.log(node);

//     // If the current node is a text node with content, add its text
//     if (node.__class === "TextNode" && node.name) {
//       texts.push(node.name);
//     }

//     // Get children of the current node
//     const children = await node.getChildren();
//     // console.log(node?.name);
//     // // Recursively process all children
//     const childTexts = await getAllTexts(children);
//     if (childTexts.length) {
//       console.log(node.name);
//       console.log(childTexts);
//     }

//     // texts.push(...childTexts);
//   }

//   return texts;
// }

const findAllTexts = async () => {
  try {
    const letters = new Set();

    const textNodes = await framer.getNodesWithType("TextNode");
    textNodes.forEach((item) => {
      letters.add(item.name);
    });

    const collections = await framer.getCollections();

    for (const col of collections) {
      const items = await col.getItems(); // Wait for items to be retrieved

      for (const item of items) {
        for (const key of Object.keys(item.fieldData)) {
          const field = item.fieldData[key];
          if (field.type === "string") {
            letters.add(field.value);
            // console.log(field.value);
          }
        }
      }
    }

    return Array.from(letters) as string[];
  } catch (error) {
    console.log(111, error);
  }

  return [];
};

function usePublishInfo() {
  const [publishInfo, setPublishInfo] = useState<PublishInfo>();

  useEffect(() => {
    return framer.subscribeToPublishInfo(setPublishInfo);
  }, []);

  return publishInfo;
}
export function App() {
  const selection = useSelection();
  const layer = selection.length === 1 ? "layer" : "layers";
  const publishInfo = usePublishInfo();
  // State to store all texts
  const [allTexts, setAllTexts] = useState<string[]>([]);


  // framer
  //   .getNodesWithType("TextNode")
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  // Function to fetch and display all texts from selected nodes
  // const handleGetAllTexts = async () => {
  //   try {
  //     if (selection.length === 0) {
  //       console.log("No nodes selected. Please select some layers.");
  //       setAllTexts(["No nodes selected. Please select some layers."]);
  //       return;
  //     }

  //     const texts = await getAllTexts(selection);
  //     setAllTexts(texts);
  //     console.log("All texts in selected nodes:", texts);
  //   } catch (error) {
  //     console.error("Error fetching texts:", error);
  //     setAllTexts(["Error fetching texts. Check console for details."]);
  //   }
  // };
  // console.log(framer.getNode('qIsOzmKNV'));
  // framer.getNode(selection[0]?.id).then((res) => {
  //   console.log(res); res?.getChildren().then((res) => {
  //     console.log(res);
  //   }
  //   )
  // });

  const getAllTexts = async () => {
    const texts = await findAllTexts();
    setAllTexts(texts);
    console.log(texts);
  };

  // framer.getCanvasRoot().then((res) => {
  //   console.log(res);
  // });
  // framer.getRect(selection[0]?.id).then((res) => {
  //   console.log(res);
  // });

  // framer.getText().then((texts) => {
  //   console.log("Selected text elements:", texts);
  // });
  // console.log(selection);
  // framer.getChildren('qIsOzmKNV').then((res) => {
  //   console.log(res);
  // });
  // qIsOzmKNV
  return (
    <main>
      <p>
        Welcome! Check out the{" "}
        <a
          href="https://framer.com/developers/plugins/introduction"
          target="_blank"
        >
          Docs
        </a>{" "}
        to start. You have {selection.length} {layer} selected.
      </p>

      {/* Button to trigger text collection */}
      {/* <button className="framer-button-primary" onClick={handleGetAllTexts}>
        Get All Texts
      </button> */}
      {/* <button className="framer-button-primary" onClick={name}> */}
      <button className="framer-button-primary" onClick={getAllTexts}>
        Get All Texts
      </button>

      {/* Display collected texts */}
      {allTexts.length > 0 && (
        <div>
          <h3>All Texts ({allTexts.length}):</h3>
          <ul>
            {allTexts.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
