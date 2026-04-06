class MachineCode {
   constructor(ir) {
    this.ir = ir;
    this.asm = [];
   } 

   generateAssembly() {
        this.asm.push(".intel_syntax noprefix");
        this.asm.push(".text");
        this.asm.push(".global _main");




        return this.asm();
   }
}


module.exports = MachineCode;