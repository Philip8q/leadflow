"use client";

import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

export interface TabItem {
  id: string;
  label: string;
  panel: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  label: string;
}

// APG Tabs Pattern (automatic activation): roving tabindex across
// role="tab" elements, arrow keys move focus AND select, Home/End jump to
// the ends, panel is reachable from the active tab with a single Tab press.
// https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
export default function Tabs({ items, label }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectIndex(index: number, focus = true) {
    const next = (index + items.length) % items.length;
    setActiveIndex(next);
    if (focus) tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        selectIndex(activeIndex + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        selectIndex(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        selectIndex(0);
        break;
      case "End":
        event.preventDefault();
        selectIndex(items.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className="flex gap-1 border-b border-black/10">
        {items.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectIndex(index)}
              onKeyDown={onKeyDown}
              className={`rounded-t-md px-4 py-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-main ${
                selected
                  ? "border-b-2 border-main text-main"
                  : "text-text/60 hover:text-text"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={index !== activeIndex}
          tabIndex={0}
          className="p-4 text-sm text-text/80 outline-none focus-visible:ring-2 focus-visible:ring-main"
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
