# Coding Guidelines (.tsx, .ts)

## Mandatory

- Use `const` or `let` for local variable declarations.
- Prefer `const` for variable declarations. Use `let` only when reassignment is necessary after initialization.
- Declare only one variable per line. However, destructuring assignments are an exception.
- Declare local variables as close as possible to their usage to minimize scope.
- Always enclose the body of `if/for/do/while` statements with braces `{}`.

  ```javascript
  // Not Recommended
  if (foo === "foo") return "bar";

  // Recommended
  if (foo === "foo") {
    return "bar";
  }
  ```

- Use strict equality (`===`) instead of equality (`==`). However, `== null` is allowed for null checks.
- Avoid using `number`, `string`, or `any` types directly as boolean values.
- Use `String(hoge)` for string type conversion.
- Use `Number` or `parseFloat` for number type conversion.
- Use 2 spaces for indentation.
- Delegate line length management to the formatter.
  - Use the Prettier plugin, with settings managed in `.prettierrc`.
- Use the app router instead of the page router. However, exceptions are allowed for auto-generated code.
- Use default exports (`export default XXX`) only in files like `page.tsx` and `layout.tsx` under the `app` directory. Use named exports (`export const XXX`) elsewhere.
- Use snake_case for file names under the `app` directory.
  - Be cautious with naming as these appear in user-visible URLs.
- Use relative paths from `src` for imports (excluding SCSS).
  - Recommended: `components/hoge.tsx`
  - Not Recommended: `../components/hoge.tsx`
- Avoid duplicate code.
  - Do not copy-paste the same logic. However, inline preparation code is acceptable in test cases.
  - Extract duplicate code within the same block to a shared location.
  - Extract duplicate code across multiple methods/functions in the same file into a new method/function.
- Remove unused variables and imports.
- When declaring variables with `let` that have limited possible values, use literal types for type declarations (also applies to interface type declarations).
  - Restricting possible values enhances TypeScript's type safety.
- Use `interface` instead of `type` for type definitions.
  - Minimal functional differences.
  - Interfaces align better with object-oriented principles, making them more approachable for members new to TypeScript.
  - Use `type` only for Union and Tuple types.
- Rely on TypeScript's type inference when explicit type annotations are unnecessary.
- Use `readonly` for read-only declarations and `as const` for recursive immutability.
  - For arrays, `ReadonlyArray<T>` can also be used, but prefer the above for consistency.
- Emphasize early returns and guard clauses.
  - Return as soon as a condition is met if further evaluation is unnecessary (early return).
  - Place patterns to exclude at the beginning (guard clause).
- Avoid nested loops for maintainability, readability, and performance.
  - Question the necessity of nested loops in your implementation.
  - If necessary, create an array of processing targets and loop through its elements instead of using nested loops.
- Implement similar logic within a function in the same way.
- Ensure each function provides a single responsibility.
  - This separation of concerns aids in unit testing.
- Use destructuring for function component arguments (props) at the first line of the function.
  - Example: `const Hoge: React.FC<Props> = (props) => {\n const { fuga, piyo = "hoge" } = props;`

## Recommended

- Prefer function components over class components.
- Avoid function expressions; use arrow functions whenever possible.
- Understand and appropriately use SSR (`getServerSideProps`), SSG (`getStaticProps`), and ISR.
- Use template literals (backticks `` ` ``) for embedded string generation.
- Use standard `import`/`export` for module imports.
- Add comments to classes, exported elements, member variables, and member functions.
- Avoid comments for content that is immediately clear from the code.
- Use `//` for single-line comments.
- Use [annotation comments](https://qiita.com/taka-kawa/items/673716d77795c937d422) as needed.
- Follow the [Google Java Style Guide#s5.3-camel-case](https://google.github.io/styleguide/javaguide.html#s5.3-camel-case) for camelCase naming conventions. Add comments for clarity if the meaning is unclear.
  - Example: "supports IPv6 on iOS?" → `supportsIpv6OnIos`
- If a file exports a single element (class, interface, function, constant, etc.), name the file after the exported element.
- If a file exports multiple elements, name the file after the most representative element.
- Use UpperCamelCase/PascalCase for class and interface names.
- Use lowerCamelCase for variable and function names.
- Use CONSTANT_CASE for constants (values determined before execution and immutable during runtime).
  - Place constants in `const.ts`.
- Remove unnecessary fragments like `<React.Fragment></React.Fragment>` or `<></>`.
- Avoid inline styles.
  - Use `module.scss` to clearly separate roles.
- Avoid nested ternary operators for readability.
  - Use ternary operators only when they improve readability. Avoid them if they span multiple lines.
- Use `if` and `switch` statements appropriately.
  - Avoid `switch` statements due to the risk of fall-through (missing `break;`).
  - Use `switch` for readability when multiple conditions are involved.
- Prefer `map`, `filter`, and `forEach` over raw `for` loops.
  - These functions improve readability by aligning names with roles.
- Limit nesting depth (e.g., nested `if` statements) to 3 levels or fewer.
  - Use early returns to simplify and improve readability.
- Use meaningful variable names, avoiding generic ones unless conventional.
  - Not Recommended: `map(v, i)` → Recommended: `map(value, index)`
- Follow this order for import statements: libraries (e.g., `next`, `react`, others) → components (e.g., `atoms`, `organisms`) → shared (e.g., `interface`, `utils`, `const`) → styles.

# API Integration (`src/utils/Api.ts` and `src/utils/openapi/*`)

- Use code generated by `openapi-generator-cli` for API integration.
- Wrap auto-generated functions in `Api.ts` for frontend use.
- Naming convention for wrapper functions in `Api.ts`:
  - `request + [GET/POST/PUT/DELETE] + [Class] + [(To) RoleFunctionName]`
  - Example: For a class `SalonsApi`:
    - `requestGetSalonsToGetSalons`
    - `requestGetSalonsToGetSalonById`
    - `requestPostSalonsToAddSalon`
    - `requestPutSalonsToUpdateSalonById`
    - `requestDeleteSalonsToDeleteSalonById`
  - Adjust `(To)` as needed for clarity.

Pending discussion:

```
# Frontend Error Handling
Handle errors within `Error.getInitialProps = async ({ res, err }: NextPageContext) => {}`.
Primarily use `_error.tsx`.

`  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;`
- Calculate `statusCode`.
- If `res` exists, it's SSR; use `res.statusCode`.
- If `res` doesn't exist, it's CSR.
  - Use `err.statusCode` if available.
  - If an unexpected exception occurs, `err` may be a plain `Error` object without `statusCode`. In such cases, default to 500.

See Also: https://nextjs.org/docs/advanced-features/custom-error-page
```

# Other Rules

- Use snake_case for file names in the `public` directory.
- Do not rename folders.
- Do not rename the following files due to framework recognition or shared naming conventions:
  - `favicon.ico`
  - `src/components/Layout.tsx`
  - `pages/index.tsx`
  - `pages/_app.tsx`
  - `pages/_document.tsx`
  - `pages/404.tsx`
  - `styles/_variables.scss`
  - `styles/global.scss`
  - Other configuration files, etc.
- For guidelines not covered here, refer to:
  - [Google HTML / CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
  - [Style Guide - TypeScript Deep Dive](https://typescript-jp.gitbook.io/deep-dive/styleguide)
- Do not leave debugging tools like `console` or unresolved ESLint errors in the code. If necessary, use [annotation comments](https://qiita.com/taka-kawa/items/673716d77795c937d422) to clarify the reason for their presence.
