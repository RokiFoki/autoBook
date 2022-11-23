import { useEffect } from "react";

type CursorEditorMovmentProps = {
  editorRef: React.RefObject<HTMLElement>;
};

const CursorEditorMovment = ({ editorRef }: CursorEditorMovmentProps) => {
  useEffect(() => {
    const target = editorRef.current;

    if (target) {
      const onMouseDown = (ev: MouseEvent) => {};

      const onMouseUp = (ev: MouseEvent) => {};

      const onMouseMove = (ev: MouseEvent) => {};

      target.addEventListener("mousedown", onMouseDown);
      target.addEventListener("mouseup", onMouseUp);
      target.addEventListener("mousemove", onMouseMove);

      return () => {
        target.removeEventListener("mousedown", onMouseDown);
        target.removeEventListener("mouseup", onMouseUp);
        target.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, [editorRef]);

  return null;
};

export default CursorEditorMovment;
