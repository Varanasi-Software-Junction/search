import numpy
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score


def bestfitModel(x, y):
    bestcoeff = 0
    bestmodel = None
    bestpower = 0
    for r in range(1, 6):
        model = numpy.poly1d(numpy.polyfit(x, y, r))
        coeff = r2_score(y, model(x))
        if coeff > bestcoeff:
            bestcoeff = coeff
            bestmodel = model
            bestpower = r
    return bestcoeff, bestmodel, bestpower


x = [1, 2, 3, 4]

listy = [[0, 0, 0, 0], [1, 2, 3, 4], [
    1, 4, 9, 16], [1, 8, 27, 64], [1, 16, 81, 256]]
y = listy[0]  # Change Here 0,1,2,3
deg = 0
npp = numpy.polyfit(x, y, deg)
model = numpy.poly1d(npp)
coeff = r2_score(y, model(x))

print(f'\ndeg={deg}\nx={x}\ny={y}\nEquation={model}\nCorrelation={coeff}')
predictx = 1
result = model(predictx)
print(f'\nresult={result}\tfor x={predictx}')
outputy = [model(i) for i in x]
plt.scatter(x, y,)
plt.plot(x, y)
plt.scatter(x, outputy)
plt.plot(x, outputy)
plt.show()
