"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 h-full">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="page-enter">{children}</div>
        </main>
      </div>
    </div>
  );
}
