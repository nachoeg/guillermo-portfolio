import TAGS from "@/data/tags.js";
import { useStore } from "@nanostores/react";
import { Badge } from "@/components/ui/badge.tsx";
import { tagStore } from "../store.js";

export function TagSelector() {
  const handleClick = (tag) => {
    tagStore.set(tag.target.innerText);
    console.log(tagStore.get());
  };

  const selectedTag = useStore(tagStore);

  return (
    <div className="flex flex-wrap gap-2 sm:place-content-end">
      {TAGS.map((tag) => (
        <Badge
          key={tag}
          onClick={handleClick}
          className="cursor-pointer select-none h-fit"
          variant={selectedTag == tag ? "default" : "secondary"}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
