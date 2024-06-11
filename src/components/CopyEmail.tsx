import { useState } from "react";
import { Button } from "./ui/button";

function CopiarEmail() {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText("guiescudero@hotmail.com");
    setCopySuccess(true);
  };
  return (
    <Button
      size={"default"}
      onClick={handleClick}
      variant={copySuccess ? "success" : "outline"}
    >
      {copySuccess ? "Email copiado!" : "Copiar Email"}
    </Button>
  );
}

export default CopiarEmail;
