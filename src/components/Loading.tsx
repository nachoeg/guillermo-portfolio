import { Spinner } from "./ui/spinner";

function Loading() {
  return (
    <div className="flex absolute mx-auto h-full items-center  gap-2 text-neutral-400">
      <Spinner size={"small"} />
      <span>Cargando...</span>
    </div>
  );
}

export default Loading;
