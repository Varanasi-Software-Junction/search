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
    for i in range(n):
        print(chr(65+i ), end="\t")
    print()
    for i in range(n):
        print(chr(65+i), end="\t")
        for j in range(n):
            ch = getSymbol(dist[i][j])
            print(ch, end="\t")
        print()
    print()
    print()


def findSmallestLocation(dist, used):
    n = len(dist)
    minpos = -1
    min = infinity
    for i in range(1, n):
        if dist[0][i] <= 0:
            continue
        if i in used:
            continue
        # print(dist[0][i] < min, dist[0][i], min)
        if (dist[0][i] < min) and (i not in used):
            minpos = i
            min = dist[0][i]
    if minpos in used:
        return None, None
    used.append(minpos)
    return minpos, min

def solve(dist,used):
    n=len(dist)
    for i in range(1,n):
        minpos, min = findSmallestLocation(distances, used)
        if minpos<0:
            return
        
        # print("Start minpos ",minpos, ", min ",min,", ",used)
        print()
        # printAll(distances)
        for j in range(1,n):
            if minpos==j:
                continue
            currentdistance=distances[0][j]
            newdistance=min +  distances[minpos][j]
            # print("Current Distance",currentdistance,"New Distance",newdistance)
            # input()
            if newdistance<currentdistance:
                distances[0][j]=newdistance


        
        
infinity = 100
samelocation = 0
distances = [[samelocation, 10, infinity, 5, infinity], [infinity, samelocation, 2, infinity,
                                                         infinity], [infinity, 4, samelocation, 3, 9], [2, 7, infinity, samelocation, infinity], [1, 2, 3, 4, samelocation]]
printAll(distances)
solve(distances,[])

printAll(distances)