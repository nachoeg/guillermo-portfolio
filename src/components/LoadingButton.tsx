import { Spinner } from "./ui/spinner";

function LoadingButton({ textColor }: { textColor?: string }) {
  return (
    <div className="flex gap-1 items-center">
      <Spinner
        size={"small"}
        className={` ${
          textColor ? textColor : "text-neutral-50 dark:text-neutral-950"
        }`}
      />
      Cargando...
    </div>
  );
}

export default LoadingButton;
