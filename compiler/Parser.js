class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
  }

  peek() {
    // console.log(`Peak: ${JSON.stringify(this.tokens[this.current])}`);
    return this.tokens[this.current];
  }

  consume(type) {
    const token = this.peek();
    if (!token || token.type !== type) {
      throw new Error(`Expected ${type}, got ${token?.type}`);
    }
    this.current++;
    return token;
  }

  match(type) {
    if (this.peek()?.type === type) {
      this.current++;
      return true;
    }
    return false;
  }

  parseProgram() {
    const body = [];

    while (this.current < this.tokens.length) {
      body.push(this.parseStatement());
    }

    return { type: "Program", body };
  }

  parseStatement() {
    const token = this.peek();

    if (token.type === "SET") return this.parseAssignment();
    if (token.type === "IF") return this.parseIf();
    if (token.type === "DISP") return this.parseDisplay();

    throw new Error(`Unknown statement: ${token.type}`);
  }

  parseDisplay() {
    this.consume("DISP");

    let value;

    if (this.peek().type === "STRING") {
      const str = this.consume("STRING").value;

      value = {
        type: "StringLiteral",
        value: str.slice(1, -1),    // remove the string quotes
      };
    } else {
      value = this.parseExpression(); 
    }

    return {
      type: "DisplayStatement",
      value,
    };
  }

  parseAssignment() {
    this.consume("SET");
    const identifier = this.consume("IDENTIFIER").value;
    this.consume("TO");

    const value = this.parseExpression();

    return {
      type: "Assignment",
      identifier,
      value,
    };
  }

  parseIf() {
    this.consume("IF");

    const condition = this.parseExpression();

    this.consume("THEN");

    const body = [];

    while (this.peek()?.type !== "END") {
      body.push(this.parseStatement());
    }

    this.consume("END");

    return {
      type: "IfStatement",
      condition,
      body,
    };
  }

  // ---------------- EXPRESSIONS ----------------

  parseExpression() {
    return this.parseComparison();
  }

  parseComparison() {
    let left = this.parseAdditive();

    while (this.match("LESS_THAN")) {
      const operator = "<";
      const right = this.parseAdditive();

      left = {
        type: "BinaryExpression",
        operator,
        left,
        right,
      };
    }

    return left;
  }

  parseAdditive() {
    let left = this.parseMultiplicative();

    while (this.match("PLUS") || this.match("MINUS")) {
      const operator = this.tokens[this.current - 1].value;
      const right = this.parseMultiplicative();

      left = {
        type: "BinaryExpression",
        operator,
        left,
        right,
      };
    }

    return left;
  }

  parseMultiplicative() {
    let left = this.parsePrimary();

    while (this.match("MULTIPLY") || this.match("DIVIDE")) {
      const operator = this.tokens[this.current - 1].value;
      const right = this.parsePrimary();

      left = {
        type: "BinaryExpression",
        operator,
        left,
        right,
      };
    }

    return left;
  }

  parsePrimary() {
    const token = this.peek();

    if (token.type === "NUMBER") {
      this.consume("NUMBER");
      return {
        type: "NumberLiteral",
        value: Number(token.value),
      };
    }

    if (token.type === "IDENTIFIER") {
      this.consume("IDENTIFIER");
      return {
        type: "Identifier",
        name: token.value,
      };
    }

    if (this.match("LPAREN")) {
      const expr = this.parseExpression();
      this.consume("RPAREN");
      return expr;
    }

    throw new Error(`Unexpected token: ${token.type}`);
  }
}

module.exports = Parser;