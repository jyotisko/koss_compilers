.intel_syntax noprefix
.global _start
.text
_start:

  mov rax, 3
  mov rbx, 2
  add rax, rbx  ;# add value of rbx into rax
  sub rbx, 2    ;# subtract 2 into rbx  
  
  inc rax       ;# increment by 1
  inc rax     
  dec rax       ;# decrement by 1