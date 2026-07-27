import type { ProjectTypeId } from "@/data/contact";

const EVENT = "arkyo:prefill-project-type";

/** Asks the contact form to pre-select a project type (never submits it). */
export function requestProjectType(projectType: ProjectTypeId) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ProjectTypeId>(EVENT, { detail: projectType }));
}

/** Subscribes the contact form to prefill requests coming from CTAs. */
export function onProjectTypeRequest(handler: (projectType: ProjectTypeId) => void) {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => handler((event as CustomEvent<ProjectTypeId>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
