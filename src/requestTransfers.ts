import type { CashAdvanceRequest } from "./types/CashAdvance";

export const getRequestTransfers = (request: CashAdvanceRequest): string[] => {
  const allocations = (request.transferAllocations ?? []).filter((transfer) => transfer.status === "acknowledged");
  if (allocations.length > 0) {
    return allocations.map((transfer) => `${transfer.fromEmployee.name} > ${transfer.toEmployee.name}`);
  }
  // Legacy requests may have history instead of transfer allocation records.
  const transfers = request.history.filter(
    (event) => event.action === "transferred" && event.fromEmployee && event.toEmployee,
  );
  if (transfers.length > 0) {
    return transfers.map((event) => `${event.fromEmployee!.name} > ${event.toEmployee!.name}`);
  }
  const hasTransfer = Boolean(request.originalRequestId) || request.history.some((event) => event.action === "transfer_acknowledged");
  return hasTransfer && request.originalOwner.id !== request.currentOwner.id
    ? [`${request.originalOwner.name} > ${request.currentOwner.name}`]
    : [];
};

