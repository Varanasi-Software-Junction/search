n = 7
mid = (n+1)//2
for row in range(1, n+1):
    for col in range(1, n+1):
        condition = (col-row<=3)and (row+col>=5)and(row-col<=3)
        if condition:
            print("0", end="")
        else:
            print(" ", end="")
    print()
