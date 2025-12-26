import React from "react";
import { SidebarDemo } from "@/components/sidebar";
import { PlaceholdersAndVanishInputDemo } from "@/components/placehorder";

function ChatPage() {
  return (
    <div className="flex h-full min-h-screen w-full overflow-hidden">
      <aside className="hidden lg:flex w-72 shrink-0 border-r border-slate-200 bg-white/80 backdrop-blur">
        <SidebarDemo />
      </aside>
      <main className="flex flex-1 items-center justify-center overflow-y-auto p-4 sm:p-6">
        <PlaceholdersAndVanishInputDemo />
      </main>
    </div>
  );
}

export default ChatPage;