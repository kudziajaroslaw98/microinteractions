"use client";

import { useState } from "react";
import { Check, Loader, X, CreditCard, AlertCircle } from "lucide-react";
import { StatefulButton } from "./stateful-button";

export function StatefulButtonExample() {
  const [paymentState, setPaymentState] = useState("idle");
  const [deleteState, setDeleteState] = useState<"idle" | "confirming" | "deleting" | "deleted">(
    "idle",
  );
  const [saveState, setSaveState] = useState("idle");

  // Payment button handler
  const handlePayment = async () => {
    setPaymentState("processing");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success (you could also handle errors)
    setPaymentState("success");

    // Reset after 2 seconds
    setTimeout(() => setPaymentState("idle"), 2000);
  };

  // Delete button handler with confirmation
  const handleDelete = async () => {
    if (deleteState === "idle") {
      setDeleteState("confirming");
      setTimeout(() => {
        setDeleteState("idle");
      }, 3000);
      return;
    }

    if (deleteState === "confirming") {
      setDeleteState("deleting");

      // Simulate deletion
      await new Promise(resolve => setTimeout(resolve, 1500));

      setDeleteState("deleted");
      setTimeout(() => setDeleteState("idle"), 1500);
    }
  };

  // Save button handler
  const handleSave = async () => {
    setSaveState("saving");

    try {
      // Simulate save operation
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Randomly succeed or fail for demo
          if (Math.random() > 0.3) {
            resolve(true);
          } else {
            reject(new Error("Save failed"));
          }
        }, 1000);
      });

      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 1500);
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 2000);
    }
  };

  // Payment button content based on state
  const paymentContent = {
    idle: (
      <>
        <CreditCard className="size-4" />
        <span>Pay $99</span>
      </>
    ),
    processing: (
      <>
        <Loader className="size-4 animate-spin" />
        <span>Processing...</span>
      </>
    ),
    success: (
      <>
        <Check className="size-4 text-green-400" />
        <span className="text-green-400">Payment complete!</span>
      </>
    ),
  };

  // Delete button content
  const deleteContent = {
    idle: "Delete Item",
    confirming: (
      <>
        <AlertCircle className="size-4 text-yellow-400" />
        <span className="text-yellow-400">Click again to confirm</span>
      </>
    ),
    deleting: (
      <>
        <Loader className="size-4 animate-spin text-red-400" />
        <span className="text-red-400">Deleting...</span>
      </>
    ),
    deleted: (
      <>
        <Check className="size-4 text-green-400" />
        <span>Deleted</span>
      </>
    ),
  };

  // Save button content
  const saveContent = {
    idle: "Save Draft",
    saving: (
      <>
        <Loader className="size-4 animate-spin" />
        <span>Saving...</span>
      </>
    ),
    saved: (
      <>
        <Check className="size-4 text-green-400" />
        <span className="text-green-400">Saved!</span>
      </>
    ),
    error: (
      <>
        <X className="size-4 text-red-400" />
        <span className="text-red-400">Failed to save</span>
      </>
    ),
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[400px]">
      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-sm font-medium text-zinc-400">Payment Button</h3>
        <StatefulButton
          content={paymentContent[paymentState as keyof typeof paymentContent]}
          onClick={handlePayment}
          disabled={paymentState !== "idle"}
          stateKey={paymentState}
          ariaLabel={`Payment button - ${paymentState}`}
        />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-sm font-medium text-zinc-400">Delete with Confirmation</h3>
        <StatefulButton
          content={deleteContent[deleteState as keyof typeof deleteContent]}
          onClick={handleDelete}
          disabled={deleteState === "deleting" || deleteState === "deleted"}
          stateKey={deleteState}
          className={deleteState === "confirming" ? "animate-pulse" : ""}
          ariaLabel={`Delete button - ${deleteState}`}
        />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-sm font-medium text-zinc-400">Save with Error Handling</h3>
        <StatefulButton
          content={saveContent[saveState as keyof typeof saveContent]}
          onClick={handleSave}
          disabled={saveState !== "idle"}
          stateKey={saveState}
          ariaLabel={`Save button - ${saveState}`}
        />
      </div>
    </div>
  );
}
