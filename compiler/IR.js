class IR {
  constructor(ast) {
    this.ast = ast;
    this.tempCount = 0;
    this.irString = [];
  }

  generate() {
    this.visit(this.ast);
    return this.irString;
  }

  visit(node) {
    if (!node) return;

    switch (node.type) {
      case "Program":
        node.body.forEach(stmt => this.visit(stmt));
        break;

      case "Assignment": {
        const value = this.visit(node.value);
        this.irString.push(`${node.identifier} = ${value}`);
        return node.identifier;
      }

      case "NumberLiteral":
        return node.value;

      case "Identifier":
        return node.name;

      case "StringLiteral":
        return `"${node.value}"`;

      case "BinaryExpression": {
        const left = this.visit(node.left);
        const right = this.visit(node.right);

        const temp = this.newTemp();
        this.irString.push(`${temp} = ${left} ${node.operator} ${right}`);

        return temp;
      }

      case "DisplayStatement": {
        const value = this.visit(node.value);
        this.irString.push(`PRINT ${value}`);
        break;
      }

      case "IfStatement": {
        const condition = this.visit(node.condition);
        const label = this.newLabel();

        this.irString.push(`IF NOT ${condition} GOTO ${label}`);
        node.body.forEach(stmt => this.visit(stmt));
        this.irString.push(`${label}:`);
        break;
      }

      default:
        throw new Error("Unknown node type: " + node.type);
    }

  }

  newTemp() {
    return `t${this.tempCount++}`;
  }

  newLabel() {
    return `L${this.tempCount++}`;
  }
}

module.exports = IR;