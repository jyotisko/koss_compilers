.intel_syntax noprefix
.global _start
.text
_start:

  mov rax, 5     ;# move 5 into rax
  mov rbx, rax   ;# move rax into rbx
  mov [0x0040100c], rbx   ;# store in memory


