.intel_syntax noprefix

.text
.global _main

_main:
    push ebp
    mov ebp, esp
    and esp, -16
    sub esp, 16

    call ___main

    mov DWORD PTR [esp + 12], 5
    mov DWORD PTR [esp + 8], 10

    mov edx, DWORD PTR [esp + 12]
    mov eax, DWORD PTR [esp + 8]
    add eax, edx

    mov DWORD PTR [esp + 4], eax
    mov eax, DWORD PTR [esp + 4]

    leave
    ret