import matplotlib.pyplot as plt
import math
n = 5
x = [i for i in range(1,n+1)]
y = [math.log(i) for i in x]
print(x, y, sep="\n")
plt.plot(x, y)
plt.scatter(x, y)

plt.show()
# y=7 constant, y=x, y=x*x, y=2**x
# constant , log, linear, polynomial, exponential