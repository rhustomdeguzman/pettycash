import type { AppUser, CashAdvanceRequest, Employee } from "../types/CashAdvance";

export const demoPassword = "password123";

export const users: AppUser[] = [
  {
    id: "0",
    username: "admin",
    name: "Demo Administrator",
    department: "Administration",
    avatar: "DA",
    title: "Administrator",
    role: "admin",
  },
  {
    id: "1",
    username: "requestor",
    name: "Alex Morgan",
    department: "MIS",
    avatar: "AM",
    title: "Requestor",
    role: "requestor",
  },
  {
    id: "2",
    username: "depthead",
    name: "Jordan Ellis",
    department: "MIS",
    avatar: "JE",
    title: "Department Head",
    role: "department_head",
  },
  {
    id: "3",
    username: "accounting",
    name: "Taylor Brooks",
    department: "Accounting",
    avatar: "TB",
    title: "Accounts Payable",
    role: "accounting",
  },
  {
    id: "4",
    username: "cashier",
    name: "Casey Bennett",
    department: "Accounting",
    avatar: "CB",
    title: "Cashier",
    role: "cashier",
  },
  {
    id: "15",
    username: "custodian",
    name: "Sam Carter",
    department: "Accounting",
    avatar: "SC",
    title: "Petty Cash Custodian",
    role: "custodian",
    pettyCashFundAmount: 20000,
  },
  {
    id: "5",
    username: "it.requestor",
    name: "Riley Parker",
    department: "IT",
    avatar: "RP",
    title: "Requestor",
    role: "requestor",
  },
  {
    id: "6",
    username: "hr.requestor",
    name: "Jamie Reed",
    department: "HR",
    avatar: "JR",
    title: "Requestor",
    role: "requestor",
  },
  {
    id: "7",
    username: "hr.head",
    name: "Avery Quinn",
    department: "HR",
    avatar: "AQ",
    title: "Department Head",
    role: "department_head",
  },
  {
    id: "8",
    username: "its.head",
    name: "Drew Harper",
    department: "IT",
    avatar: "DH",
    title: "Department Head",
    role: "department_head",
  },
  {
    id: "9",
    username: "eng.requestor",
    name: "Cameron Blake",
    department: "Engineering",
    avatar: "CB",
    title: "Requestor",
    role: "requestor",
  },
  {
    id: "10",
    username: "eng.head",
    name: "Rowan Hayes",
    department: "Engineering",
    avatar: "RH",
    title: "Department Head",
    role: "department_head",
  },
  {
    id: "11",
    username: "acct.requestor",
    name: "Finley Lane",
    department: "Accounting",
    avatar: "FL",
    title: "Requestor",
    role: "requestor",
  },
  {
    id: "12",
    username: "acct.head",
    name: "Skyler Gray",
    department: "Accounting",
    avatar: "SG",
    title: "Department Head",
    role: "department_head",
  },
  {
    id: "13",
    username: "am.requestor",
    name: "Dakota Bell",
    department: "Accounts Management",
    avatar: "DB",
    title: "Requestor",
    role: "requestor",
  },
  {
    id: "14",
    username: "am.head",
    name: "Emerson Cole",
    department: "Accounts Management",
    avatar: "EC",
    title: "Department Head",
    role: "department_head",
  },
  {
    id: "16",
    username: "mis.custodian",
    name: "Morgan Avery",
    department: "MIS",
    avatar: "MA",
    title: "Petty Cash Custodian",
    role: "custodian",
    pettyCashFundAmount: 20000,
  },
  {
    id: "17",
    username: "it.custodian",
    name: "Reese Jordan",
    department: "IT",
    avatar: "RJ",
    title: "Petty Cash Custodian",
    role: "custodian",
    pettyCashFundAmount: 20000,
  },
  {
    id: "18",
    username: "hr.custodian",
    name: "Peyton Taylor",
    department: "HR",
    avatar: "PT",
    title: "Petty Cash Custodian",
    role: "custodian",
    pettyCashFundAmount: 20000,
  },
  {
    id: "19",
    username: "eng.custodian",
    name: "Quinn Riley",
    department: "Engineering",
    avatar: "QR",
    title: "Petty Cash Custodian",
    role: "custodian",
    pettyCashFundAmount: 20000,
  },
  {
    id: "20",
    username: "am.custodian",
    name: "Sage Cameron",
    department: "Accounts Management",
    avatar: "SC",
    title: "Petty Cash Custodian",
    role: "custodian",
    pettyCashFundAmount: 20000,
  },
];

export const employees: Employee[] = users.map(({ id, name, department, avatar }) => ({
  id,
  name,
  department,
  avatar,
}));

const findUser = (username: string): AppUser => {
  const user = users.find((candidate) => candidate.username === username);
  if (!user) {
    throw new Error(`Demo user ${username} is not configured.`);
  }

  return user;
};

const requestor = findUser("requestor");
const cashier = findUser("cashier");
const itRequestor = findUser("it.requestor");

export const getCashierUser = (): AppUser => cashier;

const seedRequests = (): CashAdvanceRequest[] => [
  {
    id: "1",
    requestNumber: "CA-2026-001",
    amount: 5000,
    remainingAmount: 5000,
    liquidatedAmount: 0,
    purpose: "Regional office supplies and equipment",
    sourceSystem: "RFP System",
    createdAt: new Date("2026-06-10"),
    status: "pending_liquidation",
    currentOwner: requestor,
    originalOwner: requestor,
    department: requestor.department,
    history: [
      {
        id: "h1",
        timestamp: new Date("2026-06-10"),
        action: "created",
        notes: "Request imported from RFP System.",
      },
    ],
    dueDate: new Date("2026-06-20"),
  },
  {
    id: "2",
    requestNumber: "CA-2026-002",
    amount: 3500,
    remainingAmount: 3500,
    liquidatedAmount: 0,
    purpose: "Team workshop materials",
    sourceSystem: "RFP System",
    createdAt: new Date("2026-06-08"),
    status: "pending_department_approval",
    currentOwner: requestor,
    originalOwner: requestor,
    department: requestor.department,
    history: [
      {
        id: "h4",
        timestamp: new Date("2026-06-08"),
        action: "created",
        notes: "Request imported from RFP System.",
      },
      {
        id: "h5",
        timestamp: new Date("2026-06-12"),
        action: "liquidation_submitted",
        amount: 3500,
        notes: "Requestor submitted exact liquidation for department review.",
      },
    ],
    liquidationAmount: 3500,
    liquidationNotes: "Exact amount.",
    attachmentNames: ["OR-3500.pdf"],
    dueDate: new Date("2026-06-18"),
  },
  {
    id: "3",
    requestNumber: "CA-2026-003",
    amount: 8000,
    remainingAmount: 8000,
    liquidatedAmount: 0,
    purpose: "Client conference travel and accommodation",
    sourceSystem: "RFP System",
    createdAt: new Date("2026-06-14"),
    status: "pending_cashier_return",
    currentOwner: requestor,
    originalOwner: requestor,
    department: requestor.department,
    history: [
      {
        id: "h6",
        timestamp: new Date("2026-06-14"),
        action: "created",
        notes: "Request imported from RFP System.",
      },
      {
        id: "h6b",
        timestamp: new Date("2026-06-18"),
        action: "liquidation_submitted",
        amount: 6500,
        notes: "Less than",
      },
      {
        id: "h6c",
        timestamp: new Date("2026-06-19"),
        action: "approved_by_department_head",
        amount: 1500,
        notes: "Excess must be return to cashier.",
      },
    ],
    liquidationAmount: 6500,
    liquidationNotes: "Conference expenses and travel receipts.",
    attachmentNames: ["conference-receipts.zip"],
    returnAmount: 1500,
    dueDate: new Date("2026-06-24"),
  },
  {
    id: "4",
    requestNumber: "CA-2026-004",
    amount: 12000,
    remainingAmount: 12000,
    liquidatedAmount: 0,
    purpose: "IT infrastructure maintenance",
    sourceSystem: "RFP System",
    createdAt: new Date("2026-06-18"),
    status: "pending_accounting_review",
    currentOwner: itRequestor,
    originalOwner: itRequestor,
    department: itRequestor.department,
    history: [
      {
        id: "h7",
        timestamp: new Date("2026-06-18"),
        action: "created",
        notes: "Request created by IT requestor.",
      },
      {
        id: "h8",
        timestamp: new Date("2026-06-19"),
        action: "approved_by_department_head",
        notes: "Receipts verified; forwarded to accounting.",
      },
    ],
    liquidationAmount: 12000,
    liquidationNotes: "Exact amount",
    attachmentNames: ["123.pdf"],
    dueDate: new Date("2026-06-28"),
  },
  {
    id: "5", requestNumber: "PC-2026-001", requestType: "petty_cash_advance",
    companyId: 1, amount: 1500, remainingAmount: 1500, liquidatedAmount: 0,
    purpose: "Local travel for branch support", sourceSystem: "Petty Cash",
    createdAt: new Date("2026-06-18"), dueDate: new Date("2026-06-25"),
    status: "pending_custodian_approval", currentOwner: requestor, originalOwner: requestor,
    department: requestor.department, custodian: findUser("mis.custodian"),
    history: [{ id: "h-pc1", timestamp: new Date("2026-06-18"), action: "petty_cash_requested", amount: 1500, notes: "Sample travel advance awaiting custodian release." }],
  },
  {
    id: "6", requestNumber: "CA-2026-005", requestType: "cash_advance",
    companyId: 1, amount: 2500, remainingAmount: 0, liquidatedAmount: 2500,
    purpose: "Completed training supplies purchase", sourceSystem: "RFP System",
    createdAt: new Date("2026-06-05"), dueDate: new Date("2026-06-15"),
    status: "fully_liquidated", currentOwner: requestor, originalOwner: requestor,
    department: requestor.department,
    history: [{ id: "h-closed", timestamp: new Date("2026-06-12"), action: "fully_liquidated", amount: 2500, notes: "All expenses reviewed and closed." }],
  },
];

// Keep the timeline relevant whenever a visitor opens the demo.
export const generateInitialRequests = (): CashAdvanceRequest[] => {
  const offset = Date.now() - new Date("2026-06-20T12:00:00").getTime();
  const shiftDates = (value: unknown): unknown => {
    if (value instanceof Date) return new Date(value.getTime() + offset);
    if (Array.isArray(value)) return value.map(shiftDates);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shiftDates(item)]));
    return value;
  };
  return shiftDates(seedRequests()) as CashAdvanceRequest[];
};
