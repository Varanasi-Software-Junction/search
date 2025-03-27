def getAandB(xs, ys):
    # print(x, y)
    sigmaX, sigmaY, sigmaX2, sigmaY2, sigmaXY = 0, 0, 0, 0, 0
    n = len(xs)
    for i in range(n):
        x = xs[i]
        y = ys[i]
        sigmaX += x
        sigmaY += y
        sigmaX2 += x*x
        sigmaY2 += y*y
        sigmaXY += x*y
    m = (n*sigmaXY-sigmaX*sigmaY)/(n*sigmaX2-sigmaX*sigmaX)
    c = (sigmaY-m*sigmaX)/(n)
    r = (n*sigmaXY-sigmaX*sigmaY) / \
        ((n*sigmaX2-sigmaX*sigmaX)*(n*sigmaY2-sigmaY*sigmaY))**0.5
    return sigmaX, sigmaY, sigmaX2, sigmaY2, sigmaXY, m, c, r


x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 4, 6]

result = getAandB(x, y)
print(result)
