class Lexer {
  constructor(input) {
    this.tokenSpecs = [
      ["WHITESPACE", /^\s+/],
      ["SET", /^SET\b/i],
      ["TO", /^TO\b/i],
      ["IF", /^IF\b/i],
      ["THEN", /^THEN\b/i],
      ["END", /^END\b/i],
      ["NUMBER", /^\d+/],
      ["LESS_THAN", /^</],
      ["PLUS", /^\+/],
      ["DISP", /^DISP\b/i],
      ["STRING", /^"[^"]*"/],
      ["MINUS", /^-/],
      ["MULTIPLY", /^\*/],
      ["DIVIDE", /^\//],
      ["LPAREN", /^\(/],
      ["RPAREN", /^\)/],
      ["IDENTIFIER", /^[a-zA-Z_][a-zA-Z0-9_]*/],
    ];

    this.input = input;
    this.tokens = [];
  }

  tokenize() {
    let cursor = 0;

    while (cursor < this.input.length) {
      let match = null;

      for (const [type, regex] of this.tokenSpecs) {
        const result = regex.exec(this.input.slice(cursor));
        if (!result) continue;

        match = result[0];

        if (type !== "WHITESPACE") {
          this.tokens.push({
            type,
            value: match,
            position: cursor,
          });
        }

        cursor += match.length;
        break;
      }

      if (!match) {
        throw new Error(
          `Unexpected token at position ${cursor}: "${this.input[cursor]}"`
        );
      }
    }

    return this.tokens;
  }
}

module.exports = Lexer;