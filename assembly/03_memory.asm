.intel_syntax noprefix
.global _start
.text

_start:
  mov ax, [reg16]
  
  ;# rax = 8-bit register
  ;# eax = 4-bit subset of rax
  ;# ax = 2-bit subset of eax
  ;# ah = 1-bit subset of ax
  ;# al = 1-bit subset of ax

.data 
  reg16: .quad 0xaaaaaaaaaaaabbb

;# quad = 64-bit = 8 byte