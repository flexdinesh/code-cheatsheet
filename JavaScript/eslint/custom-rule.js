/* write your own rules */

module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "desc",
        category: "Possible Errors",
        recommended: true
      },
      messages: {
        "no-cats": "err msg goes here"
      },
      fixable: "code"
    },
  
    create: function(context) {
      return {
        // visitor node name : (node) => {}
        // report using context.report({ node, messageId: "rule-name" });
      };
    }
  };
  /* testing */
  
  const { RuleTester } = require("eslint");
  const rules = require("../../../lib/rules/rule-name");
  
  const parserOptions = {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  };
  
  const ruleTester = new RuleTester({ parserOptions });
  
  ruleTester.run("no-cats", rules, {
    valid: [{ code: `const hello = 2;` }],
    invalid: [
      {
        code: `const hello = 2;`,
        errors: [{ messageId: "rule-name" }]
      }
    ]
  });