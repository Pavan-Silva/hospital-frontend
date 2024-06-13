import { toast } from "@/components/ui/use-toast";

export const useToast = () => {
  const success = (message?: string) => {
    toast({
      title: "Success",
      description: message || "This is a success toast.",
    });
  };

  const error = (message?: string) => {
    toast({
      title: "Error",
      description: message || "Something went wrong.",
    });
  };

  return { success, error };
};
