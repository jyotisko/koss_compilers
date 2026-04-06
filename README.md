How to use the compiler to get IR?

1. Create a new file in parent directory <filename>.koss (or just use the test.koss file).
2. Write your code in syntax similar to:
SET xyz TO 5
SET sum TO xyz + 10
IF xyz < 10 THEN
    SET xyz TO 10
END
DISP xyz

3. Compile using command "node .\compiler\main.js <filename>.koss"
4. IR output will be generated in "output.ir" file.