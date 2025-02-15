def searchSum(a, n, target, index, output):
    # print("Running", a, target, index, output)
    # input()
    if target == 0:
        print("Target Found", output)
        return
    if index >= n:
        return
    newoutput = output.copy()
    newoutput.append((index, a[index]))
    searchSum(a, n, target-a[index], index+1, newoutput)
    searchSum(a, n, target, index+1, output)


data = [3]
searchSum(data, len(data), 3, 0, [])
