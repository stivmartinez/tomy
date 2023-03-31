import { ReactElement, CSSProperties } from "react";

export interface JSONComponent {
  id: string;
  tag: string;
  className?: string;
  children?: JSONComponent[];
  content?: string;
  style?: CSSProperties;
  componentName?: string;
  props?: Record<string, any>;
  componentType?: "client-side" | "server-side";
}
