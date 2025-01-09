import React from "react";
import Overlays from "../overlay/Overlays";
import { useSetAtom } from "jotai";
import { uiAtom } from "@/atoms/state";

const Goodtoknow = () => {
  const setUi = useSetAtom(uiAtom);
  return (
    <div className="mt-12 h-12 rounded-lg border">
      <Overlays />
      <button
        type="button"
        onClick={() =>
          setUi((prev) => ({
            ...prev,
            modal: true,
          }))
        }
      >
        Open Modal
      </button>
    </div>
  );
};

export default Goodtoknow;
