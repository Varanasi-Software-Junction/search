def sizeMatrix(a):
    r = len(a)
    c = len(a[0])
    return r, c


def printMatrix(a):
    m, n = sizeMatrix(a)
    print()
    for i in range(m):
        for j in range(n):
            print(a[i][j], end="\t")
        print()
    print()


def createMatrix(m, n):
    temp = [0 for x in range(n)]
    mat = [temp.copy() for x in range(m)]
    return mat


def multiplyMatrix(a, b):
    m, n1 = sizeMatrix(a)
    n2, r = sizeMatrix(b)
    if n1 != n2:
        return None
    n = n1
    output=createMatrix(m,r)
    for i in range(m):
        for j in range(n):
            for k in range(r):
                output[i][k]+=a[i][j]* b[j][k]
    return output
