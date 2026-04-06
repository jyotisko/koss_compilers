#include <stdio.h>

int main() {
    int a = 5;
    int b = 10;
    int c = a + b;
    return c;
}

// gcc.exe -S -O0 test.c -o test0.s
// gcc.exe -S -O2 test.c -o test2.s

/*
For cleaner explanation I used GCC, but for real Disassembler demo:
gcc.exe -O0 test.c
objdump -d -M intel a.exe > output.asm
*/