import type { CashAdvanceRequest } from "./types/CashAdvance";

export const getActualSpentAmount = (request: CashAdvanceRequest) =>
  request.liquidationAmount ?? request.liquidatedAmount;

export const isReturnAcknowledged = (request: CashAdvanceRequest) =>
  (request.returnAmount ?? 0) > 0 && request.acknowledgementReceipt?.status === "acknowledged";

export const getLiquidationBaseAmount = (request: CashAdvanceRequest) => {
  if (request.isPartialLiquidation) return request.liquidationAmount ?? 0;
  if ((request.approvedLiquidatedAmount ?? 0) > 0 && ["pending_liquidation", "partially_liquidated"].includes(request.status)) return request.remainingAmount;
  const actualSpent = getActualSpentAmount(request);
  const hasSubmittedLiquidation =
    request.liquidationAmount !== undefined ||
    request.liquidatedAmount > 0 ||
    request.returnAmount !== undefined ||
    request.excessAmount !== undefined;

  return hasSubmittedLiquidation
    ? Math.max(actualSpent + (request.returnAmount ?? 0) - (request.excessAmount ?? 0), 0)
    : request.remainingAmount;
};

export const getLiquidatedAmount = (request: CashAdvanceRequest) => {
  const baseAmount = getLiquidationBaseAmount(request);
  const actualSpent = Math.min(getActualSpentAmount(request), baseAmount);
  const clearedReturnAmount = isReturnAcknowledged(request) ? request.returnAmount ?? 0 : 0;

  return Math.min(baseAmount, actualSpent + clearedReturnAmount);
};

export const getPendingLiquidationAmount = (request: CashAdvanceRequest) =>
  request.isPartialLiquidation ? request.partialLiquidationBalance ?? 0 :
  (request.approvedLiquidatedAmount ?? 0) > 0 && ["pending_liquidation", "partially_liquidated"].includes(request.status) ? request.remainingAmount :
  Math.max(getLiquidationBaseAmount(request) - getLiquidatedAmount(request), 0);

export const getTransferredOutAmount = (request: CashAdvanceRequest) => {
  const acknowledgedPartialTransferAmount = (request.transferAllocations ?? [])
    .filter((allocation) => allocation.status === "acknowledged" && !allocation.isWholeRequest)
    .reduce((sum, allocation) => sum + allocation.amount, 0);

  if (acknowledgedPartialTransferAmount > 0) {
    return Math.min(request.amount, acknowledgedPartialTransferAmount);
  }

  if ((request.approvedLiquidatedAmount ?? 0) > 0 || request.isPartialLiquidation) return 0;

  const hasTransferAdjustedBalance =
    request.remainingAmount > 0 &&
    request.remainingAmount < request.amount &&
    request.liquidationAmount === undefined &&
    request.returnAmount === undefined &&
    request.excessAmount === undefined;

  return hasTransferAdjustedBalance ? request.amount - request.remainingAmount : 0;
};

export const getTransferAdjustedRequestAmount = (request: CashAdvanceRequest) =>
  Math.max(request.amount - getTransferredOutAmount(request) - (request.approvedLiquidatedAmount ?? 0), 0);
