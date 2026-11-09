import BusyLabel from "../BusyLabel";
import type { FormEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { roleLabels } from "../../auth/roleConfig";
import { demoPassword } from "../../data/mockData";
import type { AppUser, DataMode } from "../../types/CashAdvance";
import Avatar from "../Avatar";

interface LoginPageProps {
  users: AppUser[];
  dataMode: DataMode;
  isLoadingUsers?: boolean;
  usersError?: string;
  onReloadUsers?: () => void;
  onDataModeChange: (mode: DataMode) => void;
  onLogin: (username: string, password: string) => Promise<void> | void;
}

export default function LoginPage({
  users,
  dataMode,
  isLoadingUsers = false,
  onLogin,
}: LoginPageProps) {
  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" })),
    [users],
  );
  const [username, setUsername] = useState(sortedUsers[0]?.username ?? "");
  const [password, setPassword] = useState(demoPassword);
  const [error, setError] = useState("");
  const loginInFlight = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedUsername = users.some((user) => user.username === username) ? username : sortedUsers[0]?.username ?? "";

  const selectedUser = useMemo(
    () => users.find((user) => user.username === selectedUsername) ?? null,
    [users, selectedUsername],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginInFlight.current) return;

    if (!selectedUser) {
      setError(dataMode === "live" ? "No API user is selected." : "No demo user is selected.");
      return;
    }

    setError("");
    loginInFlight.current = true;
    setIsSubmitting(true);

    try {
      await onLogin(selectedUser.username, password);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
    } finally {
      loginInFlight.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f6f9] px-4 py-10 text-[#17243f]">
      <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-[#d9e1e8] bg-white shadow-sm">
        <div className="grid">
          <form onSubmit={handleSubmit} className="p-8">
            <h2 className="text-xl font-bold text-[#17243f]">Fund Management Demo</h2>
            <p className="mt-2 text-sm text-[#5c6b7a]">Explore fictional cash advances, approvals, and petty cash. Select any role below. Demo password: <strong>{demoPassword}</strong>.</p>
            <p className="mt-2 text-xs text-[#5c6b7a]">Changes stay in this tab while you switch roles. Refresh to reset. Admin management and accounting exports require a backend.</p>

            <label className="mt-6 block text-sm font-semibold text-[#17243f]" htmlFor="username">
              User
            </label>
            <select
              id="username"
              value={selectedUsername}
              onChange={(event) => setUsername(event.target.value)}
              disabled={isLoadingUsers || users.length === 0}
              className="mt-2 w-full rounded-lg border border-[#c8d4df] px-3 py-3 text-sm focus:border-[#0bb7a5] focus:outline-none disabled:cursor-not-allowed disabled:bg-[#eef2f7]"
            >
              {sortedUsers.map((user) => (
                <option key={user.id} value={user.username}>
                  {user.name} - {roleLabels[user.role]} - {user.department}
                </option>
              ))}
            </select>

            <label className="mt-5 block text-sm font-semibold text-[#17243f]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-lg border border-[#c8d4df] px-3 py-3 text-sm focus:border-[#0bb7a5] focus:outline-none"
            />

            {error && <p className="mt-4 rounded-lg bg-[#fff0f4] px-3 py-2 text-sm text-[#d30f42]">{error}</p>}

            {isLoadingUsers && (
              <p className="mt-4 rounded-lg bg-[#eef2f7] px-3 py-2 text-sm text-[#5c6b7a]">Loading API users...</p>
            )}

            {selectedUser && (
              <div className="mt-6 rounded-lg border border-[#d9e1e8] bg-[#f3f6f9] p-4">
                <div className="flex items-center gap-3">
                  <Avatar employee={selectedUser} />
                  <div>
                    <p className="font-semibold text-[#17243f]">{selectedUser.name}</p>
                    <p className="text-sm text-[#5c6b7a]">
                      {selectedUser.title} - {selectedUser.department}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLoadingUsers || !selectedUser}
              className="mt-6 w-full rounded-lg bg-[#0bb7a5] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#099988] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <BusyLabel busy={isSubmitting} label="Signing in...">Sign in</BusyLabel>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
