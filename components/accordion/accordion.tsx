import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ShieldCheck, Truck, RotateCcw, Package, CreditCard } from "lucide-react";
import { createContext, ReactNode, useState, type Dispatch, type SetStateAction } from "react";

interface AccordionItem {
  id: string;
  icon: ReactNode;
  title: string;
  content: string;
}

interface AccordionContextItem extends AccordionItem {
  isOpen: boolean;
}

const AccordionContext = createContext<{
  value: AccordionContextItem[];
  setValue: Dispatch<SetStateAction<AccordionContextItem[]>>;
}>({
  value: [],
  setValue: () => {},
});

const items: AccordionItem[] = [
  {
    id: "1",
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Is my payment information secure?",
    content:
      "Yes, we use industry-standard encryption and comply with PCI DSS standards. Your payment information is never stored on our servers and is processed through secure payment gateways.",
  },
  {
    id: "2",
    icon: <Truck className="w-5 h-5" />,
    title: "What are your shipping options?",
    content:
      "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and overnight delivery. Shipping costs vary by location and order size. Free standard shipping on orders over $50.",
  },
  {
    id: "3",
    icon: <RotateCcw className="w-5 h-5" />,
    title: "What is your return policy?",
    content:
      "We accept returns within 30 days of purchase. Items must be unused, in original packaging, and with all tags attached. Refunds are processed within 5-7 business days after we receive your return.",
  },
  {
    id: "4",
    icon: <Package className="w-5 h-5" />,
    title: "How can I track my order?",
    content:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history. Tracking updates typically appear within 24 hours of shipment.",
  },
  {
    id: "5",
    icon: <CreditCard className="w-5 h-5" />,
    title: "What payment methods do you accept?",
    content:
      "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and shop gift cards. Payment is processed at the time of order placement.",
  },
];

export const Accordion = () => {
  const [contextValue, setContextValue] = useState<AccordionContextItem[]>(
    items.map(item => ({
      ...item,
      isOpen: false,
    })),
  );

  return (
    <AccordionContext.Provider value={{ value: contextValue, setValue: setContextValue }}>
      <div className="w-full">
        {contextValue.map((item, index) => {
          const previous = contextValue[index - 1];
          const next = contextValue[index + 1];

          const previousOpen = previous?.isOpen || false;
          const nextOpen = next?.isOpen || false;
          const currentOpen = item.isOpen;

          return (
            <motion.div
              key={item.id}
              role="button"
              onClick={() =>
                setContextValue(prev =>
                  prev.map(i => (i.id === item.id ? { ...i, isOpen: !i.isOpen } : i)),
                )
              }
              className={cn(
                "p-3 border border-zinc-600 first:rounded-t-lg last:rounded-b-lg w-[500px]",
              )}
              animate={{
                borderTop:
                  previousOpen || currentOpen || index === 0
                    ? "1px solid #52525c"
                    : "0px solid transparent",
                borderTopLeftRadius:
                  previousOpen || currentOpen ? "0.5rem" : index === 0 ? "0.5rem" : "0rem",
                borderTopRightRadius:
                  previousOpen || currentOpen ? "0.5rem" : index === 0 ? "0.5rem" : "0rem",
                borderBottomLeftRadius:
                  nextOpen || currentOpen
                    ? "0.5rem"
                    : index === contextValue.length - 1
                      ? "0.5rem"
                      : "0rem",
                borderBottomRightRadius:
                  nextOpen || currentOpen
                    ? "0.5rem"
                    : index === contextValue.length - 1
                      ? "0.5rem"
                      : "0rem",

                marginTop: currentOpen ? "0.5rem" : "0rem",
                marginBottom: currentOpen ? "0.5rem" : "0rem",
                transition: {
                  duration: 0.35,
                  ease: "circInOut",
                },
              }}
            >
              <h2 className="flex items-center justify-between w-full">
                <div className="flex items-center gap-5">
                  <span className="text-zinc-400">{item.icon}</span>
                  <span className="text-white font-medium">{item.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: item.isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "circOut" }}
                  className="text-zinc-400"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </h2>
              <AnimatePresence>
                {item.isOpen && (
                  <motion.div
                    initial={{ height: 0, filter: "blur(10px)", y: 10, opacity: 0 }}
                    animate={{
                      height: "auto",
                      filter: "blur(0)",
                      y: 0,
                      opacity: 1,
                      transition: {
                        height: { type: "spring", stiffness: 200, damping: 30 },
                        filter: { duration: 0.45, ease: "easeIn" },
                        opacity: { duration: 0.45, ease: "easeOut" },
                        y: { type: "spring", stiffness: 200, damping: 30 },
                      }
                    }}
                    exit={{
                      height: 0,
                      filter: "blur(10px)",
                      y: 10,
                      opacity: 0,
                      transition: {
                        height: { type: "spring", stiffness: 200, damping: 30 },
                        filter: { duration: 0.45, ease: "easeOut" },
                        opacity: { duration: 0.45, ease: "easeIn" },
                        y: { type: "spring", stiffness: 200, damping: 30 },
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-zinc-400 text-sm leading-relaxed pt-3">{item.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </AccordionContext.Provider>
  );
};
