import TAGS from "@/data/tags.js";
import { useStore } from "@nanostores/react";
import { Badge } from "@/components/ui/badge.tsx";
import { tagStore } from "../store.js";
import { X } from "lucide-react";

export function TagSelector() {
  const handleClick = (tag) => {
    if (tag.target.innerText == tagStore.get()) {
      tagStore.set("Todo");
    } else tagStore.set(tag.target.innerText);
  };

  const selectedTag = useStore(tagStore);

  return (
    <div className="flex flex-wrap gap-2 sm:place-content-end">
      {TAGS.map((tag) => (
        <Badge
          key={tag}
          onClick={handleClick}
          className={`group cursor-pointer select-none transition-all duration-300 h-fit gap-1 shadow ${
            selectedTag == tag && selectedTag != "Todo" ? "ps-1" : ""
          }`}
          variant={selectedTag == tag ? "default" : "secondary"}
        >
          {selectedTag == tag && selectedTag != "Todo" && (
            <X className="size-3 stroke-[2] rounded-full bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition pointer-events-none"></X>
          )}
          {tag}
        </Badge>
      ))}
    </div>
  );
}
