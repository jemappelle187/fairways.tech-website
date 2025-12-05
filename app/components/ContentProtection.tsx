"use client";

import { useEffect } from "react";

/**
 * Content Protection Component
 * 
 * ⚠️ IMPORTANT: These are deterrents only, not true security.
 * Determined users can bypass all of these protections by:
 * - Disabling JavaScript
 * - Using browser extensions
 * - Viewing page source directly
 * - Using curl/wget
 * - Screen readers and accessibility tools
 * 
 * These protections will:
 * - Deter casual copying
 * - Make inspection more difficult
 * - Show warnings for dev tools
 * 
 * They will NOT:
 * - Prevent determined users from accessing content
 * - Stop search engines (which is good for SEO)
 * - Block legitimate accessibility tools
 */
export function ContentProtection() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection (but allow on interactive elements)
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      // Check if target is an Element before using closest
      if (!(target instanceof Element)) {
        return;
      }
      // Allow selection in form elements, buttons, and links
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.isContentEditable ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select")
      ) {
        return; // Allow selection in interactive elements
      }
      e.preventDefault();
      return false;
    };

    // Disable drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts (but allow interactions with form elements and buttons)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow keyboard navigation and interactions with form elements, buttons, and links
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.isContentEditable ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select")
      ) {
        return; // Allow normal keyboard interaction with interactive elements
      }

      // Disable F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+A (Select All) - but allow in form fields
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+C (Copy) - but allow in form fields
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+X (Cut) - but allow in form fields
      if (e.ctrlKey && e.key === "x") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+P (Print)
      if (e.ctrlKey && e.key === "p") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+P (Command Palette in some browsers)
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+K (Console in Firefox)
      if (e.ctrlKey && e.shiftKey && e.key === "K") {
        e.preventDefault();
        return false;
      }
    };

    // Detect DevTools opening (basic detection)
    let devToolsOpen = false;
    const detectDevTools = () => {
      const threshold = 160;
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          console.clear();
          console.log(
            "%c⚠️ Developer Tools Detected",
            "color: red; font-size: 20px; font-weight: bold;"
          );
          console.log(
            "%cThis website is protected. Unauthorized access or copying of content is prohibited.",
            "color: red; font-size: 14px;"
          );
        }
      } else {
        devToolsOpen = false;
      }
    };

    // Monitor for DevTools
    const devToolsInterval = setInterval(detectDevTools, 500);

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      clearInterval(devToolsInterval);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null; // This component doesn't render anything
}

