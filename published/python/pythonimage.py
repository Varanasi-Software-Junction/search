import cv2 as pp


def readImage(imagepath):
    print(9000)

    pic = pp.imread(imagepath)
    if pic is None:

        print("Picture not found")
        return None
    return pic


def size(pic):
    my, mx, mz = pic.shape
    return my, mx


def showImage(pic):

    output = pp.imshow("Show Picture", pic)
    pp.waitKey(0)


def saveImage(pic, filename):
    pp.imwrite(filename, pic)  # Save to disk


def setHorizontalFlip(pic):
    my, mx = size(pic)
    for x in range(mx):

        for y in range(my):

            b = int(pic[x][y][0])  # Blue Value

            g = int(pic[x][y][1])  # Green Value

            r = int(pic[x][y][2])  # Red Value

            bwvalue = int((r+g+b)//3)  # Average RGB

            pic[x][y][0] = bwvalue

            pic[x][y][1] = bwvalue

            pic[x][y][2] = bwvalue

    return pic




def setBlackAndWhite(pic):
    my, mx = size(pic)
    for x in range(mx):

        for y in range(my):

            b = int(pic[x][y][0])  # Blue Value

            g = int(pic[x][y][1])  # Green Value

            r = int(pic[x][y][2])  # Red Value

            bwvalue = int((r+g+b)//3)  # Average RGB

            pic[x][y][0] = bwvalue

            pic[x][y][1] = bwvalue

            pic[x][y][2] = bwvalue

    return pic


def setCompleteBlackAndWhite(pic):
    my, mx = size(pic)
    for x in range(mx):

        for y in range(my):

            b = int(pic[x][y][0])  # Blue Value

            g = int(pic[x][y][1])  # Green Value

            r = int(pic[x][y][2])  # Red Value

            bwvalue = int((r+g+b)//3)  # Average RGB
            if bwvalue < 128:
                bwvalue = 0
            else:
                bwvalue = 255

            pic[x][y][0] = bwvalue

            pic[x][y][1] = bwvalue

            pic[x][y][2] = bwvalue

    return pic


picname = "0.png"
pic = readImage(picname)
pic = setCompleteBlackAndWhite(pic)
print(picname)
showImage(pic)

# output = pp.imshow("Show Picture", pic)

# print(output)

# output = pp.waitKey(0)
