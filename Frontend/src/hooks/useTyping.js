import { useState, useEffect, useRef } from "react";

export default function useTyping(strings) {
  const [text, setText] = useState("");
  const idx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timer;
    const tick = () => {
      const cur = strings[idx.current % strings.length];
      if (!deleting.current) {
        setText(cur.slice(0, ++charIdx.current));
        if (charIdx.current === cur.length) {
          deleting.current = true;
          timer = setTimeout(tick, 1600);
          return;
        }
      } else {
        setText(cur.slice(0, --charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          idx.current++;
        }
      }
      timer = setTimeout(tick, deleting.current ? 45 : 80);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  return text;
}
