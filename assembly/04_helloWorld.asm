.intel_syntax noprefix
.global _start
.text

_start:
  mov rax, 1    ;# syscall WRITE
  mov rdi, 1    ;# TERMINAL, STD OUT
  lea rsi, [hellostring]
  lea rdx, [hellolen]
  syscall

.data   ;# stores in memory
hellostring: .ascii "Hello world!"
hellolen = . - hellostring
  

