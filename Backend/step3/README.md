# Questions

## For code quality, you can use some tools : which one and why (in a few words) ?

- ESLint: This is a linter, that is to say a tool which statically analyzes code to identify problems in accordance with rules which have been pre-defined. This makes it possible to improve the quality of the code by ensuring that best practices are respected and to have the same consistency throughout the codebase.

- Husky: Husky allows you to automate script execution during events linked to Git hooks. This would allow example in the context of ESLint, to linter the code automatically before each commit (pre-commit hook), in order to automatically check the code before it can be pushed.

- Prettier: Prettier is a tool that allows you to format JavaScript code. This makes the code readable and consistent by applying a pre-defined formatting style (tabs, indentations, quotes, etc.). It allows developers to not have to concentrate on formatting the code, which will be managed automatically by Prettier.

- SonarQube: It's an advanced tool that allows you to evaluate the quality of software code by automatically identifying vulnerabilities, potential bugs, code duplications or even bad programming practices. It allows you to easily visualize the status of the code or monitor the evolution of technical debt (using dashboards, detailed reports, etc.).

- We could define other tests to ensure the quality and robustness of our application at several levels, such as unit tests with libraries like Jasmine for example.

## You can consider to setup a ci/cd process : describe the necessary actions in a few words

We could define our CI/CD pipeline using Github actions.

We could first define a job that allows the project to be built and tested. It would initially contain the following steps:

1. Checkout the repo code
2. Setup the node.js environment
3. Install dependencies
4. Build the app
5. Run the tests

You can find an example CI workflow for our application here: ...

We could also define other jobs, making it possible to automate the deployment of the built application on a pre-prod or prod environment.
