.intel_syntax noprefix

.section .text.startup
.global _main

_main:
    push ebp
    mov ebp, esp
    and esp, -16

    call ___main

    mov eax, 15

    leave
    ret
