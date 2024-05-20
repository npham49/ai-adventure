"use client";

import { useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const handlePlayerAction = useAction(api.chat.handlePlayerAction);
  const entries = useQuery(api.chat.getAllEntries)
  const [message, setMessage] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col">
          <div className="bg-white rounded-xl h-[400px] w-[300px] mb-2 p-2 overflow-y-auto">
            {entries?.map(entry=>{
              return (
                <div key={entry._id} className="flex flex-col gap-2 text-black mb-2 p-2">
                  <p><strong>Player: </strong>{entry.input}</p>
                  <p><strong>Game: </strong>{entry.response}</p>
                </div>
              )
            })}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePlayerAction({ message: message });
              setMessage("");
            }}
          >
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 text-black"
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
}
