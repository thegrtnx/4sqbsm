// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

// Compose config
const eslintConfig = [
	// bring in Next.js flat-compatible sets
	...compat.extends("next/core-web-vitals", "next/typescript"),

	// register the typescript-eslint plugin and rules
	{
		plugins: {
			// name must match the plugin prefix used in rule IDs
			"@typescript-eslint": tsPlugin,
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
		},
	},
];

export default eslintConfig;
