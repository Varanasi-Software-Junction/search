import matplotlib.pyplot as p
data = [2, 8]
sum = 0
for x in data:
    sum += x
print(sum)
percentage = [(x*100)/sum for x in data]

print(percentage)
p.pie(data, labels=["A", "B"], explode=[-1, -1],
      colors=["red", "black"], labeldistance=40)
p.title = "Pie Chart"
p.legend()
p.savefig("pie.png")
p.show()
