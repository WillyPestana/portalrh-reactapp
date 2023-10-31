import { useState } from "react";
export const useFormDialog = () => {
  const [isOpenFormDialog, setIsOpenFormDialog] = useState(false);
  const [titleFormDialog, setTitleFormDialog] = useState("");

  return {
    isOpenFormDialog,
    openFormDialog: (title: string) => {
      setTitleFormDialog(title);
      setIsOpenFormDialog(true);
    },
    closeFormDialog: () => {
      setTitleFormDialog("");
      setIsOpenFormDialog(false);
    },
    titleFormDialog,
  };
};
