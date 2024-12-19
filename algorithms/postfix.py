    class Stack:
    def __init__(self):
        self.arr=[]
    def push(self,data):
        self.arr.append(data)
    def pop(self):
        if len(self.arr)==0:
            return None
        return self.arr.pop()
    def empty(self):
        return len(self.arr)==0

    
def getType(ch):
    if ch in ("0,1,2,3,4,5,6,7,8,9"):
        return "number" # Number
    if ch in("+,-,*,/"):
        return "operator"
    return None
def getPriority(ch):
    if ch=='-':
        return 1
    if ch=='+':
        return 2
    if ch=='*':
        return 3
    if ch=="/":
        return 4
exp="(1+2)"
st=Stack()
for ch in exp:
    # print(ch, end=" ")
    if ch=='(':
        # print("left bracket")
        st.push(ch)
        continue
    if ch==')':
        # print("Right bracket")
        topstack=st.pop()
        while topstack!='(':
            print(topstack)
            topstack=st.pop()
        
        continue
    type=getType(ch)
    if type=="operator":
        # print("Operator",end=" ")
        if st.empty():
            st.push(ch)
            continue
       
        topstack=st.pop()
        if getType(topstack)!="operator":
            st.push(topstack)
            st.push(ch)
            continue

        chpriority=getPriority(ch)
        toppriority=getPriority(topstack)
        if toppriority<chpriority:
            st.push(toppriority)
            st.push(ch)
            continue

        continue
    if type=="number":
        print(ch,end=" ")
        continue
    print("Unknown")
