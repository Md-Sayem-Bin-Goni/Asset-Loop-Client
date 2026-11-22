"use client";

import { Booking } from "@/types";
import { X, Printer, Layers, CheckCircle2, FileText } from "lucide-react";

interface InvoiceModalProps {
  isOpen: boolean;
  booking: Booking | null;
  onClose: () => void;
}

export default function InvoiceModal({ isOpen, booking, onClose }: InvoiceModalProps) {
  if (!isOpen || !booking) return null;

  const invoiceNumber = `INV-${booking._id.slice(-8).toUpperCase()}`;
  const transactionId = booking.transactionId || `TXN-${booking._id.slice(-6).toUpperCase()}`;
  const issueDate = new Date(
    booking.bookingDate || booking.createdAt || Date.now()
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      {/* Inject print-only isolation styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible !important;
          }
          #printable-invoice {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            margin: 0 !important;
            padding: 2.5rem !important;
            background: #ffffff !important;
            color: #111827 !important;
            border: none !important;
            box-shadow: none !important;
            z-index: 999999 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0B1120] text-gray-900 dark:text-gray-100 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden my-6">
        {/* Top Control Bar (Screen only) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-900/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#059669]">
            <FileText className="h-4 w-4" />
            Official Rental Invoice
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div id="printable-invoice" className="p-6 sm:p-10 space-y-8 bg-white dark:bg-[#0B1120] text-gray-900 dark:text-gray-100">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-[#059669] text-white">
                  <Layers className="h-5 w-5" />
                </div>
                <span className="text-xl font-extrabold tracking-tight">
                  Asset<span className="text-[#059669]">Loop</span>
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Heavy Equipment &amp; Machinery Rental Platform
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dhaka, Bangladesh • support@assetloop.com
              </p>
            </div>

            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                <CheckCircle2 className="inline h-3 w-3 mr-1" />
                {booking.paymentStatus === "Paid" ? "PAID INVOICE" : "UNPAID INVOICE"}
              </span>
              <h2 className="text-lg font-black tracking-tight">{invoiceNumber}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Issued: {issueDate}
              </p>
            </div>
          </div>

          {/* Meta & Customer Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Billed To */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800/80 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#059669]">
                Billed To (Customer)
              </span>
              <p className="font-bold text-sm text-gray-900 dark:text-white pt-1">
                {booking.customerName || "Customer"}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{booking.customerEmail}</p>
              {booking.contactNumber && (
                <p className="text-gray-600 dark:text-gray-400">Contact: {booking.contactNumber}</p>
              )}
              {booking.deliveryAddress && (
                <p className="text-gray-600 dark:text-gray-400">Address: {booking.deliveryAddress}</p>
              )}
            </div>

            {/* Payment & Provider Details */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800/80 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#059669]">
                Transaction &amp; Order Meta
              </span>
              <div className="pt-1 space-y-1 text-gray-600 dark:text-gray-400">
                <p className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-gray-200">{transactionId}</span>
                </p>
                <p className="flex justify-between">
                  <span>Owner Contact:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-200">{booking.ownerEmail}</span>
                </p>
                <p className="flex justify-between">
                  <span>Booking Status:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{booking.bookingStatus}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 text-[11px] font-bold uppercase text-gray-600 dark:text-gray-300">
                  <th className="py-3 px-4">Equipment Description</th>
                  <th className="py-3 px-4">Rental Duration</th>
                  <th className="py-3 px-4 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Total (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <tr>
                  <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">
                    {booking.equipmentName}
                    <span className="block text-[11px] font-normal text-gray-500 dark:text-gray-400 mt-0.5">
                      Verified Rental Machinery
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {booking.startDate} <span className="text-[#059669]">→</span> {booking.endDate}
                  </td>
                  <td className="py-4 px-4 text-center font-semibold text-gray-900 dark:text-white">
                    {booking.requiredQuantity || 1}
                  </td>
                  <td className="py-4 px-4 text-right font-extrabold text-[#059669] dark:text-[#10B981] whitespace-nowrap">
                    ৳{Number(booking.totalAmount).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Invoice Summary Totals */}
          <div className="flex justify-end pt-2">
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Subtotal:</span>
                <span>৳{Number(booking.totalAmount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Platform Service Fee:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">৳0 (Included)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-800 font-extrabold text-sm text-gray-900 dark:text-white">
                <span>Total Paid:</span>
                <span className="text-base text-[#059669] dark:text-[#10B981]">
                  ৳{Number(booking.totalAmount).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 text-center space-y-1">
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Thank you for trusting AssetLoop for your equipment rental needs!
            </p>
            <p>
              This is an official system-generated invoice receipt. For questions or equipment dispatch assistance, contact support@assetloop.com
            </p>
          </div>
        </div>

        {/* Bottom Modal Actions (Screen only) */}
        <div className="no-print flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-900/60">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
