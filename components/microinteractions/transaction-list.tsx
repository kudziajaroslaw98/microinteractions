"use client";

import { RefObject, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Smartphone, Fuel, Dumbbell, Wifi, Users, X, Pin } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  frequency?: string;
  icon: React.ReactNode;
  details: {
    transactionId: string;
    date: string;
    time: string;
    paymentMethod: string;
    reference: string;
  };
}

const transactions: Transaction[] = [
  {
    id: "1",
    title: "Iphone 15",
    subtitle: "One-time purchase",
    amount: "$799",
    icon: <Smartphone className="w-6 h-6" />,
    details: {
      transactionId: "#67325",
      date: "August 15",
      time: "09:20 am",
      paymentMethod: "Bank Transfer",
      reference: "542193",
    },
  },
  {
    id: "2",
    title: "Gas Station (Full Tank)",
    subtitle: "Pay-per-use",
    amount: "$50",
    icon: <Fuel className="w-6 h-6" />,
    details: {
      transactionId: "#67326",
      date: "August 14",
      time: "06:45 pm",
      paymentMethod: "Credit Card",
      reference: "542194",
    },
  },
  {
    id: "3",
    title: "Gym Membership",
    subtitle: "Membership",
    amount: "$40",
    frequency: "/month",
    icon: <Dumbbell className="w-6 h-6" />,
    details: {
      transactionId: "#67327",
      date: "August 13",
      time: "11:30 am",
      paymentMethod: "Auto-debit",
      reference: "542195",
    },
  },
  {
    id: "4",
    title: "Home WiFi",
    subtitle: "Usage-based billing",
    amount: "$60",
    frequency: "/month",
    icon: <Wifi className="w-6 h-6" />,
    details: {
      transactionId: "#67328",
      date: "August 12",
      time: "03:15 pm",
      paymentMethod: "Bank Transfer",
      reference: "542196",
    },
  },
  {
    id: "5",
    title: "Admin Fee",
    subtitle: "Service fee",
    amount: "$5",
    icon: <Users className="w-6 h-6" />,
    details: {
      transactionId: "#67329",
      date: "August 11",
      time: "10:00 am",
      paymentMethod: "Wallet",
      reference: "542197",
    },
  },
];

export function TransactionList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expandedIndex = useRef<number>(-1);

  const handleExpand = (index: number) => {
    setExpandedId(transactions[index].id);
    expandedIndex.current = index;
  };

  const handleCollapse = () => {
    setExpandedId(null);
    setTimeout(() => {
      expandedIndex.current = -1;
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-[800px] w-full bg-black p-4">
      <LayoutGroup>
        <motion.div
          layout
          className="w-full max-w-md bg-gradient-to-b from-zinc-900 to-black rounded-3xl p-6 relative overflow-hidden"
        >
          {/* <AnimatePresence mode="popLayout">
            {expandedId === null && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-white text-2xl font-bold mb-6 text-center"
              >
                Transaction
              </motion.h1>
            )}
          </AnimatePresence> */}

          <motion.div layout>
            <AnimatePresence mode="popLayout">
              {transactions.map((transaction, index) => {
                const isExpanded = expandedId === transaction.id;
                const shouldShow = !expandedId || isExpanded;

                return shouldShow ? (
                  <TransactionItem
                    key={transaction.id}
                    index={index}
                    expandedIndex={expandedIndex}
                    transaction={transaction}
                    isExpanded={isExpanded}
                    onExpand={() => handleExpand(index)}
                    onCollapse={() => handleCollapse()}
                  />
                ) : null;
              })}
            </AnimatePresence>
          </motion.div>

          {/* <AnimatePresence mode="popLayout">
            {expandedId === null && (
              <motion.button
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full mt-6 py-4 bg-gray-200 text-black font-semibold rounded-2xl flex items-center justify-center gap-2 "
              >
                All Transaction
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="translate-y-[1px]"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence> */}
        </motion.div>
      </LayoutGroup>
    </div>
  );
}

interface TransactionItemProps {
  transaction: Transaction;
  isExpanded: boolean;
  index: number;
  expandedIndex: RefObject<number>;
  onExpand: () => void;
  onCollapse: () => void;
}

function TransactionItem({
  transaction,
  isExpanded,
  index,
  expandedIndex,
  onExpand,
  onCollapse,
}: TransactionItemProps) {
  console.log(index, expandedIndex);
  const direction = index > expandedIndex.current ? -1 : 1;
  return (
    <motion.div
      layout
      onClick={!isExpanded ? onExpand : undefined}
      className={`
        rounded-2xl relative
        ${!isExpanded && "cursor-pointer"}
      `}
      initial={{ opacity: 0, y: direction * -200, height: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        height: "auto",
      }}
      exit={{
        opacity: 0,
        y: direction * -200,
        height: 0,
      }}
      transition={{
        layout: { type: "spring", damping: 25, stiffness: 300 },
        opacity: { duration: 0.4 },
        y: { type: "spring", damping: 20, stiffness: 150 },
      }}
    >
      {/* Main Content */}
      <motion.div className="flex items-center gap-4 p-4 relative ">
        {/* Icon */}
        <motion.div
          layout
          className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center"
        >
          <span className="text-black">{transaction.icon}</span>
        </motion.div>

        {/* Info */}
        <motion.div className="flex-1 min-w-0">
          <motion.h3 className="text-white font-semibold text-base">{transaction.title}</motion.h3>
          <motion.p className="text-gray-400 text-sm">{transaction.subtitle}</motion.p>
        </motion.div>

        {/* Amount - Hidden when expanded */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              layout
              className="flex flex-col items-end"
              initial={{ opacity: 1, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
            >
              <motion.span layout className="text-white font-semibold text-lg">
                {transaction.amount}
              </motion.span>
              {transaction.frequency && (
                <motion.span layout className="text-gray-400 text-sm">
                  {transaction.frequency}
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close Button - Only visible when expanded */}
        <AnimatePresence mode="popLayout">
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={e => {
                e.stopPropagation();
                onCollapse();
              }}
              className="w-8 h-8 rounded-full bg-zinc-700/80 hover:bg-zinc-600/80 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              delay: 0.1,
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden"
          >
            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="h-[1px] bg-gray-700 mx-4 origin-center"
            />

            {/* Transaction Details */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="p-4 pt-6 space-y-2"
            >
              <div className="flex items-start gap-3">
                <Pin className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <p className="text-gray-400 text-sm">{transaction.details.transactionId}</p>
                  <p className="text-gray-400 text-sm">{transaction.details.date}</p>
                  <p className="text-gray-400 text-sm">{transaction.details.time}</p>
                </div>
              </div>

              {/* Another Separator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="h-[1px] bg-gray-700 origin-center !mt-4 !mb-4"
              />

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <p className="text-gray-400 text-sm">
                  Paid via {transaction.details.paymentMethod}
                </p>
                <p className="text-gray-400 text-sm">Ref: {transaction.details.reference}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
