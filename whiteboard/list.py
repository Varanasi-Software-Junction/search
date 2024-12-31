def getSlidingWindow(l, blocksize):
    n = len(l)
    if blocksize > n :
        print("Blocksize>length")
        return None
    currentblock = l[:blocksize]
    initialsum = 0
    for x in currentblock:
        initialsum +=x
    i = blocksize
    print(initialsum,currentblock, end=",")
    while i<=n-1:
        initialsum= initialsum-l[i-blocksize]
        currentblock.pop(0)
        currentblock.append(l[i])
        initialsum += l[i]
        print(initialsum,currentblock, end=",")
        i+=1

a = [1, 2, 3, 4, 5, 6, 7]
n =3
getSlidingWindow(a, n)
