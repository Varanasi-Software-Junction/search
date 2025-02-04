cricketers = set(['A', 'C'])
footballers = set(['B', 'C'])
print(cricketers, footballers)
output = cricketers.intersection(footballers)
print(output, cricketers, footballers)

output = cricketers.intersection_update(footballers)
print(output, cricketers, footballers)
