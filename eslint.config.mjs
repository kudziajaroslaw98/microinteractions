import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";

const config = [
  // Next.js rules (direct import for ESLint 9 compatibility)
  ...(Array.isArray(nextConfig) ? nextConfig : [nextConfig]),

  // Prettier config to disable conflicting ESLint rules
  prettierConfig,

  // Custom configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "coverage/**",
      "dist/**",
    ],
  },
];

export default config;
