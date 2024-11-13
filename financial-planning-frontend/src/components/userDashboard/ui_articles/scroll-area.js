// ./ui_articles/scroll-area.js
import React from 'react'
import { cn } from "../../../lib/utils";

export function ScrollArea({ children, className, ...props }) {
  return (
    <div
      className={cn("overflow-auto", className)}
      style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e0 #edf2f7" }} // fallback for Firefox
      {...props}
    >
      {children}
      <style jsx>{`
        /* Scrollbar customization for Chrome, Edge, and Safari */
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #cbd5e0; /* Customize scrollbar thumb color */
          border-radius: 4px;
        }
        &::-webkit-scrollbar-track {
          background: #edf2f7; /* Customize scrollbar track color */
        }
      `}</style>
    </div>
  )
}
