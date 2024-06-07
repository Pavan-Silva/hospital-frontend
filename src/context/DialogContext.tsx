import { createContext, useState } from "react";

type DialogContextType = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string | null;
  open: (message: string, handler: () => void) => void;
};

export const DialogContext = createContext({} as DialogContextType);

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [confrimHandler, setOnConfirmHandler] = useState<() => void>(
    () => () => {}
  );

  const open = (message: string, handler: () => void) => {
    setOnConfirmHandler(() => handler);
    setMessage(message);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onConfirm = () => {
    confrimHandler();
  };

  return (
    <DialogContext.Provider
      value={{ open, onClose, message, isOpen, onConfirm }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
