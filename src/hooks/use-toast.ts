"use client";
import { toast as baseToast } from "sonner";

type ToastOpts = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  return {
    toast: ({ title, description, variant }: ToastOpts) => {
      if (variant === "destructive") {
        baseToast.error(title ?? "Error", { description });
      } else {
        // par défaut on affiche en succès (adapte si tu veux un neutre)
        baseToast.success(title ?? "Success", { description });
      }
    },
  };
}
