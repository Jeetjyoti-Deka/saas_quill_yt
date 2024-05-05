"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { trpc } from "@/app/_trpc/client";

const UpgradeButton = () => {
  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? "/dashboard/billing";
    },
  });

  return (
    <Button className="w-full" onClick={() => createStripeSession()}>
      Upgrade Now <ArrowRight className="h-6 w-6 ml-1.5" />
    </Button>
  );
};
export default UpgradeButton;
