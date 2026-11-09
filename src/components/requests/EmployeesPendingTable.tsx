import { useState } from "react";
import type { AppUser, CashAdvanceRequest } from "../../types/CashAdvance";
import { getTransferAdjustedRequestAmount } from "../../liquidationAmounts";

interface EmployeesPendingTableProps {
  requests: CashAdvanceRequest[];
  users: AppUser[];
  onOpenDetails: (request: CashAdvanceRequest) => void;
}

const formatAmount = (amount: number) =>
  "PHP " + amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function EmployeesPendingTable({ requests, users, onOpenDetails }: EmployeesPendingTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const groups = new Map<string, { name: string; total: number; requests: CashAdvanceRequest[] }>();
  const userIdsByName = new Map(users.map((user) => [user.name.trim().toLowerCase(), user.id]));
  for (const request of requests) {
    if (request.status === "fully_liquidated") continue;
    const payeeName = request.payeeName?.trim()
      || users.find((candidate) => candidate.id === request.payeeUserId)?.name;
    const employees = [{ id: request.currentOwner.id, name: request.currentOwner.name }];
    if (payeeName) {
      employees.push({
        id: request.payeeUserId ?? userIdsByName.get(payeeName.toLowerCase()) ?? "name:" + payeeName.toLowerCase(),
        name: payeeName,
      });
    }
    for (const employee of employees) {
      const group = groups.get(employee.id) ?? { name: employee.name, total: 0, requests: [] };
      // An employee who is both owner and payee gets this request only once.
      if (group.requests.some((item) => item.id === request.id)) continue;
      group.total += getTransferAdjustedRequestAmount(request);
      group.requests.push(request);
      groups.set(employee.id, group);
    }
  }
  const query = searchTerm.trim().toLowerCase();
  const rows = [...groups.entries()]
    .filter(([, group]) => !query || group.name.toLowerCase().includes(query)
      || group.requests.some((request) => request.requestNumber.toLowerCase().includes(query)))
    .sort(([, left], [, right]) => left.name.localeCompare(right.name));

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17243f]">Employees Pending</h2>
          <p className="mt-1 text-sm text-[#5c6b7a]">Pending requests and total amounts by employee.</p>
        </div>
        <div className="w-full sm:w-80">
          <label htmlFor="employees-pending-search" className="sr-only">Search owners, payees, or request numbers</label>
          <input id="employees-pending-search" type="search" value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search owner, payee, or request number"
            className="w-full rounded-lg border border-[#c8d4df] bg-white px-3 py-2 text-sm text-[#17243f] focus:border-[#0bb7a5] focus:outline-none" />
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-[#d9e1e8] bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-[#d9e1e8] bg-[#f3f6f9] text-xs uppercase tracking-wide text-[#17243f]">
            <tr>
              {["Owner/Payee", "Total Amount", "List of Requests"].map((label) => (
                <th key={label} scope="col" className="px-5 py-3 font-semibold">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef2f7]">
            {rows.map(([key, group]) => (
              <tr key={key} className="align-top odd:bg-[#f8fafc] hover:bg-[#e2faf6]">
                <td className="px-5 py-4 font-semibold text-[#17243f]">{group.name}</td>
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#17243f]">{formatAmount(group.total)}</td>
                <td className="px-5 py-4">
                  <ul className="space-y-2">
                    {group.requests.map((request) => (
                      <li key={request.id}>
                        <button type="button" onClick={() => onOpenDetails(request)}
                          className="text-left font-semibold text-[#08786f] underline underline-offset-2 focus-visible:outline-2">
                          {request.requestNumber}
                        </button>
                        <span className="ml-3 text-[#5c6b7a]">{formatAmount(getTransferAdjustedRequestAmount(request))}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={3} className="px-5 py-12 text-center text-[#5c6b7a]">{query ? "No pending requests match your search." : "No requests pending liquidation."}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
