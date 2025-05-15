# Coding Guidelines (.go)

Please use Go's built-in formatter (`gofmt`) as a standard.  
Additionally, we have introduced `golangci` as a linter, so make sure to run it for static analysis before pushing your code. (It is also configured in GitHub Actions, so you cannot merge if it fails.)  
The following linter settings are configured:

- `govet`
- `misspell`
- `errcheck`
- `staticcheck`
- `prealloc`
- `ineffassign`

## Mandatory

- Folder names must consist only of lowercase English letters. If the name becomes too long, create sub folders to organize packages.
- File names must use lowercase English letters and follow the snake_case convention.
- Variable and function names should follow these conventions:
  - Use lowerCamelCase for private variables/functions.
  - Use UpperCamelCase for public variables/functions.
  - Exception: Proper nouns should not follow camel case but instead use uppercase letters and numbers.
    - Example: ✗ `commentsCsv`, ✓ `commentsCSV`
- When using receivers or clients within function processing, use abbreviations whenever possible. (Your editor will likely suggest these abbreviations via code completion.)
  - Example: `commentPersistence → cp`
- If variable names are too long, it often indicates improper scoping. Consider splitting the logic or refactoring into functions.
- Do not use the prefix `Get` for functions that retrieve data. However, explicitly use the prefix `Fetch` for functions involving external communication.
  - Example: ✗ `GetComments()`, ✓ `Comments()`, ✓ `FetchFromGoogle()`
- Package names should ideally be concise and consist of a single word. Avoid using generic names.
  - Example: ✗ `package common_comments_module`, ✗ `package common`, ✓ `package comments`
- Always name variables that receive errors as `err`. If you must use a suffix like `xxxErr`, consider narrowing the scope or refactoring into functions.
- Write tests using the Table-Driven Test pattern.
- This project manages API specifications using OpenAPI. Since this is a schema-driven development project, refer to the [OpenAPI Wiki](https://github.com/mynavi-group/baito-cxd-agile-project/wiki/OpenAPI-Specefication) and define APIs accordingly during development.

## Recommended

- Follow the [Uber Style Guide](https://github.com/knsh14/uber-style-guide-ja/blob/master/guide.md) as much as possible. Read it carefully and apply its principles in your implementation.
- While it is acceptable for package names and folder names to differ, try to keep them consistent. If possible, consider implementing them as separate packages.
- If directory structures result in duplicate package names, use aliases when importing. If the usage is limited, consider using an `internal` package.
- When abbreviating receiver names, try to use the same abbreviation consistently across different contexts.
  - Example: ✗ `Client → c or cl`, ✓ `Client → c`
