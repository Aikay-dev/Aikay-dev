import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 ships flat configs directly, so there's no FlatCompat
 * bridge here — going through @eslint/eslintrc throws on this version.
 */
const eslintConfig = [
  ...(Array.isArray(coreWebVitals) ? coreWebVitals : [coreWebVitals]),
  ...(Array.isArray(typescript) ? typescript : [typescript]),
  {
    ignores: [".next/**", "node_modules/**", "scripts/**", "public/**"],
  },
];

export default eslintConfig;
