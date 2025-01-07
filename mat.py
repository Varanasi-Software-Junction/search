def printMat(mat):
    for i in mat:
        print(i)
def solve(mat):
    n=len(mat)
    left,right,top,bottom=0,n-1,0,n-1
    # print(left,right,top,bottom)
    x=0
    for i in range(left,right+1):
        x+=1
        mat[top][i]=x
    printMat(mat)
    top+=1
    for i in range(top,bottom+1):
        x+=1
        mat[i][right]=x
    printMat(mat)
    right-=1
    for i in range(right,left-1,-1):
        x+=1
        mat[bottom][i]=x
    printMat(mat)
    bottom-=1
    for i in range(bottom,top-1,-1):
        x+=1
        mat[i][left]=x
    printMat(mat)
    left+=1
    for i in range(left,right+1):
        x+=1
        mat[top][i]=x
    printMat(mat)
    top+=1
    for i in range(top,bottom+1):
        x+=1
        mat[right][i]=x
    printMat(mat)
    right-=1
    for i in range(right,left-1,-1):
        x+=1
        mat[bottom][i]=x
    printMat(mat)
    bottom-=1
    


t=[0,0,0,0]
mat=[t.copy(),t.copy(),t.copy(),t.copy()]
solve(mat)