import matplotlib.pyplot as plt
class reg:
    def __init__(self, xs, ys):
        self.xs, self.ys = xs, ys
        self.sigmaX, self.sigmaY, self.sigmaX2, self.sigmaY2, self.sigmaXY = 0, 0, 0, 0, 0
        self.n = len(xs)
        for i in range(self.n):
            x = xs[i]
            y = ys[i]
            self.sigmaX += x
            self.sigmaY += y
            self.sigmaX2 += x*x
            self.sigmaY2 += y*y
            self.sigmaXY += x*y
            self.m = (self.n*self.sigmaXY-self.sigmaX*self.sigmaY) / \
                (self.n*self.sigmaX2-self.sigmaX*self.sigmaX)
            self.c = (self.sigmaY-self.m*self.sigmaX)/(self.n)
            self.r = (self.n*self.sigmaXY-self.sigmaX*self.sigmaY) / \
                ((self.n*self.sigmaX2-self.sigmaX*self.sigmaX) *
                 (self.n*self.sigmaY2-self.sigmaY*self.sigmaY))**0.5
        # return sigmaX, sigmaY, sigmaX2, self.sigmaY2, self.sigmaXY, m, c, r
            # print(self.m,self.c,self.r)

    def predict(self, x):
        return self.m*x + self.c, self.r
    
    def prdictlist(self, x):
        y=[self.predict(i) for i in x]
        return y
        
    def plot(self, future_days=10):
        plt.scatter(self.xs, self.ys, color='red', label="Original Data")

        min_x = min(self.xs)
        max_x = max(self.xs) + future_days
        x_range = list(range(min_x, max_x + 1))
        y_predicted = [self.predict(x) for x in x_range]
        
        plt.plot(x_range, y_predicted, color='blue', linestyle='dashed')
        
        plt.xlabel("Independent Variable")
        plt.ylabel("Dependent Variable")
        plt.title("Regression Line with Future Prediction")
        plt.legend()
        plt.show()



if __name__ == "__main__":
    x = [1, 2, 3, 4, 5]
    y = [3, 5, 7, 9, 11]


    regression = reg(x, y)
    predicted_value = regression.predict(10)
    print(predicted_value)
    predictions=regression.prdictlist([20,21,32,45])
    print([20,21,32,45],predictions)

    






    
    
        
       







