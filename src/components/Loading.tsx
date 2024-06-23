function Loading() {
  return (
    <div className="flex absolute mx-auto h-full items-center  gap-2 text-neutral-400">
      <svg
        className="animate-spin h-5 w-5 "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          className=""
          fill="currentColor"
          d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
        ></path>
      </svg>
      <span>Cargando...</span>
    </div>
  );
}

export default Loading;
