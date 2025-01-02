def getSymbol(n):
    import math
    positive_infinity = float('inf')
    if n >= 100:
        return positive_infinity
    if n <= 0:
        return "-"
    return str(n)


def printAll(dist):
    n = len(dist)
    print(end="\t")
    for i in range(1, n+1):
        print(chr(65+i-1), end="\t")
    print()
    for i in range(1, n+1):
        print(chr(65+i-1), end="\t")
        for j in range(1, n+1):
            ch = getSymbol(dist[i-1][j-1])
            print(ch, end="\t")
        print()


def findSmallestLocation(dist, used):
    n = len(dist)
    minpos = 0
    min = infinity
    for i in range(1, n+1):
        if dist[0][i-1]<=0:
            continue
        if i in used:
            continue
        print(dist[0][i-1] < min,dist[0][i-1] , min)
        if (dist[0][i-1] < min) and (i not in used):
            minpos = i
            min = dist[0][i-1]
    if minpos+1 in used:
        return None
    return minpos


infinity = 100
samelocation = 0
distances = [[samelocation, 10, infinity, 5, infinity], [infinity, samelocation, 2, infinity,
                                                         infinity], [infinity, 4, samelocation, 3, 9], [2, 7, infinity, samelocation, infinity], [1, 2, 3, 4, samelocation]]
printAll(distances)
minpos = findSmallestLocation(distances, [4 ])
print(minpos)
