export default function makeErrorText(error) {
  let errorIssues = [];
  error.data.issues.forEach((el) => {
    errorIssues.push(`${el.path} ${el.message}`);
  });
  return { message: error.message, issues: errorIssues };
}
