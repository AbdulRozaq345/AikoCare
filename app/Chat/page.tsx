import React from "react";
import { SidebarDemo } from "@/components/sidebar";
import { PlaceholdersAndVanishInputDemo } from "@/components/placehorder";

function ChatPage() {
  return (
    <div className="flex h-full min-h-screen w-full overflow-hidden">
      <aside className="flex max-w-xs">
        <SidebarDemo />
      </aside>
      <main className="flex flex-1 items-center justify-center overflow-y-auto p-4">
        <PlaceholdersAndVanishInputDemo />
      </main>
    </div>
  );
}

export default ChatPage;