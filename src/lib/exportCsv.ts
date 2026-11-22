import { Booking } from "@/types";

/**
 * Escapes a cell value for CSV formatting according to RFC 4180.
 */
function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '""';
  }
  const stringValue = String(value);
  if (
    stringValue.includes('"') ||
    stringValue.includes(",") ||
    stringValue.includes("\n") ||
    stringValue.includes("\r")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return `"${stringValue}"`;
}

/**
 * Converts rental booking records to a CSV string, creates a UTF-8 Blob,
 * and triggers an immediate client-side file download.
 */
export function exportBookingsToCsv(
  rentals: Booking[],
  filename: string = `assetloop-rentals-${new Date().toISOString().slice(0, 10)}.csv`
): boolean {
  if (!rentals || rentals.length === 0) {
    return false;
  }

  const headers = [
    "Booking ID",
    "Equipment Name",
    "Customer Name",
    "Customer Email",
    "Contact Number",
    "Delivery Address",
    "Owner Email",
    "Rental Start Date",
    "Rental End Date",
    "Quantity",
    "Total Amount (BDT)",
    "Payment Status",
    "Booking Status",
    "Transaction ID",
    "Booking Date",
  ];

  const rows = rentals.map((b) => [
    b._id,
    b.equipmentName,
    b.customerName || "N/A",
    b.customerEmail,
    b.contactNumber || "N/A",
    b.deliveryAddress || "N/A",
    b.ownerEmail,
    b.startDate,
    b.endDate,
    b.requiredQuantity || 1,
    b.totalAmount,
    b.paymentStatus,
    b.bookingStatus,
    b.transactionId || "N/A",
    b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "N/A",
  ]);

  const csvContent = [
    headers.map(escapeCsvCell).join(","),
    ...rows.map((row) => row.map(escapeCsvCell).join(",")),
  ].join("\r\n");

  // UTF-8 BOM (\uFEFF) ensures Excel renders special symbols and formatting properly
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    filename.endsWith(".csv") ? filename : `${filename}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}
