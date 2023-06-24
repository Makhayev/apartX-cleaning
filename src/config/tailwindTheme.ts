import resolveConfig from "tailwindcss/resolveConfig";

// eslint-disable-next-line import/extensions
import { content, theme } from "../../tailwind.config";

//@ts-ignore
const fullConfig = resolveConfig({ content, theme });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const colors = fullConfig?.theme?.colors as any;
