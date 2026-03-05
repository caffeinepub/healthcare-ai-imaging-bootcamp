import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitLead() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      background,
    }: {
      name: string;
      email: string;
      phone: string;
      background: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitLead(name, email, phone, background);
    },
  });
}

export function useRequestBrochure() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.requestBrochure(email);
    },
  });
}
